import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  life: number // 1 → 0
  size: number
  hue: number
}

/** 蝴蝶光标：扑翼小蝴蝶 + 流光尾迹（仅触屏以外的设备启用） */
export default function ButterflyCursor() {
  const bfRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const dpr = Math.min(window.devicePixelRatio, 2)

    // 预渲染粒子纹理，避免每帧 createRadialGradient
    const particleCanvas = document.createElement('canvas')
    particleCanvas.width = 64
    particleCanvas.height = 64
    const pctx = particleCanvas.getContext('2d')!
    const gradient = pctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    gradient.addColorStop(0, 'rgba(255,255,255,0.6)')
    gradient.addColorStop(0.4, 'rgba(255,255,255,0.2)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    pctx.fillStyle = gradient
    pctx.fillRect(0, 0, 64, 64)

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
    }
    resize()
    window.addEventListener('resize', resize)

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let bx = mx
    let by = my
    let visible = false
    const particles: Particle[] = []
    let lastSpawn = 0
    let raf = 0
    let last = performance.now()

    const onMove = (e: PointerEvent) => {
      mx = e.clientX
      my = e.clientY
      if (!visible) {
        visible = true
        if (bfRef.current) bfRef.current.style.opacity = '1'
        bx = mx
        by = my
      }
    }
    const onLeave = () => {
      visible = false
      if (bfRef.current) bfRef.current.style.opacity = '0'
    }
    window.addEventListener('pointermove', onMove)
    document.documentElement.addEventListener('pointerleave', onLeave)

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      // 蝴蝶跟随（轻盈的慢阻尼）
      const k = 1 - Math.exp(-7 * dt)
      bx += (mx - bx) * k
      by += (my - by) * k
      const wobble = Math.sin(now / 240) * 2.5
      if (bfRef.current) {
        bfRef.current.style.transform = `translate(${bx - 14}px, ${by - 12 + wobble}px)`
      }

      // 尾迹粒子
      if (visible && now - lastSpawn > 26) {
        lastSpawn = now
        particles.push({
          x: bx + (Math.random() - 0.5) * 6,
          y: by + (Math.random() - 0.5) * 6,
          life: 1,
          size: 2 + Math.random() * 2.5,
          hue: (now / 24 + Math.random() * 40) % 360,
        })
        if (particles.length > 90) particles.shift()
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.globalCompositeOperation = 'lighter'
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life -= dt * 1.6
        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }
        p.y -= dt * 14
        const size = p.size * p.life * dpr * 6
        ctx.globalAlpha = 0.55 * p.life
        ctx.drawImage(particleCanvas, p.x * dpr - size / 2, p.y * dpr - size / 2, size, size)
      }
      ctx.globalAlpha = 1
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[90]" />
      {/* 蝴蝶本体 */}
      <div
        ref={bfRef}
        className="pointer-events-none fixed left-0 top-0 z-[95] opacity-0 transition-opacity duration-300"
        style={{ width: 28, height: 24 }}
      >
        <svg viewBox="0 0 28 24" style={{ filter: 'drop-shadow(0 0 4px rgba(255,180,220,0.8))' }}>
          {/* 左翅 */}
          <g className="butterfly-wing-l">
            <path
              d="M13 12 C 7 3, 1 4, 2 9 C 3 13, 8 14, 13 12 Z"
              fill="url(#wg1)"
              opacity="0.95"
            />
            <path d="M13 13 C 8 13, 4 16, 6 19 C 8 21, 12 17, 13 13 Z" fill="url(#wg1)" opacity="0.75" />
          </g>
          {/* 右翅 */}
          <g className="butterfly-wing-r">
            <path
              d="M15 12 C 21 3, 27 4, 26 9 C 25 13, 20 14, 15 12 Z"
              fill="url(#wg2)"
              opacity="0.95"
            />
            <path d="M15 13 C 20 13, 24 16, 22 19 C 20 21, 16 17, 15 13 Z" fill="url(#wg2)" opacity="0.75" />
          </g>
          {/* 身体 */}
          <ellipse cx="14" cy="13" rx="1.4" ry="5" fill="#5b4a6e" />
          <path d="M13 8 Q 11 4 9 3 M15 8 Q 17 4 19 3" stroke="#5b4a6e" strokeWidth="0.8" fill="none" strokeLinecap="round" />
          <defs>
            <linearGradient id="wg1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffd6f2" />
              <stop offset="100%" stopColor="#b7c6ff" />
            </linearGradient>
            <linearGradient id="wg2" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffd6f2" />
              <stop offset="100%" stopColor="#b7c6ff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  )
}
