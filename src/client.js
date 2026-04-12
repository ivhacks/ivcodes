// Shrink the post title on desktop until it fits on one line.
// Each post has a different length, so a fixed size would either overflow or leave a lot of empty space.
const title = document.querySelector('.post-title')
if (title) {
  const fit = () => {
    if (!window.matchMedia('(min-width: 768px)').matches) {
      title.style.fontSize = ''
      return
    }
    let size = 6
    title.style.fontSize = size + 'rem'
    while (title.scrollWidth > title.parentElement.clientWidth && size > 1) {
      size = size - 0.25
      title.style.fontSize = size + 'rem'
    }
    // One extra step down for breathing room.
    title.style.fontSize = (size - 0.25) + 'rem'
  }
  fit()
  window.addEventListener('resize', fit)
}

// Add a copy button to every code block in a post.
const copyIcon = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>'
for (const pre of document.querySelectorAll('article pre')) {
  const btn = document.createElement('button')
  btn.className = 'copy-btn'
  btn.innerHTML = copyIcon
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(pre.querySelector('code').textContent)
    btn.textContent = '✓'
    setTimeout(() => { btn.innerHTML = copyIcon }, 1500)
  })
  pre.appendChild(btn)
}
