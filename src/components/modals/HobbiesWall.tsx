import { hobbies, type Lang } from '../../data/content'

interface Props {
  lang: Lang
}

/** 两种拍立得边框：照片窗口内缩（带出血，盖住边框微倾斜）+ 手写区位置 */
const FRAMES = [
  {
    src: '/frames/polaroid-1.png', // 红回形针款
    photo: { left: '17%', top: '9%', width: '69.5%', height: '63%' },
    caption: { top: '74%', left: '20%', right: '20%' },
  },
  {
    src: '/frames/polaroid-2.png', // 美纹纸胶带款
    photo: { left: '26%', top: '19.5%', width: '47%', height: '56%' },
    caption: { top: '77%', left: '26%', right: '26%' },
  },
]

/** 兴趣爱好 · 牛皮纸拍立得墙（真实边框 + 慵懒错落 + 咖啡渍 + 涂鸦） */
export default function HobbiesWall({ lang }: Props) {
  return (
    <div className="kraft-bg relative h-[560px] overflow-hidden sm:h-[600px]">
      {/* 墙面标题（手写） */}
      <p className="handwrite absolute left-6 top-5 rotate-[-2deg] text-xl font-bold text-[#5b4a2a]/85">
        {lang === 'zh' ? '闲暇时光 · 随手贴' : 'off-duty moments'}
      </p>
      <svg viewBox="0 0 120 10" className="absolute left-6 top-12 h-3 w-28 opacity-60">
        <path d="M2 6 Q 12 1, 22 6 T 42 6 T 62 6 T 82 6 T 102 6 T 118 6" fill="none" stroke="#5b4a2a" strokeWidth="2" strokeLinecap="round" />
      </svg>

      {/* 咖啡渍 */}
      <div className="absolute bottom-10 left-8 h-28 w-28 rounded-full border-[5px] border-[#8a6a3a]/25 blur-[1px]" />
      <div className="absolute bottom-16 left-24 h-6 w-6 rounded-full bg-[#8a6a3a]/15 blur-[2px]" />

      {hobbies.map((h, i) => {
        const f = FRAMES[i % FRAMES.length]
        return (
          <div
            key={h.id}
            className="group absolute w-[27%] min-w-[132px] max-w-[185px] transition-all duration-300 hover:z-20 hover:rotate-0 hover:scale-105"
            style={{ left: `${h.x}%`, top: `${h.y}%`, transform: `rotate(${h.rot}deg)` }}
          >
            {/* 照片（垫在边框下面，之后换成 <img src={h.photo} />） */}
            <div
              className="halftone absolute flex items-center justify-center overflow-hidden"
              style={{
                ...f.photo,
                backgroundColor: `hsl(${h.hue} 32% 68%)`,
              }}
            >
              <span className="rounded-sm bg-[#fdfcf6]/85 px-1.5 font-mono text-[9px] tracking-[0.3em] text-[#6b5c44]">
                PHOTO
              </span>
            </div>

            {/* 拍立得边框 */}
            <img
              src={f.src}
              alt=""
              draggable={false}
              className="pointer-events-none relative w-full select-none drop-shadow-[0_8px_14px_rgba(80,60,30,0.4)]"
            />

            {/* 手写区 */}
            <div className="absolute text-center" style={{ ...f.caption }}>
              <p className="handwrite text-[13px] font-bold leading-tight text-[#4a3c28]">
                {h.title[lang]}
              </p>
              <p className="handwrite text-[10px] text-[#4a3c28]/65">{h.caption[lang]}</p>
            </div>
          </div>
        )
      })}

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
