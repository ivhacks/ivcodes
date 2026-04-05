import { notFound } from 'next/navigation'
import { getAllPosts, getPost } from '@/lib/blog'
import ReactMarkdown from 'react-markdown'
import FitTitle from '@/components/fit-title'
import CodeBlock from '@/components/code-block'

export function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  return (
    <div className="min-h-screen flex justify-center py-8">
      <div className="px-5 w-full md:w-[60vw] pt-4">
        <FitTitle>{post.title}</FitTitle>
        <p className="font-[Aleo] text-neutral-500 text-sm mb-6">{post.created}</p>
        <article className="font-[Aleo] prose prose-invert prose-base md:prose-lg max-w-none leading-7 md:leading-8 prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline prose-pre:p-0 prose-pre:bg-transparent prose-pre:rounded-none prose-headings:mt-6 prose-headings:mb-2 prose-p:my-2 prose-ul:my-2 prose-li:my-0 prose-pre:my-3">
          <ReactMarkdown components={{ code: CodeBlock }}>{post.content}</ReactMarkdown>
        </article>
      </div>
    </div>
  )
}
