'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { generateSlug } from '@/lib/slugify'

interface FormState {
  title: string
  slug: string
  date: string
  description: string
  tags: string
  content: string
}

interface FormErrors {
  title?: string
  slug?: string
  date?: string
  content?: string
  general?: string
}

export default function WritePage() {
  const router = useRouter()
  const today = new Date().toISOString().split('T')[0]

  const [form, setForm] = useState<FormState>({
    title: '',
    slug: '',
    date: today,
    description: '',
    tags: '',
    content: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)

  useEffect(() => {
    if (!slugManuallyEdited) {
      setForm((prev) => ({ ...prev, slug: generateSlug(prev.title) }))
    }
  }, [form.title, slugManuallyEdited])

  function validate(): boolean {
    const newErrors: FormErrors = {}
    if (!form.title.trim()) newErrors.title = '제목을 입력해주세요.'
    if (!form.slug.trim()) newErrors.slug = '슬러그를 입력해주세요.'
    if (!form.date.trim()) newErrors.date = '날짜를 입력해주세요.'
    if (!form.content.trim()) newErrors.content = '본문을 입력해주세요.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setErrors({})

    const tagsArray = form.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, tags: tagsArray }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrors({ general: data.error ?? '알 수 없는 오류가 발생했습니다.' })
        return
      }

      router.push(`/blog/${data.slug}`)
    } catch {
      setErrors({ general: '네트워크 오류가 발생했습니다. 다시 시도해주세요.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass =
    'w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg ' +
    'bg-white dark:bg-gray-900 text-sm focus:outline-none focus:border-blue-400 ' +
    'dark:focus:border-blue-500 transition-colors'

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">새 글 작성</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.general && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
            {errors.general}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">
            제목 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className={inputClass}
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            placeholder="글 제목을 입력하세요"
          />
          {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            슬러그 <span className="text-red-500">*</span>
            <span className="ml-2 font-normal text-gray-400 text-xs">(URL에 사용됩니다. 제목에서 자동 생성)</span>
          </label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400 shrink-0">/blog/</span>
            <input
              type="text"
              className={inputClass}
              value={form.slug}
              onChange={(e) => {
                setSlugManuallyEdited(true)
                setForm((p) => ({ ...p, slug: e.target.value }))
              }}
              placeholder="url-slug"
            />
          </div>
          {errors.slug && <p className="mt-1 text-xs text-red-500">{errors.slug}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            날짜 <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            className={inputClass}
            value={form.date}
            onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
          />
          {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">설명</label>
          <input
            type="text"
            className={inputClass}
            value={form.description}
            onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
            placeholder="글에 대한 간단한 설명"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            태그
            <span className="ml-2 font-normal text-gray-400 text-xs">(쉼표로 구분: Next.js, TypeScript)</span>
          </label>
          <input
            type="text"
            className={inputClass}
            value={form.tags}
            onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))}
            placeholder="Next.js, TypeScript, React"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            본문 <span className="text-red-500">*</span>
            <span className="ml-2 font-normal text-gray-400 text-xs">(마크다운 형식)</span>
          </label>
          <textarea
            className={`${inputClass} h-64 resize-y font-mono`}
            value={form.content}
            onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
            placeholder={'## 제목\n\n본문을 마크다운으로 작성하세요.'}
          />
          {errors.content && <p className="mt-1 text-xs text-red-500">{errors.content}</p>}
        </div>

        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {isSubmitting ? '저장 중...' : '글 등록'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-200 dark:border-gray-700 hover:border-gray-400 text-sm rounded-lg transition-colors"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  )
}
