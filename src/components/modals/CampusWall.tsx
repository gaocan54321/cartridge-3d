import { campus, type Lang } from '../../data/content'

interface Props {
  lang: Lang
}

/** 校园经历 · 时间线照片墙 */
export default function CampusWall({ lang }: Props) {
  return (
    <div className="relative py-2">
      {/* 时间主线 */}
      <div className="absolute bottom-4 left-5 top-4 w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent sm:left-1/2" />

      <div className="space-y-8">
        {campus.map((item, i) => {
          const left = i % 2 === 0
          return (
            <div key={item.id} className="relative flex items-center gap-6 sm:gap-0">
              {/* 时间节点：卡带插槽造型 */}
              <div className="absolute left-5 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 sm:left-1/2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md border-2 border-[#31405e] bg-[#f0ede4] shadow-sm">
                  <div className="h-3 w-1.5 rounded-sm bg-[#31405e]" />
                </div>
              </div>

              {/* 照片卡片：桌面端左右交替，移动端统一在右 */}
              <div
                className={`ml-12 sm:ml-0 sm:w-[calc(50%-2.5rem)] ${
                  left ? 'sm:mr-auto' : 'sm:ml-auto'
                }`}
              >
                <div
                  className={`group rounded-lg border border-slate-200 bg-white p-2.5 pb-3 shadow-md transition hover:-translate-y-1 hover:shadow-xl ${
                    left ? 'sm:-rotate-1' : 'sm:rotate-1'
                  }`}
                >
                  {/* 照片占位：之后换成 <img src={item.photo} /> */}
                  <div
                    className="relative flex h-36 items-center justify-center overflow-hidden rounded-md sm:h-44"
                    style={{
                      background: `linear-gradient(135deg, hsl(${item.hue} 42% 74%), hsl(${(item.hue + 40) % 360} 38% 52%))`,
                    }}
                  >
                    <span className="absolute right-2 top-1.5 font-mono text-[10px] tracking-[0.3em] text-white/70">
                      {item.year}
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.35em] text-white/85">PHOTO</span>
                  </div>

                  <div className="mt-2.5 px-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-bold text-slate-800">{item.title[lang]}</h3>
                      <span className="font-mono text-xs text-slate-400">{item.year}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-slate-500">{item.caption[lang]}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
