import { useEffect, useState, type ReactNode } from 'react'
import { ui, type Lang } from '../../data/content'

interface Props {
  lang: Lang
  no: string
  titleZh: string
  titleEn: string
  /** 卡带主题色，用于标题点缀 */
  accent: string
  onClose: () => void
  children: ReactNode
  /** 内容区是否用自定义背景（如牛皮纸照片墙） */
  rawBody?: boolean
}

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
      <div className="fade-in absolute inset-0 bg-slate-900/45 backdrop-blur-sm" onClick={onClose} />

      {/* CRT 转场闪烁 */}
      {flashing && (
        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
          <div className="crt-flash absolute inset-0 bg-white" />
          <div className="crt-scanline absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-white/70 to-transparent" />
        </div>
      )}

      {/* panel */}
      <div className="modal-pop relative z-10 flex max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-[#f7f5ef] shadow-2xl">
        {/* header —— 与卡带标签同一视觉语言 */}
        <header className="flex items-center gap-3 border-b-2 border-slate-800/10 px-5 py-3.5">
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[3px] font-mono text-[10px] font-bold"
            style={{ borderColor: accent, color: accent }}
          >
            ◉
          </span>
          <div className="min-w-0">
            <p className="font-mono text-[10px] tracking-[0.25em] text-slate-400 uppercase">
              No.{no} · {titleEn}
            </p>
            <h2 className="truncate text-lg font-bold text-slate-800">{titleZh}</h2>
          </div>
          <button
            onClick={onClose}
            className="ml-auto shrink-0 rounded-full border border-slate-300 bg-white/70 px-4 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:shadow"
          >
            {ui.eject[lang]}
          </button>
        </header>

        {/* body */}
        <div className={`overflow-y-auto ${rawBody ? '' : 'p-5 sm:p-7'}`}>{children}</div>
      </div>
    </div>
  )
}
