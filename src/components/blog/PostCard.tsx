import Link from 'next/link'
import { PostMeta } from '@/types'
import { formatDate } from '@/lib/utils'

interface Props {
  post: PostMeta
}

export default function PostCard({ post }: Props) {
  return (
    <Link
      href={`/blog/${encodeURIComponent(post.slug)}`}
      className="block p-5 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
    >
      <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
      {post.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
          {post.description}
        </p>
      )}
      <div className="flex items-center gap-3">
        <time className="text-xs text-gray-400">{formatDate(post.date)}</time>
        {post.tags.map((tag) => (
          <span key={tag} className="text-xs text-blue-600 dark:text-blue-400">
            #{tag}
          </span>
        ))}
      </div>
    </Link>
  )
