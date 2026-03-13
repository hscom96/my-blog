import { supabase } from '@/lib/supabase'
import { Post, PostMeta, WritePostInput } from '@/types'

export async function getAllPostSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('slug')
    .order('date', { ascending: false })
  if (error) throw new Error(error.message)
  return data.map((row) => row.slug)
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('slug, title, date, description, tags')
    .order('date', { ascending: false })
  if (error) throw new Error(error.message)
  return data as PostMeta[]
}

export async function getPostMeta(slug: string): Promise<PostMeta | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('slug, title, date, description, tags')
    .eq('slug', slug)
    .single()
  if (error) return null
  return data as PostMeta
}

export async function getPost(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('slug, title, date, description, tags, content')
    .eq('slug', slug)
    .single()
  if (error) return null
  return data as Post
}

export async function slugExists(slug: string): Promise<boolean> {
  const { data } = await supabase
    .from('posts')
    .select('slug')
    .eq('slug', slug)
    .maybeSingle()
  return data !== null
}

export async function writePost(input: WritePostInput): Promise<void> {
  const { error } = await supabase.from('posts').insert({
    slug: input.slug,
    title: input.title,
    date: input.date,
    description: input.description,
    tags: input.tags,
    content: input.content,
  })
  if (error) {
    if (error.code === '23505') throw new Error('SLUG_EXISTS')
    throw new Error(error.message)
  }
}

export async function updatePost(slug: string, input: Omit<WritePostInput, 'slug'>): Promise<void> {
  const { data, error } = await supabase
    .from('posts')
    .update({
      title: input.title,
      date: input.date,
      description: input.description,
      tags: input.tags,
      content: input.content,
    })
    .eq('slug', slug)
    .select('slug')
  if (error) throw new Error(error.message)
  if (!data || data.length === 0) throw new Error('POST_NOT_FOUND')
}
