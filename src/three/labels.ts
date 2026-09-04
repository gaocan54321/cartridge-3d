import * as THREE from 'three'

export type LabelKind = 'about' | 'contact' | 'social' | 'projects' | 'campus' | 'internships'

const W = 640
const H = 420

const HAN_FONT = '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif'
const MONO_FONT = '"JetBrains Mono", "Courier New", monospace'

interface LabelSpec {
  zh: string
  en: string
  no: string
  bg: string
  ink: string
  accent: string
  dark: boolean
}

const SPECS: Record<LabelKind, LabelSpec> = {
  about: {
    zh: '简介', en: 'ABOUT ME', no: '01',
    bg: '#f7f5ef', ink: '#31405e', accent: '#c0392b', dark: false,
  },
  contact: {
    zh: '联系', en: 'CONTACT', no: '02',
    bg: '#15171c', ink: '#f2f2f0', accent: '#07c160', dark: true,
  },
  social: {
    zh: '社媒', en: 'SOCIAL LINKS', no: '03',
    bg: '#eef4fd', ink: '#1f3a93', accent: '#2f6fd6', dark: false,
  },
  projects: {
    zh: '项目', en: 'PROJECTS', no: '04',
    bg: '#f3ecd9', ink: '#5b4a2a', accent: '#c0392b', dark: false,
  },
  campus: {
    zh: '校园', en: 'CAMPUS LIFE', no: '05',
    bg: '#f0ede4', ink: '#4a4438', accent: '#31405e', dark: false,
  },
  internships: {
    zh: '实习', en: 'INTERNSHIPS', no: '06',
    bg: '#26324e', ink: '#e9e4d4', accent: '#d9c9a1', dark: true,
  },
}

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

