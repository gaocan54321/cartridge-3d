import { useState } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink, Github, Play } from 'lucide-react'
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
      } ${active ? 'h-32 w-44' : 'h-24 w-32'}`}
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
        className="absolute inset-x-2.5 bottom-5 top-2.5 flex flex-col justify-between rounded-[2px] bg-[#f7f2e4] px-2 py-1.5 shadow-[inset_0_0_0_1px_rgba(120,100,70,0.25)]"
      >
        <span className="font-mono text-[8px] tracking-[0.2em] text-[#a08e6c]">{p.period}</span>
        <span className={`${active ? 'text-sm' : 'text-[11px]'} print-serif font-bold leading-tight text-[#3d3428]`}>
          {p.title.zh}
        </span>
        <span className="h-0.5 w-6 rounded-full bg-[#b0382a]" />
      </span>
    </button>
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
              className={`rounded-[3px] bg-[#8e9bac]/60 shadow-[inset_0_2px_5px_rgba(50,60,80,0.45)] ${slot === 2 ? 'w-44' : 'w-32'}`}
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

        <p className="mt-3 text-[13px] leading-[1.9] text-[#5d5344]">{p.desc[lang]}</p>

        {/* 规格表：虚线行 */}
        <div className="mt-4 space-y-1.5">
          {p.tags.map((t, i) => (
            <div key={t} className="flex items-baseline gap-2 font-mono text-[11px] text-[#6b5c44]">
              <span className="text-[#b0382a]">{String(i + 1).padStart(2, '0')}</span>
              <span>{t}</span>
              <span className="flex-1 border-b border-dotted border-[#c8b992]" />
            </div>
          ))}
        </div>

        {/* 截图：半调网点印刷 */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="halftone flex h-20 items-center justify-center rounded-[2px] border border-[#c8b992]/70 sm:h-24"
              style={{ backgroundColor: `hsl(${(30 + index * 70 + i * 25) % 360} 30% 72%)` }}>
              <span className="rounded-sm bg-[#faf6ea]/80 px-1.5 font-mono text-[9px] tracking-[0.25em] text-[#6b5c44]">
                FIG.{i + 1}
              </span>
            </div>
          ))}
        </div>

        {/* 快捷访问：印章按钮 */}
        <div className="mt-5 flex flex-wrap gap-2.5">
          {p.demoUrl && (
            <a href={p.demoUrl} target="_blank" rel="noreferrer"
              className="flex -rotate-1 items-center gap-1.5 rounded-[3px] bg-[#33302a] px-3.5 py-1.5 font-mono text-[11px] font-semibold text-[#f4efe3] shadow-[0_2px_0_rgba(0,0,0,0.4)] transition hover:-translate-y-0.5">
              <ExternalLink size={12} /> {ui.demo[lang]}
            </a>
          )}
          {p.repoUrl && (
            <a href={p.repoUrl} target="_blank" rel="noreferrer"
              className="flex rotate-[0.8deg] items-center gap-1.5 rounded-[3px] border border-[#8a7a5e]/60 bg-[#efe8d6] px-3.5 py-1.5 font-mono text-[11px] font-semibold text-[#5d4f3a] shadow-[0_2px_0_#8a7a5e55] transition hover:-translate-y-0.5">
              <Github size={12} /> {ui.repo[lang]}
            </a>
          )}
          {p.videoUrl && (
            <a href={p.videoUrl} target="_blank" rel="noreferrer"
              className="seal flex -rotate-[0.8deg] items-center gap-1.5 rounded-[3px] px-3.5 py-1.5 font-mono text-[11px] font-semibold transition hover:-translate-y-0.5">
              <Play size={12} /> {ui.video[lang]}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
