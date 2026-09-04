import { useState } from 'react'
import { ChevronLeft, ChevronRight, FileText, Globe, Play } from 'lucide-react'
import { projects, ui, type Lang, type Project } from '../../data/content'

interface Props {
  lang: Lang
}

/** 迷你卡带：插在收纳盒卡槽里，微微后仰 */
function MiniCart({ p, active, onClick }: { p: Project; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`relative shrink-0 rounded-[4px] text-left transition-all duration-300 ${
        active
          ? 'z-10 -translate-y-3 rotate-0 shadow-[0_14px_28px_rgba(40,30,15,0.35)]'
          : 'translate-y-0 rotate-[1.5deg] opacity-60 shadow-[0_4px_10px_rgba(40,30,15,0.25)] hover:opacity-90 hover:-translate-y-1'
      } ${active ? 'h-32 w-56' : 'h-24 w-48'}`}
      style={{ backgroundColor: p.shellColor }}
    >
      {/* 顶部握把 */}
      <span
        className="absolute -top-1 left-1/2 h-2 w-3/5 -translate-x-1/2 rounded-t-[3px]"
        style={{ backgroundColor: p.shellColor, filter: 'brightness(0.92)' }}
      />
      {/* 底部卡脚 */}
      <span className="absolute inset-x-2 bottom-0 h-3 rounded-t-[2px]" style={{ backgroundColor: p.accentColor }} />
      {/* 标签 */}
      <span
        className="absolute inset-x-2.5 bottom-5 top-2.5 flex flex-col justify-center rounded-[2px] bg-[#f7f2e4] px-2 py-1.5 shadow-[inset_0_0_0_1px_rgba(120,100,70,0.25)]"
      >
        <span className="font-mono text-[8px] tracking-[0.2em] text-[#a08e6c]">{p.period}</span>
        <span className={`${active ? 'text-[13px]' : 'text-[10px]'} print-serif font-bold leading-tight text-[#3d3428] whitespace-nowrap text-center`}>
          {p.title.zh}
        </span>
        <span className="h-0.5 w-6 rounded-full bg-[#b0382a]" />
      </span>
    </button>
  )
}

/** 金色月桂枝（奖项框装饰），flip 时镜像 */
function Laurel({ flip }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 20 44" className={`h-9 w-4 shrink-0 ${flip ? '-scale-x-100' : ''}`} fill="none" aria-hidden>
      <path d="M16 3C6 12 6 32 16 41" stroke="#c9a24a" strokeWidth="1.4" strokeLinecap="round" />
      {[8, 15, 22, 29, 36].map((y, i) => (
        <ellipse
          key={y}
          cx={10 - i * 0.6}
          cy={y}
          rx="4"
          ry="1.7"
          fill="#c9a24a"
          transform={`rotate(${-32 + i * 7} ${10 - i * 0.6} ${y})`}
        />
      ))}
    </svg>
  )
}

