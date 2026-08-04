import { MapPin } from 'lucide-react'
import { profile, type Lang } from '../../data/content'

interface Props {
  lang: Lang
}

/** 个人简介 · 名片弹窗 */
export default function AboutCard({ lang }: Props) {
  return (
    <div className="mx-auto max-w-md">
      {/* 浅色名片 —— 对应白色卡带外壳 */}
      <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-[#31405e]" />

        <div className="flex items-center gap-4">
          {/* 头像占位：姓名首字印章 */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#31405e] text-2xl font-bold text-white shadow-md">
            {profile.name[lang][0]}
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-2xl font-bold tracking-tight text-slate-800">
              {profile.name[lang]}
            </h3>
            <p className="text-sm font-medium text-[#c0392b]">{profile.role[lang]}</p>
          </div>
        </div>

        <div className="my-5 border-t border-dashed border-slate-300" />

        <p className="text-sm leading-relaxed text-slate-600">{profile.bio[lang]}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {profile.skills.map((s) => (
            <span
              key={s}
              className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs text-slate-600"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <MapPin size={13} />
            {profile.location[lang]}
          </span>
          {/* 迷你磁带卷盘 */}
          <svg viewBox="0 0 120 120" className="h-12 w-12 opacity-30">
            <circle cx="60" cy="60" r="52" fill="none" stroke="#31405e" strokeWidth="8" />
            <circle cx="60" cy="60" r="20" fill="none" stroke="#31405e" strokeWidth="4" />
            {[0, 120, 240].map((a) => (
              <path
                key={a}
                d="M60 60 L60 14 A46 46 0 0 1 100 83 Z"
                fill="#c0392b"
                transform={`rotate(${a} 60 60)`}
              />
            ))}
            <circle cx="60" cy="60" r="6" fill="#31405e" />
          </svg>
        </div>
      </div>
    </div>
  )
}
