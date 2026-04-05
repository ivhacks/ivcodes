import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'

export default function Home() {
  const posts = getAllPosts()

  return (
    <div className="h-screen flex">
      <div className="w-1/2 flex items-center ">
        <div className="px-12">
          <p className="intro text-2xl">Hi! I'm</p>
          <h1 className="leading-none" style={{ fontSize: '8vw' }}>Iv Robinson</h1>
          <p className="intro text-2xl">Iv rhymes with "give."</p>
        </div>
      </div>
      <div className="w-1/2 h-screen overflow-y-auto flex items-center">
        <nav className="flex flex-col gap-6 pl-20">
          {posts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block no-underline px-6 py-3 -mx-6 w-96 hover:bg-black">
              <p className="font-[Aleo] text-white text-lg m-0 leading-tight">{post.title}</p>
              <p className="font-[Aleo] text-neutral-500 text-sm m-0">{post.created}</p>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