/** 项目浏览 · 卡带收纳盒 + 说明书 */
export default function ProjectsPack({ lang }: Props) {
  const [index, setIndex] = useState(0)
  const p = projects[index]

  const prev = () => setIndex((i) => (i - 1 + projects.length) % projects.length)
  const next = () => setIndex((i) => (i + 1) % projects.length)
  const window_ = [-2, -1, 0, 1, 2].map((d) => (index + d + projects.length) % projects.length)

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
            <MiniCart key={projects[pi].id} p={projects[pi]} active={slot === 2} onClick={() => setIndex(pi)} />
          ))}
        </div>

        {/* 左右翻页：收纳盒两侧的拨片 */}
        <button onClick={prev} aria-label="previous"
          className="absolute left-1.5 top-1/2 -translate-y-1/2 rounded-[3px] border border-[#8a97a8]/60 bg-[#dde3ea] p-1.5 text-[#5b6a7d] shadow-[0_2px_0_#8a97a866] transition hover:bg-white active:translate-y-[2px] active:shadow-none">
          <ChevronLeft size={16} />
        </button>
        <button onClick={next} aria-label="next"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-[3px] border border-[#8a97a8]/60 bg-[#dde3ea] p-1.5 text-[#5b6a7d] shadow-[0_2px_0_#8a97a866] transition hover:bg-white active:translate-y-[2px] active:shadow-none">
          <ChevronRight size={16} />
        </button>

        {/* 指示点：像盒盖上的刻痕 */}
        <div className="relative mt-4 flex justify-center gap-2">
          {projects.map((proj, i) => (
            <button key={proj.id} onClick={() => setIndex(i)}
              className={`h-1 rounded-full transition-all ${i === index ? 'w-6 bg-[#5b6a7d]' : 'w-2 bg-[#8e9bac] hover:bg-[#6b7a8d]'}`} />
          ))}
        </div>
      </div>

      {/* 说明书：抽出来的折页 */}
      <div key={p.id} className="fade-in relative mx-auto mt-5 max-w-xl rotate-[0.5deg] rounded-[3px] bg-[#faf6ea] p-6 shadow-[0_8px_24px_rgba(60,45,20,0.25),inset_0_0_0_1px_rgba(140,120,85,0.3)]">
        <div className="flex flex-wrap items-baseline gap-x-3">
          <h3 className="print-serif text-xl font-bold tracking-wide text-[#33302a]">{p.title[lang]}</h3>
          <span className="font-mono text-[10px] tracking-[0.25em] text-[#a08e6c]">{p.period} · 使用说明书</span>
        </div>

        {/* 一句话 slogan */}
        {p.slogan && (
          <p className="mt-2 border-l-[3px] border-[#b0382a] pl-3 print-serif text-[15px] font-bold tracking-wide text-[#b0382a]">
            {p.slogan[lang]}
          </p>
        )}

        {/* 项目介绍导语 */}
        <p className="print-serif mt-3 text-[13.5px] leading-[2] text-[#3d3428]">{p.desc[lang]}</p>

        {/* 项目成果：黑金奖牌框 */}
        {p.awards && p.awards.length > 0 && (
          <div className="mt-4 rounded-[3px] border border-[#c9a24a]/45 bg-[#17181c] px-4 py-3.5 shadow-[inset_0_0_0_1px_rgba(201,162,74,0.18),0_4px_14px_rgba(20,15,5,0.35)]">
            <p className="text-center font-mono text-[9px] tracking-[0.4em] text-[#c9a24a]/90">
              {lang === 'zh' ? '项目成果 · AWARDS' : 'AWARDS'}
            </p>
            <div className={`mt-2.5 grid gap-2.5 justify-items-center ${
              p.awards.length === 1 ? 'grid-cols-1' :
              p.awards.length === 2 ? 'grid-cols-2 sm:grid-cols-2 max-w-md mx-auto' :
              'sm:grid-cols-3'
            }`}>
              {p.awards.map((a) => (
                <div key={a.track.zh} className="flex flex-col items-center gap-1 rounded-[2px] border border-[#c9a24a]/25 bg-[#1d1f24] px-2 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <Laurel />
                    <span className="print-serif text-[15px] font-bold text-[#e8c76a]">{a.rank[lang]}</span>
                    <Laurel flip />
                  </div>
                  <p className="text-center font-mono text-[9px] leading-relaxed tracking-[0.14em] text-[#9aa0ad]">
                    {a.track[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 结构化段落：项目介绍 / 我的工作 / 技术方案… */}
        {p.sections && p.sections.length > 0 && (
          <div className="mt-5 space-y-4">
            {p.sections.map((s, si) => (
              <section key={s.heading.zh}>
                <h4 className="flex items-baseline gap-2 border-b-2 border-[#3d3428]/70 pb-1 print-serif text-[13px] font-bold tracking-[0.12em] text-[#3d3428]">
                  <span className="font-mono text-[10px] font-normal tracking-[0.2em] text-[#b0382a]">
                    {String(si + 1).padStart(2, '0')}
                  </span>
                  {s.heading[lang]}
                  <span className="ml-auto font-mono text-[8px] font-normal tracking-[0.2em] text-[#a08e6c] uppercase">
                    {s.heading.en}
                  </span>
                </h4>
                {s.body && <p className="print-serif mt-2 text-[13.5px] leading-[2] text-[#3d3428]">{s.body[lang]}</p>}
                {s.items && (
                  <ul className="print-serif mt-2 space-y-1.5">
                    {s.items.map((it) => (
                      <li key={it.zh} className="flex gap-2 text-[13.5px] leading-[2] text-[#3d3428]">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-[#b0382a]" />
                        <span>{it[lang]}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        )}

        {/* 技术标签：复古印刷小标 */}
        <div className="mt-4 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span key={t} className="rounded-[3px] border border-[#5d4f3a]/70 bg-[#3d3428] px-2.5 py-1 font-mono text-[10.5px] font-semibold tracking-[0.06em] text-[#f4efe3] shadow-[0_1.5px_0_rgba(0,0,0,0.35)]">
              {t}
            </span>
          ))}
        </div>

        {/* 实拍/宣传图：贴上去的照片（无图时直接隐藏） */}
        {p.images && p.images.length > 0 && (
          <div className="mt-4">
            <figure className="relative rotate-[0.4deg] rounded-[2px] bg-white p-1.5 shadow-[0_5px_16px_rgba(60,45,20,0.3)]">
              <img src={p.images[0].src} alt={p.images[0].alt[lang]} className="w-full rounded-[1px]" />
            </figure>
            {p.images.slice(1).map((img, i) => (
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
        )}

        {/* 快捷访问：平台品牌色按钮（统一尺寸 / 字体 / 圆角） */}
        <div className="mt-5 flex flex-wrap gap-2.5">
          {p.videoUrl && (
            <a href={p.videoUrl} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 rounded-[3px] bg-[#FB7299] px-3.5 py-1.5 font-mono text-[11px] font-semibold text-white shadow-[0_2px_0_rgba(251,114,153,0.45)] transition hover:-translate-y-0.5">
              <Play size={12} /> {ui.video[lang]}
            </a>
          )}
          {p.articleUrl && (
            <a href={p.articleUrl} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 rounded-[3px] bg-[#3370FF] px-3.5 py-1.5 font-mono text-[11px] font-semibold text-white shadow-[0_2px_0_rgba(51,112,255,0.45)] transition hover:-translate-y-0.5">
              <FileText size={12} /> {ui.article[lang]}
            </a>
          )}
          {p.adxUrl && (
            <a href={p.adxUrl} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 rounded-[3px] bg-[#FF7A2E] px-3.5 py-1.5 font-mono text-[11px] font-semibold text-white shadow-[0_2px_0_rgba(255,122,46,0.45)] transition hover:-translate-y-0.5">
              <Globe size={12} /> {ui.adxSite[lang]}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
