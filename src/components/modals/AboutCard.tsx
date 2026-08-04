import { MapPin } from 'lucide-react'
import { profile, type Lang } from '../../data/content'

interface Props {
  lang: Lang
}

/** 个人简介 · 凸版印刷名片：米色厚纸、压印边框、红印章 */
export default function AboutCard({ lang }: Props) {
  return (
    <div className="mx-auto max-w-md py-2">
      {/* 名片本体：微微斜放 */}
      <div className="relative -rotate-1 rounded-[3px] bg-[#faf6ea] p-7 shadow-[0_10px_30px_rgba(60,45,20,0.3),inset_0_0_0_1px_rgba(140,120,85,0.35)] sm:p-9">
        {/* 压印内框（letterpress 凹线） */}
        <div className="pointer-events-none absolute inset-2.5 rounded-[2px] border border-[#c8b992]/70 shadow-[inset_0_1px_2px_rgba(120,100,60,0.25)]" />

        {/* 红印章：斜盖在右上角 */}
        <span className="seal absolute -right-3 -top-3 flex h-14 w-14 rotate-[10deg] items-center justify-center rounded-[4px] text-xl font-bold">
          {profile.name.zh[0]}
        </span>

        <p className="font-mono text-[9px] tracking-[0.4em] text-[#a08e6c] uppercase">
          Name Card · 名 片
        </p>

        <h3 className="print-serif mt-3 text-3xl font-bold tracking-[0.08em] text-[#33302a]">
          {profile.name[lang]}
        </h3>
        <p className="mt-1.5 text-[13px] font-semibold tracking-[0.15em] text-[#b0382a]">
          {profile.role[lang]}
        </p>

        {/* 手工分隔：一根墨线 + 一截断线 */}
        <div className="mt-5 flex items-center gap-2">
          <span className="h-px flex-1 bg-[#8a7a5e]/50" />
          <span className="h-1 w-1 rounded-full bg-[#8a7a5e]/60" />
          <span className="h-px w-10 bg-[#8a7a5e]/50" />
        </div>

        <p className="mt-4 text-[13px] leading-[1.9] text-[#5d5344]">{profile.bio[lang]}</p>

        {/* 技能：铅字小戳，不用 chip */}
        <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
          {profile.skills.map((s, i) => (
            <span
              key={s}
              className={`font-mono text-[11px] tracking-wider text-[#6b5c44] ${i % 2 ? 'rotate-[0.8deg]' : '-rotate-[0.6deg]'}`}
            >
              <span className="mr-1 text-[#b0382a]">◆</span>
              {s}
            </span>
          ))}
        </div>

        <div className="mt-7 flex items-end justify-between border-t border-dashed border-[#c8b992] pt-3">
          <span className="flex items-center gap-1.5 text-[11px] text-[#8a7a5e]">
            <MapPin size={12} />
            {profile.location[lang]}
          </span>
          {/* 迷你磁带卷盘 · 凹印感 */}
          <svg viewBox="0 0 120 120" className="h-11 w-11 opacity-45">
            <circle cx="60" cy="60" r="52" fill="none" stroke="#5d5344" strokeWidth="7" />
            <circle cx="60" cy="60" r="20" fill="none" stroke="#5d5344" strokeWidth="4" />
            {[0, 120, 240].map((a) => (
              <path key={a} d="M60 60 L60 14 A46 46 0 0 1 100 83 Z" fill="#b0382a" transform={`rotate(${a} 60 60)`} />
            ))}
            <circle cx="60" cy="60" r="6" fill="#5d5344" />
          </svg>
        </div>
      </div>

      {/* 名片下方的手写批注 */}
      <p className="handwrite mt-4 rotate-[-1.5deg] text-center text-sm text-[#8a7a5e]">
        {lang === 'zh' ? '—— 初次见面，请多关照' : '— nice to meet you'}
      </p>
    </div>
  )
}
