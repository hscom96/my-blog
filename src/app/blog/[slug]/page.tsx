import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPostSlugs, getPost } from '@/lib/posts'
import { formatDate } from '@/lib/utils'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: rawSlug } = await params
  const slug = decodeURIComponent(rawSlug)
  const post = getPost(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
  }
}

export default async function PostPage({ params }: Props) {
  const { slug: rawSlug } = await params
  const slug = decodeURIComponent(rawSlug)
  const post = getPost(slug)

  if (!post) notFound()

  return (
    <article>
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <div className="flex items-center gap-4">
          <time className="text-sm text-gray-500">{formatDate(post.date)}</time>
          <Link
            href={`/admin/edit/${slug}`}
            className="text-xs px-3 py-1 border border-gray-200 dark:border-gray-700 hover:border-gray-400 rounded-lg transition-colors"
          >
            수정
          </Link>
        </div>
        {post.tags.length > 0 && (
          <div className="flex gap-2 mt-3 flex-wrap">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose dark:prose-invert max-w-none">
        <MDXRemote source={post.content} />
      </div>
    </article>
  )
}
