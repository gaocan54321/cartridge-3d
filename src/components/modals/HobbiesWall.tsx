import { hobbies, type Lang } from '../../data/content'

interface Props {
  lang: Lang
}

/** 兴趣爱好 · 牛皮纸拍立得墙（慵懒错落 + 咖啡渍 + 涂鸦） */
export default function HobbiesWall({ lang }: Props) {
  return (
    <div className="kraft-bg relative h-[560px] overflow-hidden sm:h-[600px]">
      {/* 墙面标题（手写） */}
      <p className="handwrite absolute left-6 top-5 rotate-[-2deg] text-xl font-bold text-[#5b4a2a]/85">
        {lang === 'zh' ? '闲暇时光 · 随手贴' : 'off-duty moments'}
      </p>
      {/* 标题下的波浪线 */}
      <svg viewBox="0 0 120 10" className="absolute left-6 top-12 h-3 w-28 opacity-60">
        <path d="M2 6 Q 12 1, 22 6 T 42 6 T 62 6 T 82 6 T 102 6 T 118 6" fill="none" stroke="#5b4a2a" strokeWidth="2" strokeLinecap="round" />
      </svg>

      {/* 咖啡渍 */}
      <div className="absolute bottom-10 left-8 h-28 w-28 rounded-full border-[5px] border-[#8a6a3a]/25 blur-[1px]" />
      <div className="absolute bottom-16 left-24 h-6 w-6 rounded-full bg-[#8a6a3a]/15 blur-[2px]" />

      {hobbies.map((h, i) => (
        <div
          key={h.id}
          className="group absolute w-[27%] min-w-[132px] max-w-[185px] transition-all duration-300 hover:z-20 hover:rotate-0 hover:scale-105"
          style={{ left: `${h.x}%`, top: `${h.y}%`, transform: `rotate(${h.rot}deg)` }}
        >
          {/* 胶带：黄胶带 / 透明胶带交替 */}
          <div
            className={`${i % 3 === 1 ? 'tape-clear' : 'tape-strip'} absolute -top-2.5 left-1/2 z-10 h-5 -translate-x-1/2 rounded-sm ${
              i % 2 ? 'w-14 rotate-2' : 'w-16 -rotate-2'
            }`}
          />

          {/* 拍立得 */}
          <div className="rounded-[3px] bg-[#fdfcf6] p-2 pb-2.5 shadow-[0_2px_4px_rgba(80,60,30,0.3),0_10px_20px_rgba(80,60,30,0.28)]">
            <div
              className="halftone flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[2px]"
              style={{ backgroundColor: `hsl(${h.hue} 32% 68%)` }}
            >
              <span className="rounded-sm bg-[#fdfcf6]/85 px-1.5 font-mono text-[9px] tracking-[0.3em] text-[#6b5c44]">
                PHOTO
              </span>
            </div>
            <p className="handwrite mt-2 text-center text-[14px] font-bold leading-tight text-[#4a3c28]">
              {h.title[lang]}
            </p>
            <p className="handwrite text-center text-[11px] text-[#4a3c28]/65">{h.caption[lang]}</p>
          </div>
        </div>
      ))}

      {/* 角落涂鸦：笑脸 + 音符 */}
      <svg viewBox="0 0 100 60" className="absolute bottom-4 right-5 h-11 w-16 opacity-50">
        <circle cx="22" cy="26" r="14" fill="none" stroke="#5b4a2a" strokeWidth="2.5" />
        <circle cx="17" cy="22" r="1.6" fill="#5b4a2a" />
        <circle cx="27" cy="22" r="1.6" fill="#5b4a2a" />
        <path d="M15 29 Q 22 36, 29 29" fill="none" stroke="#5b4a2a" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M60 40 L60 16 L78 12 L78 34" fill="none" stroke="#5b4a2a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <ellipse cx="55" cy="42" rx="6" ry="4.5" fill="#5b4a2a" transform="rotate(-18 55 42)" />
        <ellipse cx="73" cy="36" rx="6" ry="4.5" fill="#5b4a2a" transform="rotate(-18 73 36)" />
      </svg>
    </div>
  )
}
