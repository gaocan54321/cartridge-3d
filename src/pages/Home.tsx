import { useState } from 'react'
import { Download } from 'lucide-react'
import CartridgeGallery from '../components/CartridgeGallery'
import Character from '../components/Character'
import SectionModal from '../components/modals/SectionModal'
import AboutCard from '../components/modals/AboutCard'
import ContactCard from '../components/modals/ContactCard'
import SocialCard from '../components/modals/SocialCard'
import ProjectsPack from '../components/modals/ProjectsPack'
import CampusWall from '../components/modals/CampusWall'
import HobbiesWall from '../components/modals/HobbiesWall'
import { ui, type Lang, type SectionId } from '../data/content'

const SECTION_META: Record<SectionId, { no: string; zh: string; en: string; accent: string }> = {
  about: { no: '01', zh: '简介', en: 'ABOUT ME', accent: '#31405e' },
  contact: { no: '02', zh: '联系方式', en: 'CONTACT', accent: '#07c160' },
  social: { no: '03', zh: '社媒', en: 'SOCIAL LINKS', accent: '#2f6fd6' },
  projects: { no: '04', zh: '项目', en: 'PROJECTS', accent: '#c0392b' },
  campus: { no: '05', zh: '校园经历', en: 'CAMPUS LIFE', accent: '#31405e' },
  hobbies: { no: '06', zh: '兴趣爱好', en: 'HOBBIES', accent: '#d9c9a1' },
}

export default function Home() {
  const lang: Lang = 'zh'
  const [section, setSection] = useState<SectionId | null>(null)

  const meta = section ? SECTION_META[section] : null

  return (
    <div className="relative">
      <CartridgeGallery lang={lang} onInsert={setSection} />

      {/* 顶部工具栏 */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-40 flex flex-col items-center pt-6 select-none">
        <div className="pointer-events-auto absolute right-4 top-4 flex items-center gap-2 sm:right-6 sm:top-5">
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-1.5 rounded-full bg-[#31405e] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow"
          >
            <Download size={14} />
            {ui.downloadCv[lang]}
          </a>
        </div>

        <p className="text-[11px] font-semibold tracking-[0.35em] text-slate-400 uppercase">
          Insert cartridge to continue
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-700">
          {ui.tagline1[lang]}
        </h1>
        <p className="mt-1 text-sm text-slate-500">{ui.tagline2[lang]}</p>
      </header>

      {/* 交互人物：头跟着鼠标转 */}
      <div className="pointer-events-none absolute inset-x-0 top-[14%] z-30 flex justify-center sm:top-[13%]">
        <div className="w-[clamp(140px,21vh,205px)]">
          <Character />
        </div>
      </div>

      {/* 内容面板 */}
      {section && meta && (
        <SectionModal
          lang={lang}
          no={meta.no}
          titleZh={meta.zh}
          titleEn={meta.en}
          accent={meta.accent}
          onClose={() => setSection(null)}
          rawBody={section === 'hobbies'}
        >
          {section === 'about' && <AboutCard lang={lang} />}
          {section === 'contact' && <ContactCard lang={lang} />}
          {section === 'social' && <SocialCard lang={lang} />}
          {section === 'projects' && <ProjectsPack lang={lang} />}
          {section === 'campus' && <CampusWall lang={lang} />}
          {section === 'hobbies' && <HobbiesWall lang={lang} />}
        </SectionModal>
      )}
    </div>
  )
}
