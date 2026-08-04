import * as THREE from 'three'

export type LabelKind = 'blank' | 'vercel' | 'github' | 'azure' | 'microsoft' | 'tuenti'

const W = 640
const H = 420

function makeCanvas(): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement('canvas')
  c.width = W
  c.height = H
  const ctx = c.getContext('2d')!
  return [c, ctx]
}

function toTexture(c: HTMLCanvasElement): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  return tex
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number,
) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

/* ---------------- blank ---------------- */
function drawBlank(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#f4f5f7'
  ctx.fillRect(0, 0, W, H)
  ctx.strokeStyle = '#e2e4e8'
  ctx.lineWidth = 3
  roundRect(ctx, 14, 14, W - 28, H - 28, 10)
  ctx.stroke()
}

/* ---------------- vercel ---------------- */
function drawVercel(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#0a0a0c'
  ctx.fillRect(0, 0, W, H)

  // star field
  for (let i = 0; i < 60; i++) {
    const x = Math.random() * W
    const y = Math.random() * H
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.35 + 0.05})`
    ctx.fillRect(x, y, 2, 2)
  }

  // logo
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.moveTo(46, 62)
  ctx.lineTo(66, 28)
  ctx.lineTo(86, 62)
  ctx.closePath()
  ctx.fill()
  ctx.font = '600 34px Inter, Arial, sans-serif'
  ctx.textBaseline = 'middle'
  ctx.fillText('Vercel', 104, 48)

  // rainbow prism triangle
  const cx = W / 2
  const cy = H / 2 + 6
  const r = 78
  const grad = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r)
  grad.addColorStop(0, '#ff4d4d')
  grad.addColorStop(0.25, '#ffb340')
  grad.addColorStop(0.5, '#f7ff6b')
  grad.addColorStop(0.7, '#4dd2ff')
  grad.addColorStop(1, '#7a5cff')
  ctx.save()
  ctx.shadowColor = 'rgba(140,120,255,0.9)'
  ctx.shadowBlur = 46
  ctx.beginPath()
  ctx.moveTo(cx, cy - r)
  ctx.lineTo(cx + r * 0.9, cy + r * 0.62)
  ctx.lineTo(cx - r * 0.9, cy + r * 0.62)
  ctx.closePath()
  ctx.fillStyle = grad
  ctx.fill()
  ctx.restore()
  ctx.beginPath()
  ctx.moveTo(cx, cy - r * 0.55)
  ctx.lineTo(cx + r * 0.5, cy + r * 0.45)
  ctx.lineTo(cx - r * 0.5, cy + r * 0.45)
  ctx.closePath()
  ctx.fillStyle = 'rgba(255,255,255,0.85)'
  ctx.fill()

  // bottom meta
  ctx.fillStyle = 'rgba(255,255,255,0.75)'
  ctx.font = '500 20px "JetBrains Mono", monospace'
  ctx.fillText('VP OF DESIGN', 40, H - 42)
  ctx.textAlign = 'center'
  ctx.fillText('2024–2026', cx, H - 42)
  ctx.textAlign = 'right'
  ctx.fillText('SFO', W - 40, H - 42)
  ctx.textAlign = 'left'
}

/* ---------------- github ---------------- */
function drawGitHub(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#0d1117'
  ctx.fillRect(0, 0, W, H)

  // simplified octocat mark
  ctx.strokeStyle = '#ffffff'
  ctx.fillStyle = '#ffffff'
  ctx.lineWidth = 5
  const hx = 56
  const hy = 50
  ctx.beginPath()
  ctx.arc(hx, hy, 26, 0, Math.PI * 2)
  ctx.stroke()
  ctx.beginPath() // head
  ctx.arc(hx, hy + 3, 15, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath() // ears
  ctx.moveTo(hx - 13, hy - 6)
  ctx.lineTo(hx - 16, hy - 22)
  ctx.lineTo(hx - 4, hy - 12)
  ctx.moveTo(hx + 13, hy - 6)
  ctx.lineTo(hx + 16, hy - 22)
  ctx.lineTo(hx + 4, hy - 12)
  ctx.fill()

  ctx.font = '600 36px Inter, Arial, sans-serif'
  ctx.textBaseline = 'middle'
  ctx.fillText('GitHub', 102, 50)

  ctx.textAlign = 'right'
  ctx.font = '500 18px "JetBrains Mono", monospace'
  ctx.fillStyle = 'rgba(255,255,255,0.65)'
  ctx.fillText('DIRECTOR OF DESIGN   2023–2024   SFO', W - 36, 50)
  ctx.textAlign = 'left'

  // contribution graph
  const cols = 39
  const rows = 7
  const cell = 11
  const gap = 4
  const ox = 40
  const oy = 130
  let seed = 42
  const rand = () => {
    seed = (seed * 16807) % 2147483647
    return seed / 2147483647
  }
  const greens = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const v = rand()
      const level = v > 0.86 ? 4 : v > 0.7 ? 3 : v > 0.55 ? 2 : v > 0.42 ? 1 : 0
      ctx.fillStyle = greens[level]
      roundRect(ctx, ox + i * (cell + gap), oy + j * (cell + gap), cell, cell, 2)
      ctx.fill()
    }
  }
}

/* ---------------- azure devops ---------------- */
function drawAzure(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#1f3a93'
  ctx.fillRect(0, 0, W, H)
  // stripes
  ctx.fillStyle = '#c0392b'
  ctx.fillRect(0, 18, W, 5)
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 26, W, 3)

  // hexagon logo
  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = 5
  ctx.beginPath()
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 6
    const x = 60 + Math.cos(a) * 22
    const y = 74 + Math.sin(a) * 22
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
  }
  ctx.closePath()
  ctx.stroke()

  ctx.fillStyle = '#ffffff'
  ctx.font = '900 58px "Arial Black", Arial, sans-serif'
  ctx.textBaseline = 'alphabetic'
  ctx.fillText('AZURE', 40, 158)
  ctx.fillText('DEVOPS', 40, 222)
  ctx.font = '700 22px Arial, sans-serif'
  ctx.fillText('DIRECTOR OF DESIGN', 42, 262)

  // red tag
  ctx.fillStyle = '#c0392b'
  roundRect(ctx, 40, 288, 200, 44, 8)
  ctx.fill()
  ctx.fillStyle = '#ffffff'
  ctx.font = '700 24px "JetBrains Mono", monospace'
  ctx.fillText('SFO 2018-19', 58, 320)

  // four icon tiles
  const labels = ['PLAN', 'BUILD', 'DEPLOY', 'SHIP']
  for (let i = 0; i < 4; i++) {
    const x = 400 + (i % 2) * 104
    const y = 70 + Math.floor(i / 2) * 104
    ctx.fillStyle = '#f4f1e8'
    roundRect(ctx, x, y, 88, 88, 10)
    ctx.fill()
    ctx.strokeStyle = '#1f3a93'
    ctx.lineWidth = 3
    roundRect(ctx, x + 8, y + 8, 72, 72, 6)
    ctx.stroke()
    ctx.fillStyle = '#1f3a93'
    ctx.font = '700 15px Arial, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(labels[i], x + 44, y + 52)
    ctx.textAlign = 'left'
  }

  ctx.fillStyle = 'rgba(255,255,255,0.55)'
  ctx.font = '400 15px Arial, sans-serif'
  ctx.fillText('ENTERPRISE CLOUD SERVICES DIVISION', 40, H - 26)
}

/* ---------------- microsoft / yammer ---------------- */
function drawMicrosoft(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#fbfbf9'
  ctx.fillRect(0, 0, W, H)

  // left vertical text
  ctx.save()
  ctx.translate(56, H / 2)
  ctx.rotate(-Math.PI / 2)
  ctx.textAlign = 'center'
  ctx.fillStyle = '#111'
  ctx.font = 'italic 700 30px Georgia, serif'
  ctx.fillText('Microsoft  Yammer.', 0, 0)
  ctx.font = 'italic 400 15px Georgia, serif'
  ctx.fillText('The Enterprise Social Network', 0, 26)
  ctx.restore()
  ctx.textAlign = 'left'

  ctx.fillStyle = '#111'
  ctx.font = 'italic 900 52px Georgia, serif'
  ctx.textAlign = 'right'
  ctx.fillText('Microsoft', W - 40, 86)
  ctx.textAlign = 'left'

  ctx.font = '700 24px Arial, sans-serif'
  ctx.fillText('Product Designer', 190, 168)
  ctx.font = '400 21px Arial, sans-serif'
  ctx.fillText('2013 - 2018', 190, 202)
  ctx.fillText('London and San Francisco', 190, 232)

  ctx.font = '700 21px Arial, sans-serif'
  ctx.fillText('Setup Instructions:', 190, 292)
  ctx.font = '400 21px Arial, sans-serif'
  ctx.fillText('1. Join Yammer.', 190, 324)
  ctx.fillText('2. Design enterprise software.', 190, 354)
  ctx.fillText('3. Ship. Iterate. Repeat.', 190, 384)

  ctx.strokeStyle = '#111'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(120, 40)
  ctx.lineTo(120, H - 40)
  ctx.stroke()
}

/* ---------------- tuenti ---------------- */
function drawTuenti(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#2f6fd6'
  ctx.fillRect(0, 0, W, H)

  ctx.fillStyle = '#ffffff'
  ctx.font = '800 56px Inter, Arial, sans-serif'
  ctx.textBaseline = 'middle'
  ctx.fillText('@tuenti', 44, 74)

  ctx.font = '500 20px "JetBrains Mono", monospace'
  ctx.fillStyle = 'rgba(255,255,255,0.85)'
  ctx.fillText('HEAD OF DESIGN', 44, H - 96)
  ctx.fillText('MAD · BCN', 44, H - 64)
  ctx.fillText('2010–2013', 44, H - 36)

  // right chat strip
  ctx.fillStyle = '#eef4fd'
  ctx.fillRect(W - 96, 0, 96, H)
  let seed = 7
  const rand = () => {
    seed = (seed * 48271) % 2147483647
    return seed / 2147483647
  }
  for (let i = 0; i < 11; i++) {
    const y = 24 + i * 36
    ctx.fillStyle = `rgba(70,140,60,${0.5 + rand() * 0.5})`
    ctx.beginPath()
    ctx.arc(W - 70, y, 9, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#9fb4cc'
    roundRect(ctx, W - 52, y - 5, 30, 10, 4)
    ctx.fill()
  }
}

const DRAWERS: Record<LabelKind, (ctx: CanvasRenderingContext2D) => void> = {
  blank: drawBlank,
  vercel: drawVercel,
  github: drawGitHub,
  azure: drawAzure,
  microsoft: drawMicrosoft,
  tuenti: drawTuenti,
}

export function createLabelTexture(kind: LabelKind): THREE.CanvasTexture {
  const [canvas, ctx] = makeCanvas()
  DRAWERS[kind](ctx)
  return toTexture(canvas)
}
