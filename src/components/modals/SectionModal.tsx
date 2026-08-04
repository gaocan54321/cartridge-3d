import { useEffect, useState, type ReactNode } from 'react'
import { ui, type Lang } from '../../data/content'

interface Props {
  lang: Lang
  no: string
  titleZh: string
  titleEn: string
  /** 卡带主题色，用于印章与点缀 */
  accent: string
  onClose: () => void
  children: ReactNode
  /** 内容区是否用自定义背景（如牛皮纸照片墙） */
  rawBody?: boolean
}

/** 面板外壳：一本摊开的手工册子 —— 米色纸 + 缝线边框 + 四角螺丝 + 红印章编号 */
export default function SectionModal({
  lang, no, titleZh, titleEn, accent, onClose, children, rawBody,
}: Props) {
  const [flashing, setFlashing] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setFlashing(false), 520)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
      {/* backdrop */}
      <div className="fade-in absolute inset-0 bg-[#2b2620]/50 backdrop-blur-[2px]" onClick={onClose} />

      {/* CRT 转场闪烁 */}
      {flashing && (
        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
          <div className="crt-flash absolute inset-0 bg-white" />
          <div className="crt-scanline absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-white/70 to-transparent" />
        </div>
      )}

      {/* 册子本体：微微斜放，像随手摊在桌上 */}
      <div className="modal-pop paper-cream relative z-10 flex max-h-full w-full max-w-3xl -rotate-[0.4deg] flex-col overflow-hidden rounded-[4px] shadow-[0_18px_50px_rgba(40,30,15,0.4)]">
        {/* 四角螺丝（呼应卡带背面） */}
        {['left-2 top-2', 'right-2 top-2', 'left-2 bottom-2', 'right-2 bottom-2'].map((pos) => (
          <span key={pos} className={`absolute ${pos} z-10 h-2.5 w-2.5 rounded-full border border-[#8a7a5e]/60 bg-[#c9bda3] shadow-inner`} />
        ))}

        {/* 缝线内框 */}
        <div className="stitch-b pointer-events-none absolute inset-3 z-10 rounded-[2px]" />

        {/* 书脊 */}
        <span className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-r from-[#b8a582] to-transparent" />

        {/* header —— 铅印刊头 */}
        <header className="relative flex items-end gap-3 px-7 pb-3 pt-5">
          <span
            className="seal flex h-10 w-10 shrink-0 rotate-[-6deg] items-center justify-center rounded-[3px] text-sm font-bold"
            style={{ background: accent }}
          >
            {no}
          </span>
          <div className="min-w-0 pb-0.5">
            <p className="font-mono text-[9px] tracking-[0.35em] text-[#8a7a5e] uppercase">
              Portfolio Archive · Vol.{no}
            </p>
            <h2 className="print-serif truncate text-2xl font-bold tracking-wide text-[#3d3428]">
              {titleZh}
              <span className="ml-2 align-middle font-mono text-[10px] font-normal tracking-[0.25em] text-[#a08e6c]">
                {titleEn}
              </span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="mb-0.5 ml-auto shrink-0 rounded-[3px] border border-[#8a7a5e]/50 bg-[#efe8d6] px-3.5 py-1.5 font-mono text-[11px] font-semibold text-[#5d4f3a] shadow-[0_2px_0_#8a7a5e66] transition hover:-translate-y-0.5 hover:shadow-[0_3px_0_#8a7a5e66] active:translate-y-0 active:shadow-none"
          >
            {ui.eject[lang]}
          </button>
        </header>

        {/* 刊头分隔线：细-粗-细 */}
        <div className="mx-7 border-b border-[#8a7a5e]/40" />
        <div className="mx-7 mt-[3px] border-b-2 border-[#8a7a5e]/60" />

        {/* body */}
        <div className={`overflow-y-auto ${rawBody ? '' : 'px-7 py-6'}`}>{children}</div>
      </div>
    </div>
  )
}
