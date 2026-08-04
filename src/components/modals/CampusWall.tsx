import { campus, type Lang } from '../../data/content'

interface Props {
  lang: Lang
}

/** 校园经历 · 线装年鉴：棉线装订的时间轴 + 相角贴照片 + 年份印章 */
export default function CampusWall({ lang }: Props) {
  return (
    <div className="relative py-2">
      {/* 棉线主轴（装订线，带线结） */}
      <div className="absolute bottom-4 left-5 top-4 w-px bg-[#a08e6c] sm:left-1/2" />
      <div className="absolute bottom-4 left-5 top-4 hidden w-px sm:left-1/2 sm:block" style={{ background: 'repeating-linear-gradient(to bottom, #a08e6c 0 6px, transparent 6px 10px)' }} />

      <div className="space-y-9">
        {campus.map((item, i) => {
          const left = i % 2 === 0
          return (
            <div key={item.id} className="relative flex items-center sm:gap-0">
              {/* 线结：棉线上的结 */}
              <div className="absolute left-5 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 sm:left-1/2">
                <span className="block h-3.5 w-3.5 rounded-full border-2 border-[#a08e6c] bg-[#f4efe3] shadow-sm" />
              </div>

              <div className={`ml-11 sm:ml-0 sm:w-[calc(50%-2.5rem)] ${left ? 'sm:mr-auto' : 'sm:ml-auto'}`}>
                {/* 照片：相角贴固定，不用完整相框 */}
                <div className={`relative inline-block max-w-full ${left ? 'sm:-rotate-1' : 'sm:rotate-[1.2deg]'}`}>
                  <div className="relative bg-white p-2 pb-1 shadow-[0_8px_20px_rgba(60,45,20,0.3)]">
                    {/* 半调网点照片占位 */}
                    <div
                      className="halftone relative flex h-36 w-full min-w-56 items-center justify-center sm:h-44"
                      style={{ backgroundColor: `hsl(${item.hue} 32% 70%)` }}
                    >
                      <span className="rounded-sm bg-[#faf6ea]/85 px-2 font-mono text-[9px] tracking-[0.3em] text-[#6b5c44]">
                        PHOTO
                      </span>
                    </div>
                    <p className="handwrite mt-1.5 px-0.5 text-center text-[13px] text-[#4d4436]">
                      {item.title[lang]}
                    </p>
                  </div>

                  {/* 四个相角贴 */}
                  <span className="photo-corner left-0 top-0 border-[12px] border-transparent border-l-[#b0382a]/80 border-t-[#b0382a]/80" />
                  <span className="photo-corner right-0 top-0 border-[12px] border-transparent border-r-[#b0382a]/80 border-t-[#b0382a]/80" />
                  <span className="photo-corner bottom-0 left-0 border-[12px] border-transparent border-b-[#b0382a]/80 border-l-[#b0382a]/80" />
                  <span className="photo-corner bottom-0 right-0 border-[12px] border-transparent border-b-[#b0382a]/80 border-r-[#b0382a]/80" />

                  {/* 年份印章 */}
                  <span className="seal absolute -right-4 -top-3 flex h-11 rotate-[8deg] items-center justify-center rounded-[3px] px-1.5 font-mono text-xs font-bold tracking-wider">
                    {item.year}
                  </span>
                </div>

                <p className={`handwrite mt-3 text-sm text-[#6b5c44] ${left ? '' : 'sm:text-right'}`}>
                  {item.caption[lang]}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <p className="handwrite mt-6 text-center text-sm text-[#8a7a5e]">
        {lang === 'zh' ? '—— 未完待续' : '— to be continued'}
      </p>
    </div>
  )
}