/** 圆形磁带卷盘：外圈 + 内环 + 轴心 + 辐条 + 底部走带 */
function drawReel(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number, r: number,
  ink: string, accent: string,
) {
  ctx.save()

  // tape threading out of the bottom of the reel
  ctx.strokeStyle = ink
  ctx.globalAlpha = 0.45
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.moveTo(cx - r - 26, cy + r * 0.92)
  ctx.quadraticCurveTo(cx, cy + r + 30, cx + r + 26, cy + r * 0.92)
  ctx.stroke()
  ctx.globalAlpha = 1

  // outer disc
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.fillStyle = ink
  ctx.globalAlpha = 0.07
  ctx.fill()
  ctx.globalAlpha = 1
  ctx.lineWidth = 9
  ctx.strokeStyle = ink
  ctx.stroke()

  // wound tape rings
  ctx.globalAlpha = 0.35
  ctx.lineWidth = 2.5
  for (const rr of [r * 0.86, r * 0.74]) {
    ctx.beginPath()
    ctx.arc(cx, cy, rr, 0, Math.PI * 2)
    ctx.stroke()
  }
  ctx.globalAlpha = 1

  // hub
  ctx.beginPath()
  ctx.arc(cx, cy, r * 0.34, 0, Math.PI * 2)
  ctx.lineWidth = 4
  ctx.stroke()

  // spokes (3 trapezoid windows, reel-style)
  for (let i = 0; i < 3; i++) {
    const a = (Math.PI * 2 * i) / 3 - Math.PI / 2
    ctx.beginPath()
    ctx.arc(cx, cy, r * 0.16, a, a + 0.001)
    ctx.moveTo(cx + Math.cos(a - 0.42) * r * 0.14, cy + Math.sin(a - 0.42) * r * 0.14)
    ctx.lineTo(cx + Math.cos(a - 0.28) * r * 0.32, cy + Math.sin(a - 0.28) * r * 0.32)
    ctx.lineTo(cx + Math.cos(a + 0.28) * r * 0.32, cy + Math.sin(a + 0.28) * r * 0.32)
    ctx.lineTo(cx + Math.cos(a + 0.42) * r * 0.14, cy + Math.sin(a + 0.42) * r * 0.14)
    ctx.closePath()
    ctx.fillStyle = accent
    ctx.fill()
  }

  // center axle
  ctx.beginPath()
  ctx.arc(cx, cy, r * 0.06, 0, Math.PI * 2)
  ctx.fillStyle = ink
  ctx.fill()

  // screws on the ring
  ctx.fillStyle = ink
  for (let i = 0; i < 4; i++) {
    const a = (Math.PI / 2) * i + Math.PI / 4
    ctx.beginPath()
    ctx.arc(cx + Math.cos(a) * (r - 2), cy + Math.sin(a) * (r - 2), 3.5, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.restore()
}

function drawLabel(ctx: CanvasRenderingContext2D, spec: LabelSpec) {
  // background
  ctx.fillStyle = spec.bg
  ctx.fillRect(0, 0, W, H)

  // subtle paper grain lines (light labels only)
  if (!spec.dark) {
    ctx.strokeStyle = spec.ink
    ctx.globalAlpha = 0.05
    ctx.lineWidth = 1
    for (let y = 12; y < H; y += 14) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(W, y)
      ctx.stroke()
    }
    ctx.globalAlpha = 1
  }

  // double frame
  ctx.strokeStyle = spec.ink
  ctx.lineWidth = 4
  roundRect(ctx, 12, 12, W - 24, H - 24, 10)
  ctx.stroke()
  ctx.globalAlpha = 0.35
  ctx.lineWidth = 1.5
  roundRect(ctx, 24, 24, W - 48, H - 48, 6)
  ctx.stroke()
  ctx.globalAlpha = 1

  // header strip
  ctx.fillStyle = spec.ink
  ctx.font = `600 19px ${MONO_FONT}`
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'left'
  ctx.fillText('GC · PORTFOLIO SERIES', 44, 52)
  ctx.textAlign = 'right'
  ctx.fillText(`No.${spec.no}`, W - 44, 52)
  ctx.textAlign = 'left'

  // header rule
  ctx.globalAlpha = 0.5
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(44, 76)
  ctx.lineTo(W - 44, 76)
  ctx.stroke()
  ctx.globalAlpha = 1

  // big Chinese title (pure hanzi)
  const len = spec.zh.length
  const size = len <= 2 ? 148 : len === 3 ? 122 : 96
  ctx.fillStyle = spec.ink
  ctx.font = `700 ${size}px ${HAN_FONT}`
  ctx.textBaseline = 'middle'
  const ty = H / 2 + 6
  if (len <= 2) {
    // spread the two characters for a seal-like look
    ctx.textAlign = 'center'
    const gap = size * 1.18
    const x0 = 64 + (300 - gap) / 2
    for (let i = 0; i < len; i++) {
      ctx.fillText(spec.zh[i], x0 + i * gap, ty)
    }
    ctx.textAlign = 'left'
  } else {
    ctx.fillText(spec.zh, 58, ty)
  }

  // red accent seal square next to short titles
  if (len <= 2) {
    ctx.fillStyle = spec.accent
    roundRect(ctx, 58, ty + size * 0.62, 34, 34, 4)
    ctx.fill()
    ctx.fillStyle = spec.dark ? spec.bg : '#ffffff'
    ctx.font = `700 20px ${HAN_FONT}`
    ctx.textAlign = 'center'
    ctx.fillText('卷', 75, ty + size * 0.62 + 18)
    ctx.textAlign = 'left'
  }

  // circular tape reel on the right
  drawReel(ctx, W - 152, H / 2 + 8, 104, spec.ink, spec.accent)

  // bottom band
  ctx.globalAlpha = 0.5
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(44, H - 64)
  ctx.lineTo(W - 44, H - 64)
  ctx.stroke()
  ctx.globalAlpha = 1

  ctx.fillStyle = spec.ink
  ctx.font = `600 21px ${MONO_FONT}`
  ctx.fillText(spec.en, 44, H - 38)
  ctx.textAlign = 'right'
  ctx.globalAlpha = 0.7
  ctx.fillText('SIDE A · 60 MIN', W - 44, H - 38)
  ctx.textAlign = 'left'
  ctx.globalAlpha = 1
}

export function createLabelTexture(kind: LabelKind): THREE.CanvasTexture {
  const [canvas, ctx] = makeCanvas()
  drawLabel(ctx, SPECS[kind])
  return toTexture(canvas)
}
