import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'

export default function Home() {
  const posts = getAllPosts()

  return (
    <div className="h-screen flex flex-col md:flex-row">
      <div className="pt-12 pb-6 md:py-0 md:w-1/2 flex items-center">
        <div className="px-8 md:px-12 pr-12 md:pr-16">
          <p className="intro text-lg md:text-2xl">Hi! I'm</p>
          <h1 className="leading-none text-5xl md:text-[7vw]">Iv Robinson</h1>
          <p className="intro text-lg md:text-2xl">Iv rhymes with "give."</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto md:w-1/2 md:flex md:items-center">
        <nav className="flex flex-col gap-4 md:gap-6 px-8 md:pl-20 pb-8 md:pb-0">
          {posts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block no-underline px-6 py-3 -mx-6 md:w-96 hover:bg-black">
              <p className="font-serif text-white text-lg m-0 leading-tight">{post.title}</p>
              <p className="font-serif text-neutral-500 text-sm m-0">{post.created}</p>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
