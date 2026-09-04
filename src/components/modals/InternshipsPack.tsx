import { useState } from 'react'
import { ChevronLeft, ChevronRight, Globe } from 'lucide-react'
import { internships, type Lang } from '../../data/content'

interface Props {
  lang: Lang
}

/** 迷你实习卡带 */
function MiniInternshipCart({ intern, active, onClick, lang }: { intern: any; active: boolean; onClick: () => void; lang: Lang }) {
  return (
    <button
      onClick={onClick}
      className={`relative shrink-0 rounded-[4px] text-left transition-all duration-300 ${
        active
          ? 'z-10 -translate-y-3 rotate-0 shadow-[0_14px_28px_rgba(40,30,15,0.35)]'
          : 'translate-y-0 rotate-[1.5deg] opacity-60 shadow-[0_4px_10px_rgba(40,30,15,0.25)] hover:opacity-90 hover:-translate-y-1'
      } ${active ? 'h-32 w-56' : 'h-24 w-48'}`}
      style={{ backgroundColor: intern.shellColor }}
    >
      {/* 顶部握把 */}
      <span
        className="absolute -top-1 left-1/2 h-2 w-3/5 -translate-x-1/2 rounded-t-[3px]"
        style={{ backgroundColor: intern.shellColor, filter: 'brightness(0.92)' }}
      />
      {/* 底部卡脚 */}
      <span className="absolute inset-x-2 bottom-0 h-3 rounded-t-[2px]" style={{ backgroundColor: intern.accentColor }} />
      {/* 标签 */}
      <span
        className="absolute inset-x-2.5 bottom-5 top-2.5 flex flex-col justify-center rounded-[2px] bg-[#f7f2e4] px-2 py-1.5 shadow-[inset_0_0_0_1px_rgba(120,100,70,0.25)]"
      >
        <span className="font-mono text-[8px] tracking-[0.2em] text-[#a08e6c]">{intern.period}</span>
        <span className={`${active ? 'text-[13px]' : 'text-[10px]'} print-serif font-bold leading-tight text-[#3d3428] whitespace-nowrap text-center`}>
          {intern.company[lang]}
        </span>
        <span className="h-0.5 w-6 rounded-full bg-[#b0382a]" />
      </span>
    </button>
  )
}

