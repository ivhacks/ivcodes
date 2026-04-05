'use client'

import { useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

const codeBackground = '#1a1a1a'

export default function CodeBlock({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) {
  const match = /language-(\w+)/.exec(className || '')
  const [copied, setCopied] = useState(false)

  if (!match) {
    return <code className={className} {...props}>{children}</code>
  }

  const lang = match[1]
  const code = String(children).replace(/\n$/, '')

  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="relative not-prose">
      <button
        onClick={copy}
        className="absolute top-3 right-4 text-xs text-neutral-500 hover:text-white font-mono bg-transparent border-none cursor-pointer"
      >
        {copied ? '✓' : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="0"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>}
      </button>
      <SyntaxHighlighter
        style={atomOneDark}
        language={lang}
        customStyle={{
          borderRadius: 0,
          padding: '1.5rem',
          fontSize: '0.9rem',
          background: codeBackground,
          margin: 0,
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
