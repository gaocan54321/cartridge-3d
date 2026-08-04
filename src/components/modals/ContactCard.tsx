import { useState } from 'react'
import { MessageCircle, Hash, Mail, Copy, Check } from 'lucide-react'
import { contact, ui, type Lang } from '../../data/content'

interface Props {
  lang: Lang
}

/** 联系方式 · 名片弹窗（微信 / QQ / 邮箱） */
export default function ContactCard({ lang }: Props) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copy = async (id: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedId(id)
      setTimeout(() => setCopiedId((c) => (c === id ? null : c)), 1500)
    } catch {
      /* clipboard 不可用时静默 */
    }
  }

  const rows = [
    { id: 'wechat', label: { zh: '微信', en: 'WeChat' }, value: contact.wechat, icon: MessageCircle, color: '#07c160' },
    { id: 'qq', label: { zh: 'QQ', en: 'QQ' }, value: contact.qq, icon: Hash, color: '#12b7f5' },
    { id: 'email', label: { zh: '邮箱', en: 'Email' }, value: contact.email, icon: Mail, color: '#c0392b' },
  ]

  return (
    <div className="mx-auto max-w-md">
      {/* 深色名片 —— 对应黑色卡带外壳 */}
      <div className="relative overflow-hidden rounded-xl bg-[#15171c] p-6 shadow-xl sm:p-8">
        {/* 磁带卷盘装饰 */}
        <svg viewBox="0 0 120 120" className="absolute -right-6 -top-6 h-32 w-32 opacity-20">
          <circle cx="60" cy="60" r="52" fill="none" stroke="#f2f2f0" strokeWidth="6" />
          <circle cx="60" cy="60" r="20" fill="none" stroke="#f2f2f0" strokeWidth="3" />
          {[0, 120, 240].map((a) => (
            <path
              key={a}
              d="M60 60 L60 14 A46 46 0 0 1 100 83 Z"
              fill="#07c160"
              transform={`rotate(${a} 60 60)`}
              opacity="0.9"
            />
          ))}
          <circle cx="60" cy="60" r="5" fill="#f2f2f0" />
        </svg>

        <p className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
          Business Card · No.02
        </p>
        <h3 className="mt-1 text-xl font-bold text-white">
          {lang === 'zh' ? '保持联系' : 'Get in Touch'}
        </h3>

        <div className="mt-6 space-y-3">
          {rows.map((row) => (
            <div
              key={row.id}
              className="group flex items-center gap-3 rounded-lg bg-white/[0.06] px-4 py-3 transition hover:bg-white/[0.1]"
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${row.color}22`, color: row.color }}
              >
                <row.icon size={18} strokeWidth={2.2} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] text-white/45">{row.label[lang]}</p>
                <p className="truncate font-mono text-sm font-medium text-white">{row.value}</p>
              </div>
              <button
                onClick={() => copy(row.id, row.value)}
                className="flex shrink-0 items-center gap-1 rounded-md border border-white/15 px-2.5 py-1 text-[11px] text-white/70 transition hover:border-white/40 hover:text-white"
              >
                {copiedId === row.id ? <Check size={12} /> : <Copy size={12} />}
                {copiedId === row.id ? ui.copied[lang] : ui.copy[lang]}
              </button>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center font-mono text-[10px] tracking-[0.25em] text-white/30 uppercase">
          SIDE A · 60 MIN
        </p>
      </div>
    </div>
  )
}
