import { socials, type Lang } from '../../data/content'

interface Props {
  lang: Lang
}

const ROTS = ['-rotate-2', 'rotate-1', 'rotate-2', '-rotate-1', 'rotate-[0.5deg]', '-rotate-[2.5deg]']

/** 社媒 · 一张贴纸页：异形模切贴纸随手贴在本子上 */
export default function SocialCard({ lang }: Props) {
  return (
    <div className="relative py-2">
      {/* 手写标题涂鸦 */}
      <p className="handwrite mb-5 rotate-[-1deg] text-center text-base text-[#6b5c44]">
        {lang === 'zh' ? '在这些地方也能抓到我 ↓' : 'find me around the internet ↓'}
      </p>

      <div className="flex flex-wrap items-start justify-center gap-x-5 gap-y-6">
        {socials.map((s, i) => (
          <a
            key={s.id}
            href={s.url}
            target="_blank"
            rel="noreferrer"
            className={`sticker-peel group relative block w-40 ${ROTS[i % ROTS.length]} rounded-[10px] p-[3px] transition-all duration-300 hover:z-10 hover:rotate-0 hover:scale-105`}
            style={{
              background: '#fdfbf4',
              boxShadow: '0 6px 16px rgba(60,45,20,0.25)',
            }}
          >
            {/* 模切白边内的彩色贴面 */}
            <div
              className="flex h-24 flex-col justify-between rounded-[8px] p-3"
              style={{ background: `linear-gradient(160deg, ${s.color}, ${s.color}cc)` }}
            >
              <span className="text-xl font-bold text-white drop-shadow-sm">{s.name[lang]}</span>
              <span className="truncate font-mono text-[10px] text-white/80">{s.handle}</span>
            </div>

            {/* hover 提示 */}
            <span className="pointer-events-none absolute -top-2.5 left-1/2 -translate-x-1/2 -rotate-3 rounded-[3px] bg-[#33302a] px-2 py-0.5 font-mono text-[9px] text-[#f4efe3] opacity-0 shadow transition group-hover:opacity-100">
              GO →
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
