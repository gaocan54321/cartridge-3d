import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { campus, type Lang } from '../../data/content'

interface Props {
  lang: Lang
}

/** 将文本中指定的量化成果片段提取出来，用红色大号字体强调，其余文本保持原样 */
function emphasizeData(text: string): React.ReactNode[] {
  // 仅高亮指定的量化成果关键词，避免误伤年份、日期等普通数字
  const targets = ['340+', '15W+', '10+']
  const regex = new RegExp(targets.map(t => t.replace(/[+]/g, '\\+')).join('|'), 'g')
  const matches = text.match(regex) || []

  if (matches.length === 0) return [text]

  const parts: React.ReactNode[] = []
  let remaining = text
  let key = 0

  matches.forEach((match) => {
    const idx = remaining.indexOf(match)
    if (idx === -1) return

    if (idx > 0) {
      parts.push(remaining.slice(0, idx))
    }
    parts.push(
      <span key={key++} className="text-[#b0382a] font-bold text-[15px]">
        {match}
      </span>
    )
    remaining = remaining.slice(idx + match.length)
  })

  if (remaining) {
    parts.push(remaining)
  }

  return parts.length > 0 ? parts : [text]
}

/** 迷你校园卡带 */
function MiniCampusCart({ item, active, onClick }: { item: any; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`relative shrink-0 rounded-[4px] text-left transition-all duration-300 ${
        active
          ? 'z-10 -translate-y-3 rotate-0 shadow-[0_14px_28px_rgba(40,30,15,0.35)]'
          : 'translate-y-0 rotate-[1.5deg] opacity-60 shadow-[0_4px_10px_rgba(40,30,15,0.25)] hover:opacity-90 hover:-translate-y-1'
      } ${active ? 'h-32 w-56' : 'h-24 w-48'}`}
      style={{ backgroundColor: item.shellColor }}
    >
      {/* 顶部握把 */}
      <span
        className="absolute -top-1 left-1/2 h-2 w-3/5 -translate-x-1/2 rounded-t-[3px]"
        style={{ backgroundColor: item.shellColor, filter: 'brightness(0.92)' }}
      />
      {/* 底部卡脚 */}
      <span className="absolute inset-x-2 bottom-0 h-3 rounded-t-[2px]" style={{ backgroundColor: item.accentColor }} />
      {/* 标签 */}
      <span
        className="absolute inset-x-2.5 bottom-5 top-2.5 flex flex-col justify-center rounded-[2px] bg-[#f7f2e4] px-2 py-1.5 shadow-[inset_0_0_0_1px_rgba(120,100,70,0.25)]"
      >
        {item.year && <span className="font-mono text-[8px] tracking-[0.2em] text-[#a08e6c]">{item.year}</span>}
        <span className={`${active ? 'text-[13px]' : 'text-[10px]'} print-serif font-bold leading-tight text-[#3d3428] whitespace-nowrap text-center`}>
          {item.title.zh}
        </span>
        <span className="h-0.5 w-6 rounded-full bg-[#b0382a]" />
      </span>
    </button>
  )
}

/** 校园经历 · 卡带收纳盒 + 说明书 */
export default function CampusWall({ lang }: Props) {
  const [index, setIndex] = useState(0)
  const item = campus[index]

  const prev = () => setIndex((i) => (i - 1 + campus.length) % campus.length)
  const next = () => setIndex((i) => (i + 1) % campus.length)
  const window_ = [-2, -1, 0, 1, 2].map((d) => (index + d + campus.length) % campus.length)

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
            <MiniCampusCart key={campus[pi].id} item={campus[pi]} active={slot === 2} onClick={() => setIndex(pi)} />
          ))}
        </div>

        {/* 左右翻页：收纳盒两侧的拨片 */}
        {campus.length > 1 && (
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
        {campus.length > 1 && (
          <div className="relative mt-4 flex justify-center gap-2">
            {campus.map((_, i) => (
              <button key={i} onClick={() => setIndex(i)}
                className={`h-1 rounded-full transition-all ${i === index ? 'w-6 bg-[#5b6a7d]' : 'w-2 bg-[#8e9bac] hover:bg-[#6b7a8d]'}`} />
            ))}
          </div>
        )}
      </div>

      {/* 说明书：抽出来的折页 */}
      <div key={item.id} className="fade-in relative mx-auto mt-5 max-w-xl rotate-[0.5deg] rounded-[3px] bg-[#faf6ea] p-6 shadow-[0_8px_24px_rgba(60,45,20,0.25),inset_0_0_0_1px_rgba(140,120,85,0.3)]">
        <div className="flex flex-wrap items-baseline gap-x-3">
          <h3 className="print-serif text-xl font-bold tracking-wide text-[#33302a]">{item.title[lang]}</h3>
          {item.year && <span className="font-mono text-[10px] tracking-[0.25em] text-[#a08e6c]">{item.year} · 校园经历</span>}
        </div>

        <p className="print-serif mt-1 text-[13.5px] font-bold tracking-wide text-[#5b4a2a]">{item.caption[lang]}</p>

        {/* 结构化 bullet 列表 */}
        {item.bullets && item.bullets.length > 0 && (
          <div className="mt-5 space-y-4">
            {item.bullets.map((b, bi) => {
              const fullText = b[lang]
              const colonIdx = fullText.indexOf('：')
              const label = colonIdx >= 0 ? fullText.slice(0, colonIdx + 1) : ''
              const body = colonIdx >= 0 ? fullText.slice(colonIdx + 1) : fullText

              return (
                <section key={bi}>
                  <h4 className="flex items-baseline gap-2 border-b-2 border-[#3d3428]/70 pb-1 print-serif text-[13px] font-bold tracking-[0.12em] text-[#3d3428]">
                    <span className="font-mono text-[10px] font-normal tracking-[0.2em] text-[#b0382a]">
                      {String(bi + 1).padStart(2, '0')}
                    </span>
                    {label}
                  </h4>
                  <p className="print-serif mt-2 text-[13.5px] leading-[2] text-[#3d3428]">
                    {emphasizeData(body)}
                  </p>
                </section>
              )
            })}
          </div>
        )}

        {/* 技术标签：复古印刷小标（ campus 用"相关技能"代替） */}
        {item.bullets && item.bullets.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.bullets.slice(0, 3).map((b, i) => (
              <span key={i} className="rounded-[3px] border border-[#5d4f3a]/70 bg-[#3d3428] px-2.5 py-1 font-mono text-[10.5px] font-semibold tracking-[0.06em] text-[#f4efe3] shadow-[0_1.5px_0_rgba(0,0,0,0.35)]">
                {b[lang].split('：')[0]}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
