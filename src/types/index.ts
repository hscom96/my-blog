export interface Post {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  content: string
}

export interface PostMeta {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
}

export interface WritePostInput {
  title: string
  slug: string
  date: string
  description: string
  tags: string[]
  content: string
}
