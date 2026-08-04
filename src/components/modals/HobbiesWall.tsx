import { hobbies, type Lang } from '../../data/content'

interface Props {
  lang: Lang
}

/** 兴趣爱好 · 牛皮纸拍立得照片墙（慵懒错落） */
export default function HobbiesWall({ lang }: Props) {
  return (
    <div className="kraft-bg relative h-[540px] overflow-hidden sm:h-[580px]">
      {/* 墙面标题（手写感） */}
      <p
        className="absolute left-5 top-4 text-lg font-bold text-[#5b4a2a]/80"
        style={{ fontFamily: '"Kaiti SC", KaiTi, "STKaiti", serif' }}
      >
        {lang === 'zh' ? '闲暇时光 · 随手贴' : 'Off-duty moments'}
      </p>

      {hobbies.map((h) => (
        <div
          key={h.id}
          className="group absolute w-[27%] min-w-[132px] max-w-[190px] transition-transform duration-300 hover:z-20 hover:scale-105 hover:rotate-0"
          style={{ left: `${h.x}%`, top: `${h.y}%`, transform: `rotate(${h.rot}deg)` }}
        >
          {/* 胶带 */}
          <div className="tape-strip absolute -top-2.5 left-1/2 z-10 h-5 w-16 -translate-x-1/2 -rotate-2 rounded-sm" />

          {/* 拍立得 */}
          <div className="rounded-[4px] bg-[#fdfcf8] p-2 pb-2.5 shadow-[0_6px_16px_rgba(80,60,30,0.35)]">
            <div
              className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[2px]"
              style={{
                background: `linear-gradient(150deg, hsl(${h.hue} 40% 72%), hsl(${(h.hue + 35) % 360} 34% 50%))`,
              }}
            >
              <span className="font-mono text-[9px] tracking-[0.3em] text-white/80">PHOTO</span>
            </div>
            <p
              className="mt-2 text-center text-[13px] font-bold leading-tight text-[#4a3c28]"
              style={{ fontFamily: '"Kaiti SC", KaiTi, "STKaiti", serif' }}
            >
              {h.title[lang]}
            </p>
            <p className="text-center text-[10px] text-[#4a3c28]/60">{h.caption[lang]}</p>
          </div>
        </div>
      ))}

      {/* 角落涂鸦 */}
      <svg viewBox="0 0 100 60" className="absolute bottom-3 right-4 h-10 w-16 opacity-40">
        <path d="M5 30 Q 30 5, 50 30 T 95 30" fill="none" stroke="#5b4a2a" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="50" cy="48" r="4" fill="none" stroke="#5b4a2a" strokeWidth="2" />
      </svg>
    </div>
  )
}
