import { ArrowUpRight } from 'lucide-react'
import { socials, type Lang } from '../../data/content'

interface Props {
  lang: Lang
}

/** 社媒 / 博客 / GitHub 链接 */
export default function SocialCard({ lang }: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {socials.map((s) => (
        <a
          key={s.id}
          href={s.url}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          {/* 品牌色块：首字母/首字 */}
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-lg font-bold text-white shadow"
            style={{ backgroundColor: s.color }}
          >
            {s.name.zh[0]}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-bold text-slate-800">{s.name[lang]}</span>
            <span className="block truncate font-mono text-xs text-slate-400">{s.handle}</span>
          </span>
          <ArrowUpRight
            size={18}
            className="shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-slate-600"
          />
        </a>
      ))}
    </div>
  )
}
