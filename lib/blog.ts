import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const blogDir = path.join(process.cwd(), 'blog')

function formatDate(d: unknown): string {
  if (d instanceof Date) return d.toISOString().split('T')[0]
  if (typeof d === 'string') return d.split(' ')[0]
  return ''
}

export type BlogPost = {
  slug: string
  title: string
  created: string
  updated: string
  tags: string[]
  content: string
}

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'))

  const posts = files.map((filename): BlogPost => {
    const filePath = path.join(blogDir, filename)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)

    return {
      slug: filename.replace(/\.md$/, ''),
      title: data.title ?? filename.replace(/\.md$/, ''),
      created: formatDate(data.created),
      updated: formatDate(data.updated),
      tags: data.tags ?? [],
      content,
    }
  })

  return posts.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
}

export function getPost(slug: string): BlogPost | undefined {
  const filePath = path.join(blogDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) return undefined

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title ?? slug,
    created: formatDate(data.created),
    updated: formatDate(data.updated),
    tags: data.tags ?? [],
    content,
  }
}
