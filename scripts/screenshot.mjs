/**
 * Full-page screenshot script using Puppeteer.
 * Starts the Vite dev server, captures the page, then shuts down.
 *
 * Usage:
 *   node scripts/screenshot.mjs                     # screenshots localhost:5173/
 *   node scripts/screenshot.mjs /portfolio           # screenshots a specific route
 *   node scripts/screenshot.mjs / --width 375        # mobile viewport
 *
 * Output: screenshots/<timestamp>-<route>.png
 */

import puppeteer from 'puppeteer'
import { spawn } from 'child_process'
import { mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

// ── CLI args ────────────────────────────────────────────────────────────────
const args = process.argv.slice(2)
const routeArg = args.find(a => a.startsWith('/')) ?? '/'
const widthArg = args.find((_, i) => args[i - 1] === '--width')
const PORT = 5173
const VIEWPORT_WIDTH = widthArg ? parseInt(widthArg) : 1440
const VIEWPORT_HEIGHT = 900

// ── Helpers ─────────────────────────────────────────────────────────────────
function waitForServer(port, timeout = 30_000) {
  return new Promise((resolve, reject) => {
    const start = Date.now()
    const check = () => {
      import('http').then(({ default: http }) => {
        const req = http.get(`http://localhost:${port}`, () => {
          resolve()
        })
        req.on('error', () => {
          if (Date.now() - start > timeout) {
            reject(new Error(`Dev server did not start within ${timeout}ms`))
          } else {
            setTimeout(check, 300)
          }
        })
        req.end()
      })
    }
    check()
  })
}

function slugify(route) {
  return route.replace(/\//g, '-').replace(/^-/, '') || 'home'
}

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
}

// ── Main ─────────────────────────────────────────────────────────────────────
const outDir = join(ROOT, 'screenshots')
mkdirSync(outDir, { recursive: true })

console.log(`Starting dev server on port ${PORT}…`)
const server = spawn('npm', ['run', 'dev'], {
  cwd: ROOT,
  stdio: 'pipe',
  shell: true,
})

server.stderr.on('data', d => process.stderr.write(d))

try {
  await waitForServer(PORT)
  console.log('Dev server ready.')

  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  await page.setViewport({ width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT })

  // Hash-router projects use /#/route; plain BrowserRouter uses /route
  const useHash = true // set false for BrowserRouter projects
  const url = `http://localhost:${PORT}/${useHash ? '#' + routeArg : routeArg}`

  console.log(`Navigating to ${url}`)
  await page.goto(url, { waitUntil: 'networkidle0' })

  // Scroll incrementally to trigger IntersectionObserver-based reveal animations
  await page.evaluate(async () => {
    await new Promise(resolve => {
      const distance = 200
      const delay = 80
      const timer = setInterval(() => {
        window.scrollBy(0, distance)
        if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
          clearInterval(timer)
          window.scrollTo(0, 0)
          resolve()
        }
      }, delay)
    })
  })

  // Let all animations finish after scroll
  await new Promise(r => setTimeout(r, 1500))

  const filename = `${timestamp()}-${slugify(routeArg)}-${VIEWPORT_WIDTH}w.png`
  const outPath = join(outDir, filename)

  await page.screenshot({ path: outPath, fullPage: true })
  console.log(`Saved: screenshots/${filename}`)

  await browser.close()
} finally {
  server.kill()
}
