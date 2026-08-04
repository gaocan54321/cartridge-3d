import { useState } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink, Github, Play } from 'lucide-react'
import { projects, ui, type Lang, type Project } from '../../data/content'

interface Props {
  lang: Lang
}

/** 迷你 2D 卡带（项目包里的单个项目） */
function MiniCart({ p, active, onClick }: { p: Project; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`relative shrink-0 rounded-lg text-left shadow-md transition-all duration-300 ${
        active ? 'z-10 h-32 w-44 scale-100 opacity-100' : 'h-24 w-32 scale-90 opacity-50 hover:opacity-80'
      }`}
      style={{ backgroundColor: p.shellColor }}
    >
      {/* 顶部握把 */}
      <span
        className="absolute -top-1 left-1/2 h-2 w-3/5 -translate-x-1/2 rounded-t-md"
        style={{ backgroundColor: p.shellColor, filter: 'brightness(0.94)' }}
      />
      {/* 底部卡脚 */}
      <span
        className="absolute inset-x-2 bottom-0 h-3 rounded-t-sm"
        style={{ backgroundColor: p.accentColor }}
      />
      {/* 标签 */}
      <span
        className={`absolute inset-x-2.5 top-2.5 bottom-5 flex flex-col justify-between rounded-sm px-2 py-1.5 ${
          p.id === 'p1' ? 'bg-[#26324e]' : 'bg-[#f7f5ef]'
        }`}
      >
        <span className={`font-mono text-[8px] tracking-[0.2em] ${p.id === 'p1' ? 'text-white/50' : 'text-slate-400'}`}>
          {p.period}
        </span>
        <span className={`${active ? 'text-base' : 'text-xs'} font-bold leading-tight ${p.id === 'p1' ? 'text-[#e9e4d4]' : 'text-slate-700'}`}>
          {p.title.zh}
        </span>
        <span className={`h-0.5 w-6 rounded-full ${p.id === 'p1' ? 'bg-[#d9c9a1]' : 'bg-[#c0392b]'}`} />
      </span>
    </button>
  )
}

/** 项目浏览 · 卡带包（左右翻页） */
export default function ProjectsPack({ lang }: Props) {
  const [index, setIndex] = useState(0)
  const p = projects[index]

  const prev = () => setIndex((i) => (i - 1 + projects.length) % projects.length)
  const next = () => setIndex((i) => (i + 1) % projects.length)

  // 以当前项目为中心，最多展示左右各 2 盘的窗口
  const window_ = [-2, -1, 0, 1, 2].map((d) => (index + d + projects.length) % projects.length)

  return (
    <div>
      {/* 卡带包托盘 */}
      <div className="relative rounded-xl border border-slate-200 bg-gradient-to-b from-slate-100 to-slate-200/70 px-10 py-6 shadow-inner sm:px-14">
        <div className="flex items-end justify-center gap-3 overflow-visible">
          {window_.map((pi, slot) => (
            <MiniCart
              key={projects[pi].id}
              p={projects[pi]}
              active={slot === 2}
              onClick={() => setIndex(pi)}
            />
          ))}
        </div>

        {/* 左右翻页 */}
        <button
          onClick={prev}
          aria-label="previous"
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-slate-300 bg-white p-2 shadow transition hover:-translate-x-0.5 hover:shadow-md"
        >
          <ChevronLeft size={18} className="text-slate-600" />
        </button>
        <button
          onClick={next}
          aria-label="next"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-slate-300 bg-white p-2 shadow transition hover:translate-x-0.5 hover:shadow-md"
        >
          <ChevronRight size={18} className="text-slate-600" />
        </button>

        {/* 指示点 */}
        <div className="mt-4 flex justify-center gap-1.5">
          {projects.map((proj, i) => (
            <button
              key={proj.id}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${i === index ? 'w-5 bg-slate-700' : 'w-1.5 bg-slate-300 hover:bg-slate-400'}`}
            />
          ))}
        </div>
      </div>

      {/* 当前项目详情 */}
      <div key={p.id} className="fade-in mt-5">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-xl font-bold text-slate-800">{p.title[lang]}</h3>
          <span className="font-mono text-xs text-slate-400">{p.period}</span>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.desc[lang]}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span key={t} className="rounded-md border border-slate-200 bg-white px-2.5 py-1 font-mono text-xs text-slate-600">
              {t}
            </span>
          ))}
        </div>

        {/* 截图占位（之后替换为真实图片） */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex h-20 items-center justify-center rounded-lg sm:h-24"
              style={{
                background: `linear-gradient(135deg, ${p.shellColor}cc, ${p.accentColor})`,
              }}
            >
              <span className="font-mono text-[10px] tracking-[0.25em] text-white/70">SHOT {i + 1}</span>
            </div>
          ))}
        </div>

        {/* 快捷访问 */}
        <div className="mt-4 flex flex-wrap gap-2">
          {p.demoUrl && (
            <a href={p.demoUrl} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 rounded-lg bg-[#31405e] px-4 py-2 text-xs font-semibold text-white shadow transition hover:-translate-y-0.5 hover:shadow-md">
              <ExternalLink size={14} /> {ui.demo[lang]}
            </a>
          )}
          {p.repoUrl && (
            <a href={p.repoUrl} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow">
              <Github size={14} /> {ui.repo[lang]}
            </a>
          )}
          {p.videoUrl && (
            <a href={p.videoUrl} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-[#c0392b]/40 bg-[#c0392b]/5 px-4 py-2 text-xs font-semibold text-[#c0392b] transition hover:-translate-y-0.5 hover:bg-[#c0392b]/10">
              <Play size={14} /> {ui.video[lang]}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
