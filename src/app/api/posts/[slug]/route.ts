import { NextRequest, NextResponse } from 'next/server'
import { updatePost } from '@/lib/posts'
import { WritePostInput } from '@/types'

type UpdatePostInput = Omit<WritePostInput, 'slug'>

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let body: UpdatePostInput

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: '잘못된 요청 형식입니다.' }, { status: 400 })
  }

  if (!body.title?.trim())
    return NextResponse.json({ error: '제목을 입력해주세요.' }, { status: 400 })
  if (!body.date?.trim())
    return NextResponse.json({ error: '날짜를 입력해주세요.' }, { status: 400 })
  if (!body.content?.trim())
    return NextResponse.json({ error: '본문을 입력해주세요.' }, { status: 400 })
  if (!/^\d{4}-\d{2}-\d{2}$/.test(body.date))
    return NextResponse.json({ error: '날짜 형식이 올바르지 않습니다. (YYYY-MM-DD)' }, { status: 400 })

  try {
    updatePost(slug, body)
    return NextResponse.json({ slug }, { status: 200 })
  } catch (err) {
    if (err instanceof Error && err.message === 'POST_NOT_FOUND') {
      return NextResponse.json({ error: '존재하지 않는 포스트입니다.' }, { status: 404 })
    }
    return NextResponse.json({ error: '글 저장 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
