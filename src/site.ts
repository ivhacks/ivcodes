import { mkdirSync, rmSync, readdirSync, readFileSync, writeFileSync, watch } from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'

const root = path.resolve(import.meta.dir, '..')
const blogDir = path.join(root, 'blog')
const distDir = path.join(root, 'dist')

marked.use(markedHighlight({
  langPrefix: 'hljs language-',
  highlight(code, lang) {
    let language = 'plaintext'
    if (hljs.getLanguage(lang)) language = lang
    return hljs.highlight(code, { language }).value
  },
}))

function escape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function htmlPage(title: string, body: string): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(title)}</title>
<link rel="stylesheet" href="/style.css">
</head>
<body>
${body}
<script src="/client.js"></script>
</body>
</html>
`
}

type Post = { slug: string; title: string; date: string; html: string }

function build() {
  rmSync(distDir, { recursive: true, force: true })
  mkdirSync(distDir, { recursive: true })

  // Load every markdown file in blog/ and render it to HTML.
  const posts: Post[] = []
  for (const file of readdirSync(blogDir)) {
    if (!file.endsWith('.md')) continue
    const raw = readFileSync(path.join(blogDir, file), 'utf-8')
    const { data, content } = matter(raw)

    // YAML parses unquoted dates as Date objects and quoted ones as strings.
    // Both ISO and "YYYY-MM-DD HH:MM:SS" start with the 10-char date we want.
    let created = data.created
    if (created instanceof Date) created = created.toISOString()

    posts.push({
      slug: file.slice(0, -3),
      title: data.title,
      date: String(created).slice(0, 10),
      html: marked.parse(content) as string,
    })
  }
  posts.sort((a, b) => b.date.localeCompare(a.date))

  // Homepage
  let links = ''
  for (const p of posts) {
    links += `
      <a href="/blog/${p.slug}/" class="block no-underline px-6 py-3 -mx-6 md:w-96 hover:bg-black">
        <p class="font-serif text-white text-lg m-0 leading-tight">${escape(p.title)}</p>
        <p class="font-serif text-neutral-500 text-sm m-0">${p.date}</p>
      </a>`
  }

  const homeBody = `<div class="h-screen flex flex-col md:flex-row">
  <div class="pt-12 pb-6 md:py-0 md:w-1/2 flex items-center">
    <div class="px-8 md:px-12 pr-12 md:pr-16">
      <p class="intro text-lg md:text-2xl">Hi! I'm</p>
      <h1 class="leading-none text-5xl md:text-[7vw]">Iv Robinson</h1>
      <p class="intro text-lg md:text-2xl">Iv rhymes with &quot;give.&quot;</p>
    </div>
  </div>
  <div class="flex-1 overflow-y-auto md:w-1/2 md:flex md:items-center">
    <nav class="flex flex-col gap-4 md:gap-6 px-8 md:pl-20 pb-8 md:pb-0">${links}
    </nav>
  </div>
</div>`
  writeFileSync(path.join(distDir, 'index.html'), htmlPage('iv codes', homeBody))

  // Blog post pages
  for (const p of posts) {
    const dir = path.join(distDir, 'blog', p.slug)
    mkdirSync(dir, { recursive: true })

    const body = `<div class="min-h-screen flex justify-center py-8">
  <div class="px-5 w-full md:w-[60vw] pt-4">
    <h1 class="post-title m-0 leading-tight text-[1.5em] md:whitespace-nowrap md:leading-[1.2] md:pb-1">${escape(p.title)}</h1>
    <p class="font-sans text-neutral-500 text-sm mt-3 mb-6">${p.date}</p>
    <article class="font-sans prose prose-invert prose-base md:prose-lg max-w-none leading-7 md:leading-8 prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline prose-pre:p-0 prose-pre:bg-transparent prose-pre:rounded-none prose-headings:mt-6 prose-headings:mb-2 prose-p:my-2 prose-ul:my-2 prose-li:my-0 prose-pre:my-3">
${p.html}
    </article>
  </div>
</div>`
    writeFileSync(path.join(dir, 'index.html'), htmlPage(p.title, body))
  }

  // Copy the browser JS over untouched.
  writeFileSync(path.join(distDir, 'client.js'), readFileSync(path.join(root, 'src', 'client.js'), 'utf-8'))

  // Build CSS: run tailwind, then stick the hljs code theme on top.
  const tw = Bun.spawnSync(
    ['bunx', 'tailwindcss', '-i', 'src/style.css', '-o', 'dist/tailwind.css', '--minify'],
    { cwd: root, stdout: 'inherit', stderr: 'inherit' },
  )
  if (!tw.success) process.exit(1)
  const hljsCss = readFileSync(path.join(root, 'node_modules/highlight.js/styles/atom-one-dark.css'), 'utf-8')
  const tailwindCss = readFileSync(path.join(distDir, 'tailwind.css'), 'utf-8')
  writeFileSync(path.join(distDir, 'style.css'), hljsCss + '\n' + tailwindCss)
  rmSync(path.join(distDir, 'tailwind.css'))
}

build()

if (process.argv[2] === 'dev') {
  watch(path.join(root, 'src'), { recursive: true }, build)
  watch(blogDir, { recursive: true }, build)

  Bun.serve({
    port: 3000,
    fetch(req) {
      let p = new URL(req.url).pathname
      if (p === '/') p = '/index.html'
      if (!path.extname(p)) p = p.replace(/\/?$/, '/index.html')
      return new Response(Bun.file(path.join(distDir, p)))
    },
  })
  console.log('http://localhost:3000')
}
