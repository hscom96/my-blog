import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '소개',
  description: '블로그 소개 페이지',
}

export default function AboutPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">소개</h1>
      <div className="prose dark:prose-invert">
        <p>안녕하세요! 이 블로그는 Next.js와 TypeScript로 만들어졌습니다.</p>
        <p>개발, 기술, 일상 등 다양한 주제로 글을 작성합니다.</p>
      </div>
    </div>
  )
}
