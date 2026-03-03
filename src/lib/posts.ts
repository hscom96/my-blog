import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Post, PostMeta, WritePostInput } from '@/types'

const POSTS_DIR = path.join(process.cwd(), 'content/posts')

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => file.replace(/\.(md|mdx)$/, ''))
}

export function getAllPosts(): PostMeta[] {
  const slugs = getAllPostSlugs()
  return slugs
    .map((slug) => getPostMeta(slug))
    .filter((post): post is PostMeta => post !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostMeta(slug: string): PostMeta | null {
  const fullPath = path.join(POSTS_DIR, `${slug}.md`)
  const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`)
  const filePath = fs.existsSync(fullPath) ? fullPath : mdxPath

  if (!fs.existsSync(filePath)) return null

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(fileContents)

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? '',
    description: data.description ?? '',
    tags: data.tags ?? [],
  }
}

export function getPost(slug: string): Post | null {
  const fullPath = path.join(POSTS_DIR, `${slug}.md`)
  const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`)
  const filePath = fs.existsSync(fullPath) ? fullPath : mdxPath

  if (!fs.existsSync(filePath)) return null

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? '',
    description: data.description ?? '',
    tags: data.tags ?? [],
    content,
  }
}

export function slugExists(slug: string): boolean {
  return getAllPostSlugs().includes(slug)
}

export function updatePost(slug: string, input: Omit<WritePostInput, 'slug'>): void {
  const filePath = path.join(POSTS_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) {
    throw new Error('POST_NOT_FOUND')
  }

  const tagsYaml = `[${input.tags.map((t) => `"${t}"`).join(', ')}]`
  const fileContent = [
    '---',
    `title: "${input.title.replace(/"/g, '\\"')}"`,
    `date: "${input.date}"`,
    `description: "${input.description.replace(/"/g, '\\"')}"`,
    `tags: ${tagsYaml}`,
    '---',
    '',
    input.content,
  ].join('\n')

  fs.writeFileSync(filePath, fileContent, 'utf8')
}

export function writePost(input: WritePostInput): void {
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true })
  }

  if (slugExists(input.slug)) {
    throw new Error('SLUG_EXISTS')
  }

  const tagsYaml = `[${input.tags.map((t) => `"${t}"`).join(', ')}]`
  const fileContent = [
    '---',
    `title: "${input.title.replace(/"/g, '\\"')}"`,
    `date: "${input.date}"`,
    `description: "${input.description.replace(/"/g, '\\"')}"`,
    `tags: ${tagsYaml}`,
    '---',
    '',
    input.content,
  ].join('\n')

  const filePath = path.join(POSTS_DIR, `${input.slug}.md`)
  fs.writeFileSync(filePath, fileContent, 'utf8')
}
