import { useEffect, useRef } from 'react'

const FRAMES = 12
const CENTER = 6

/** 交互人物：头跟着鼠标左右转（帧序列）+ 轻微俯仰与呼吸浮动 */
export default function Character() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRefs = useRef<(HTMLImageElement | null)[]>([])

  useEffect(() => {
    let raf = 0
    let target = CENTER
    let current = CENTER
    let tiltY = 0
    let tiltX = 0
    let curTiltY = 0
    let curTiltX = 0
    let active = -1
    let last = performance.now()
    const t0 = last

    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1
      target = (nx * 0.5 + 0.5) * (FRAMES - 1)
      tiltY = nx * 7
      tiltX = -ny * 4
    }
    window.addEventListener('pointermove', onMove)

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      const k = 1 - Math.exp(-9 * dt)
      current += (target - current) * k
      curTiltY += (tiltY - curTiltY) * k
      curTiltX += (tiltX - curTiltX) * k

      const idx = Math.max(0, Math.min(FRAMES - 1, Math.round(current)))
      if (idx !== active) {
        if (active >= 0) imgRefs.current[active]?.style.setProperty('opacity', '0')
        imgRefs.current[idx]?.style.setProperty('opacity', '1')
        active = idx
      }

      const bob = Math.sin((now - t0) / 1100) * 4
      if (wrapRef.current) {
        wrapRef.current.style.transform =
          `translateY(${bob}px) perspective(700px) rotateY(${curTiltY}deg) rotateX(${curTiltX}deg)`
      }
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <div className="pointer-events-none relative select-none">
      <div ref={wrapRef} className="relative will-change-transform">
        {Array.from({ length: FRAMES }, (_, i) => (
          <img
            key={i}
            ref={(el) => {
              imgRefs.current[i] = el
            }}
            src={`/character/frames/f${String(i).padStart(2, '0')}.webp`}
            alt=""
            draggable={false}
            className="w-full drop-shadow-[0_14px_24px_rgba(49,64,94,0.35)]"
            style={{
              opacity: i === CENTER ? 1 : 0,
              position: i === 0 ? 'relative' : 'absolute',
              inset: 0,
            }}
          />
        ))}
      </div>
      {/* 地面投影 */}
      <div className="mx-auto mt-2 h-2.5 w-3/5 rounded-full bg-slate-900/15 blur-[6px]" />
    </div>
  )
}