/** 实习经历 · 卡带收纳盒 + 说明书 */
export default function InternshipsPack({ lang }: Props) {
  const [index, setIndex] = useState(0)
  const intern = internships[index]

  const prev = () => setIndex((i) => (i - 1 + internships.length) % internships.length)
  const next = () => setIndex((i) => (i + 1) % internships.length)
  const window_ = [-2, -1, 0, 1, 2].map((d) => (index + d + internships.length) % internships.length)

  return (
    <div>
      {/* 收纳盒：磨砂塑料托盘 + 卡槽 */}
      <div className="relative rounded-[6px] border border-[#9aa7b8]/50 bg-gradient-to-b from-[#c3ccd8] to-[#aab6c6] px-10 pb-5 pt-8 shadow-[inset_0_2px_8px_rgba(255,255,255,0.6),inset_0_-4px_10px_rgba(60,70,90,0.3)] sm:px-14">
        {/* 卡槽凹槽 */}
        <div className="absolute inset-x-8 bottom-4 top-6 flex justify-center gap-3" aria-hidden>
          {window_.map((_, slot) => (
            <span
              key={slot}
              className={`rounded-[3px] bg-[#8e9bac]/60 shadow-[inset_0_2px_5px_rgba(50,60,80,0.45)] ${slot === 2 ? 'w-56' : 'w-48'}`}
            />
          ))}
        </div>

        <div className="relative flex items-end justify-center gap-3">
          {window_.map((pi, slot) => (
            <MiniInternshipCart key={internships[pi].id} intern={internships[pi]} active={slot === 2} onClick={() => setIndex(pi)} lang={lang} />
          ))}
        </div>

        {/* 左右翻页：收纳盒两侧的拨片 */}
        {internships.length > 1 && (
          <>
            <button onClick={prev} aria-label="previous"
              className="absolute left-1.5 top-1/2 -translate-y-1/2 rounded-[3px] border border-[#8a97a8]/60 bg-[#dde3ea] p-1.5 text-[#5b6a7d] shadow-[0_2px_0_#8a97a866] transition hover:bg-white active:translate-y-[2px] active:shadow-none">
              <ChevronLeft size={16} />
            </button>
            <button onClick={next} aria-label="next"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-[3px] border border-[#8a97a8]/60 bg-[#dde3ea] p-1.5 text-[#5b6a7d] shadow-[0_2px_0_#8a97a866] transition hover:bg-white active:translate-y-[2px] active:shadow-none">
              <ChevronRight size={16} />
            </button>
          </>
        )}

        {/* 指示点：像盒盖上的刻痕 */}
        {internships.length > 1 && (
          <div className="relative mt-4 flex justify-center gap-2">
            {internships.map((_, i) => (
              <button key={i} onClick={() => setIndex(i)}
                className={`h-1 rounded-full transition-all ${i === index ? 'w-6 bg-[#5b6a7d]' : 'w-2 bg-[#8e9bac] hover:bg-[#6b7a8d]'}`} />
            ))}
          </div>
        )}
      </div>

      {/* 说明书：抽出来的折页 */}
      <div key={intern.id} className="fade-in relative mx-auto mt-5 max-w-xl rotate-[0.5deg] rounded-[3px] bg-[#faf6ea] p-6 shadow-[0_8px_24px_rgba(60,45,20,0.25),inset_0_0_0_1px_rgba(140,120,85,0.3)]">
        <div className="flex flex-wrap items-baseline gap-x-3">
          <h3 className="print-serif text-xl font-bold tracking-wide text-[#33302a]">{intern.company[lang]}</h3>
          <span className="font-mono text-[10px] tracking-[0.25em] text-[#a08e6c]">{intern.period}</span>
        </div>
        <p className="print-serif mt-1 text-[13.5px] font-bold tracking-wide text-[#5b4a2a]">{intern.role[lang]}</p>

        {/* 一句话 slogan */}
        {intern.slogan && (
          <p className="mt-2 border-l-[3px] border-[#b0382a] pl-3 print-serif text-[15px] font-bold tracking-wide text-[#b0382a]">
            {intern.slogan[lang]}
          </p>
        )}

        {/* 实习介绍 */}
        <p className="print-serif mt-3 text-[13.5px] leading-[2] text-[#3d3428]">{intern.desc[lang]}</p>

        {/* 核心收获：黑金奖牌框 */}
        {intern.highlights && intern.highlights.length > 0 && (
          <div className="mt-4 rounded-[3px] border border-[#c9a24a]/45 bg-[#17181c] px-4 py-3.5 shadow-[inset_0_0_0_1px_rgba(201,162,74,0.18),0_4px_14px_rgba(20,15,5,0.35)]">
            <p className="text-center font-mono text-[9px] tracking-[0.4em] text-[#c9a24a]/90">
              {lang === 'zh' ? '核心收获 · HIGHLIGHTS' : 'HIGHLIGHTS'}
            </p>
            <div className={`mt-2.5 grid gap-2.5 justify-items-center ${
              intern.highlights.length === 1 ? 'grid-cols-1' :
              intern.highlights.length === 2 ? 'grid-cols-2 sm:grid-cols-2 max-w-md mx-auto' :
              'sm:grid-cols-3'
            }`}>
              {intern.highlights.map((h: any, hi: number) => (
                <div key={hi} className="flex flex-col items-center gap-1 rounded-[2px] border border-[#c9a24a]/25 bg-[#1d1f24] px-2 py-2.5">
                  <span className="print-serif text-[13px] font-bold text-[#e8c76a]">{h[lang]}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 技术标签：复古印刷小标 */}
        {intern.tags && intern.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {intern.tags.map((t: string) => (
              <span key={t} className="rounded-[3px] border border-[#5d4f3a]/70 bg-[#3d3428] px-2.5 py-1 font-mono text-[10.5px] font-semibold tracking-[0.06em] text-[#f4efe3] shadow-[0_1.5px_0_rgba(0,0,0,0.35)]">
                {t}
              </span>
            ))}
          </div>
        )}

        {/* 实拍/宣传图：贴上去的照片 */}
        {intern.images && intern.images.length > 0 ? (
          <div className="mt-4">
            <figure className="relative rotate-[0.4deg] rounded-[2px] bg-white p-1.5 shadow-[0_5px_16px_rgba(60,45,20,0.3)]">
              <img src={intern.images[0].src} alt={intern.images[0].alt[lang]} className="w-full rounded-[1px]" />
            </figure>
            {intern.images.slice(1).map((img: any, i: number) => (
              <figure
                key={img.src}
                className={`relative -mt-6 w-[64%] rounded-[2px] bg-white p-1.5 shadow-[0_6px_18px_rgba(60,45,20,0.35)] transition hover:rotate-0 ${
                  i % 2 === 0 ? 'ml-auto mr-3 rotate-[1.8deg]' : 'ml-3 -rotate-[1.8deg]'
                }`}
              >
                <img src={img.src} alt={img.alt[lang]} className="w-full rounded-[1px]" />
                <figcaption className="mt-1 text-center font-mono text-[8px] tracking-[0.18em] text-[#8a7a5e]">
                  {img.alt[lang]}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="halftone flex h-20 items-center justify-center rounded-[2px] border border-[#c8b992]/70 sm:h-24"
                style={{ backgroundColor: `hsl(${(30 + i * 25) % 360} 30% 72%)` }}>
                <span className="rounded-sm bg-[#faf6ea]/80 px-1.5 font-mono text-[9px] tracking-[0.25em] text-[#6b5c44]">
                  FIG.{i + 1}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* 快捷访问 */}
        {intern.link && (
          <div className="mt-5 flex flex-wrap gap-2.5">
            <a href={intern.link} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 rounded-[3px] bg-[#3370FF] px-3.5 py-1.5 font-mono text-[11px] font-semibold text-white shadow-[0_2px_0_rgba(51,112,255,0.45)] transition hover:-translate-y-0.5">
              <Globe size={12} /> {lang === 'zh' ? '公司官网' : 'Company Site'}
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
