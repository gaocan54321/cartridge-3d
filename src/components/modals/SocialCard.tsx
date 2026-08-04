import { socials, ui, type Lang } from '../../data/content'

interface Props {
  lang: Lang
}

const ROTS = ['-rotate-2', 'rotate-1', 'rotate-2', '-rotate-1']

/** 社媒 · 贴纸页：带二维码的模切贴纸随手贴在本子上 */
export default function SocialCard({ lang }: Props) {
  return (
    <div className="relative py-2">
      <p className="handwrite mb-6 rotate-[-1deg] text-center text-base text-[#6b5c44]">
        {lang === 'zh' ? '扫码或点一下，来这些地方找我 ↓' : 'scan or tap to find me ↓'}
      </p>

      <div className="flex flex-wrap items-start justify-center gap-x-6 gap-y-7">
        {socials.map((s, i) => (
          <a
            key={s.id}
            href={s.url}
            target="_blank"
            rel="noreferrer"
            className={`sticker-peel group relative block w-44 ${ROTS[i % ROTS.length]} rounded-[10px] bg-[#fdfbf4] p-[5px] shadow-[0_6px_16px_rgba(60,45,20,0.25)] transition-all duration-300 hover:z-10 hover:rotate-0 hover:scale-105`}
          >
            {/* 彩色贴头 */}
            <div
              className="flex items-center justify-between rounded-t-[7px] px-3 py-2"
              style={{ background: `linear-gradient(160deg, ${s.color}, ${s.color}cc)` }}
            >
              <span className="text-base font-bold text-white drop-shadow-sm">{s.name[lang]}</span>
              <span className="font-mono text-[9px] text-white/70">→</span>
            </div>

            {/* 二维码（有的平台） */}
            {s.qr ? (
              <div className="mt-1.5 overflow-hidden rounded-[5px] border border-[#e5dcc8] bg-white">
                <img src={s.qr} alt={`${s.name.zh}二维码`} className="h-36 w-full object-cover" draggable={false} />
              </div>
            ) : (
              <div className="mt-1.5 flex h-36 items-center justify-center rounded-[5px] border border-[#e5dcc8] bg-[#f4efe3]">
                <span className="font-mono text-2xl font-bold" style={{ color: s.color }}>
                  {s.name.en}
                </span>
              </div>
            )}

            <p className="truncate px-1.5 py-1.5 text-center font-mono text-[10px] text-[#6b5c44]">
              {s.handle}
            </p>

            {/* hover 提示 */}
            <span className="pointer-events-none absolute -top-2.5 left-1/2 z-10 -translate-x-1/2 -rotate-3 rounded-[3px] bg-[#33302a] px-2 py-0.5 font-mono text-[9px] text-[#f4efe3] opacity-0 shadow transition group-hover:opacity-100">
              {s.qr ? ui.scanQr[lang] : 'GO →'}
            </span>
          </a>
        ))}
      </div>

      {/* 角落涂鸦：箭头 */}
      <svg viewBox="0 0 80 60" className="absolute -bottom-1 left-6 h-10 w-14 opacity-50">
        <path d="M8 8 Q 30 40, 62 44" fill="none" stroke="#6b5c44" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M52 36 L 64 45 L 50 50" fill="none" stroke="#6b5c44" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}
