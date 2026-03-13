import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/blog/PostCard'

export const metadata: Metadata = {
  title: '블로그',
  description: '모든 글 목록',
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">블로그</h1>

      {posts.length === 0 ? (
        <p className="text-gray-500">아직 작성된 글이 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
