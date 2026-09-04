import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { contact, ui, type Lang } from '../../data/content'

interface Props {
  lang: Lang
}

/** 联系方式 · 三张叠放的票根卡（微信 / QQ / 邮箱），像从卡包里抽出来的一叠 */
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

  const cards = [
    {
      id: 'wechat', name: { zh: '微信', en: 'WeChat' }, value: contact.wechat,
      color: '#1aad19', rot: '-rotate-2', z: 'z-10', glyph: '微', qr: '/qr/wechat.jpg',
    },
    {
      id: 'qq', name: { zh: 'QQ', en: 'QQ' }, value: contact.qq,
      color: '#12b7f5', rot: 'rotate-1', z: 'z-20', glyph: 'Q', qr: '/qr/qq.jpg',
    },
    {
      id: 'email', name: { zh: '邮箱', en: 'E-Mail' }, value: contact.email,
      color: '#b0382a', rot: '-rotate-1', z: 'z-30', glyph: '@', qr: undefined,
    },
  ]

  return (
    <div className="mx-auto max-w-md py-2">
      <div className="space-y-[-14px]">
        {cards.map((c) => (
          <div
            key={c.id}
            className={`relative ${c.z} ${c.rot} overflow-hidden rounded-[4px] bg-[#fdfbf4] shadow-[0_8px_24px_rgba(60,45,20,0.28),inset_0_0_0_1px_rgba(140,120,85,0.3)] transition-transform duration-300 hover:z-40 hover:rotate-0 hover:scale-[1.02]`}
          >
            {/* 票根齿孔（左侧打孔线） */}
            <div className="absolute inset-y-0 left-12 w-px border-l-2 border-dashed border-[#c8b992]/80" />
            <span className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[#f4efe3] shadow-[inset_0_0_0_1px_rgba(140,120,85,0.4)]" />

            <div className="flex items-stretch">
              {/* 存根：大字 glyph */}
              <div
                className="flex w-12 shrink-0 items-center justify-center text-lg font-bold text-white"
                style={{ background: c.color }}
              >
                <span className="-rotate-90">{c.glyph}</span>
              </div>

              <div className="min-w-0 flex-1 px-5 py-4 pl-6">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="print-serif text-lg font-bold text-[#33302a]">{c.name.zh}</p>
                  <p className="font-mono text-[9px] tracking-[0.3em] text-[#a08e6c] uppercase">{c.name.en}</p>
                </div>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <p className="truncate font-mono text-sm font-semibold tracking-wide text-[#4d4436]">
                    {c.value}
                  </p>
                  <button
                    onClick={() => copy(c.id, c.value)}
                    className="flex shrink-0 items-center gap-1 rounded-[3px] border px-2 py-1 font-mono text-[10px] transition hover:-translate-y-px"
                    style={{ borderColor: `${c.color}88`, color: c.color, background: `${c.color}0d` }}
                  >
                    {copiedId === c.id ? <Check size={11} /> : <Copy size={11} />}
                    {copiedId === c.id ? ui.copied[lang] : ui.copy[lang]}
                  </button>
                </div>

                {/* 二维码（微信 / QQ） */}
                {c.qr && (
                  <div className="mt-3 flex items-center gap-3 border-t border-dashed border-[#c8b992]/70 pt-3">
                    <img
                      src={c.qr}
                      alt={`${c.name.zh}二维码`}
                      draggable={false}
                      className="h-20 w-20 rounded-[3px] border border-[#e5dcc8] object-cover shadow-sm"
                    />
                    <p className="handwrite text-[13px] leading-snug text-[#8a7a5e]">
                      {lang === 'zh' ? '扫码加我，备注来意哦' : 'scan to add me'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 底部细色带 */}
            <div className="h-1" style={{ background: c.color }} />
          </div>
        ))}
      </div>

      <p className="handwrite mt-5 rotate-[1deg] text-center text-sm text-[#8a7a5e]">
        {lang === 'zh' ? '随时找我，一般当天回 →' : '— usually replies within a day'}
      </p>
    </div>
  )
}
