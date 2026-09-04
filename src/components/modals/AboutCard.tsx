import { MapPin } from 'lucide-react'
import { profile, type Lang } from '../../data/content'

interface Props {
  lang: Lang
}

/** 个人简介 · 凸版印刷名片：米色厚纸、压印边框、红印章 */
export default function AboutCard({ lang }: Props) {
  return (
    <div className="mx-auto max-w-2xl py-2">
      {/* 名片本体：横屏黄金比例，宽度大于高度 */}
      <div className="relative rounded-[3px] bg-[#faf6ea] p-7 shadow-[0_10px_30px_rgba(60,45,20,0.3),inset_0_0_0_1px_rgba(140,120,85,0.35)] sm:p-9">
        {/* 压印内框（letterpress 凹线） */}
        <div className="pointer-events-none absolute inset-2.5 rounded-[2px] border border-[#c8b992]/70 shadow-[inset_0_1px_2px_rgba(120,100,60,0.25)]" />

        {/* 红印章：端正放在右上角 */}
        <span className="seal absolute -right-3 -top-3 flex h-14 w-14 items-center justify-center rounded-[4px] text-xl font-bold">
          {profile.name.zh[0]}
        </span>

        <div className="flex flex-col sm:flex-row sm:items-start sm:gap-6">
          <div className="flex-1">
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

            {/* 亮点：专业排名/奖学金等 */}
            {profile.achievement && (
              <p className="mt-3 text-[13px] leading-[1.9] text-[#5d5344]">
                <span className="mr-1 text-[#b0382a]">●</span>
                {profile.achievement[lang]}
              </p>
            )}

            {/* 技能标签：圆角按钮，统一底色 */}
            <div className="mt-5 flex flex-wrap gap-2">
              {profile.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-[3px] border border-[#5d4f3a]/70 bg-[#3d3428] px-2.5 py-1 font-mono text-[10.5px] font-semibold tracking-[0.06em] text-[#f4efe3] shadow-[0_1.5px_0_rgba(0,0,0,0.35)]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 flex shrink-0 items-end justify-between border-t border-dashed border-[#c8b992] pt-3 sm:mt-0 sm:flex-col sm:border-t-0 sm:border-l sm:pl-6">
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
      </div>

      {/* 名片下方的手写批注 */}
      <p className="handwrite mt-4 text-center text-sm text-[#8a7a5e]">
        {lang === 'zh' ? '—— 初次见面，请多关照' : '— nice to meet you'}
      </p>
    </div>
  )
}
