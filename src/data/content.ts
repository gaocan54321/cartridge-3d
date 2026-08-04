export type Lang = 'zh' | 'en'
export type SectionId = 'about' | 'contact' | 'social' | 'projects' | 'campus' | 'hobbies'

type BI = { zh: string; en: string }

/* ---------------- 全局 UI 文案 ---------------- */
export const ui: Record<string, BI> = {
  tagline1: { zh: '高灿 · 杭州电子科技大学', en: 'Gao Can · HDU' },
  tagline2: { zh: '电子信息工程 · 机器视觉 × 嵌入式 × AI Agent', en: 'Vision × Embedded × AI Agent' },
  insertHint: { zh: '点击卡带 · 插入以继续', en: 'Click a cartridge to insert' },
  hoverHint: { zh: '把鼠标悬停在卡带上 · Hover a cartridge', en: 'Hover a cartridge' },
  downloadCv: { zh: '下载简历', en: 'Download CV' },
  eject: { zh: '⏏ 拔出卡带', en: '⏏ Eject' },
  copy: { zh: '复制', en: 'Copy' },
  copied: { zh: '已复制', en: 'Copied' },
  demo: { zh: '在线 Demo', en: 'Live Demo' },
  repo: { zh: '源代码', en: 'Source Code' },
  video: { zh: '演示视频', en: 'Video' },
  scanQr: { zh: '扫码添加', en: 'Scan to add' },
}

/* ---------------- ① 个人简介 ---------------- */
export const profile = {
  name: { zh: '高灿', en: 'Gao Can' } as BI,
  role: { zh: '电子信息工程 · 新工科实验班', en: 'Electronic Information Engineering' } as BI,
  bio: {
    zh: '杭州电子科技大学，电子信息新工科实验班（电子信息工程方向）。对机器视觉、嵌入式与 AI Agent 都感兴趣，喜欢把想法做成能跑起来的东西。',
    en: 'HDU, Electronic Information Engineering. Into machine vision, embedded systems and AI agents.',
  } as BI,
  skills: ['Python', 'C', '机器视觉', '嵌入式', 'AI Agent', 'WorkFlow', '全栈', 'Waytoagi', '观猹'],
  location: { zh: '浙江 · 杭州', en: 'Hangzhou, China' } as BI,
}

/* ---------------- ② 联系方式 ---------------- */
export const contact = {
  wechat: 'gaocan54321',
  qq: '2104471242',
  email: '2104471242@qq.com',
}

/* ---------------- ③ 社媒链接 ---------------- */
export interface SocialLink {
  id: string
  name: BI
  handle: string
  url: string
  color: string
}
export const socials: SocialLink[] = [
  { id: 'github', name: { zh: 'GitHub', en: 'GitHub' }, handle: '@gaocan54321', url: 'https://github.com/gaocan54321', color: '#17171b' },
  { id: 'xiaohongshu', name: { zh: '小红书', en: 'RED' }, handle: '@你的小红书', url: 'https://www.xiaohongshu.com', color: '#ff2442' },
  { id: 'douyin', name: { zh: '抖音', en: 'Douyin' }, handle: '@你的抖音', url: 'https://www.douyin.com', color: '#161823' },
  { id: 'bilibili', name: { zh: '哔哩哔哩', en: 'Bilibili' }, handle: 'UID: 占位', url: 'https://www.bilibili.com', color: '#00a1d6' },
  { id: 'blog', name: { zh: '个人博客', en: 'Blog' }, handle: 'blog.example.com', url: 'https://blog.example.com', color: '#31405e' },
]

/* ---------------- ④ 项目浏览 ---------------- */
export interface Project {
  id: string
  title: BI
  period: string
  desc: BI
  tags: string[]
  demoUrl?: string
  repoUrl?: string
  videoUrl?: string
  shellColor: string
  accentColor: string
}
export const projects: Project[] = [
  {
    id: 'p1',
    title: { zh: '3D 卡带作品集', en: 'Cartridge Portfolio' },
    period: '2025',
    desc: {
      zh: '就是本站：用 Three.js 程序化建模红白机卡带，作为全站主导航。',
      en: 'This very site: procedurally modeled Famicom cartridges as the main navigation.',
    },
    tags: ['React', 'Three.js', 'TypeScript'],
    demoUrl: '#', repoUrl: 'https://github.com/yourname/cartridge-3d', videoUrl: '#',
    shellColor: '#31405e', accentColor: '#263350',
  },
  {
    id: 'p2',
    title: { zh: '项目二号占位', en: 'Project Two' },
    period: '2024',
    desc: { zh: '项目简介占位：一句话说明做了什么、解决了什么问题。', en: 'Placeholder: one line about what it does and why.' },
    tags: ['Vue', 'ECharts'],
    demoUrl: '#', repoUrl: '#',
    shellColor: '#a9c3e6', accentColor: '#8fadd6',
  },
  {
    id: 'p3',
    title: { zh: '项目三号占位', en: 'Project Three' },
    period: '2024',
    desc: { zh: '项目简介占位：突出你的角色与成果数据。', en: 'Placeholder: highlight your role and measurable results.' },
    tags: ['React Native', 'Expo'],
    demoUrl: '#', videoUrl: '#',
    shellColor: '#d9c9a1', accentColor: '#c9b78d',
  },
  {
    id: 'p4',
    title: { zh: '项目四号占位', en: 'Project Four' },
    period: '2023',
    desc: { zh: '项目简介占位：可以放课程设计、竞赛或开源贡献。', en: 'Placeholder: coursework, competitions, or open source.' },
    tags: ['Python', 'FastAPI'],
    repoUrl: '#',
    shellColor: '#cfc9b8', accentColor: '#bcb5a2',
  },
]

/* ---------------- ⑤ 校园经历（时间线照片墙） ---------------- */
export interface CampusItem {
  id: string
  year: string
  title: BI
  caption: BI
  /** 照片占位符：之后换成真实图片 URL 即可 */
  photo?: string
  hue: number
}
export const campus: CampusItem[] = [
  { id: 'c1', year: '2022', title: { zh: '入学 · 新生', en: 'Freshman Year' }, caption: { zh: '照片占位：开学典礼 / 军训', en: 'Photo placeholder' }, hue: 210 },
  { id: 'c2', year: '2023', title: { zh: '加入实验室/社团', en: 'Joined a Lab' }, caption: { zh: '照片占位：第一次团建', en: 'Photo placeholder' }, hue: 160 },
  { id: 'c3', year: '2024', title: { zh: '竞赛获奖', en: 'Competition Award' }, caption: { zh: '照片占位：颁奖现场', en: 'Photo placeholder' }, hue: 40 },
  { id: 'c4', year: '2025', title: { zh: '实习经历', en: 'Internship' }, caption: { zh: '照片占位：工位一角', en: 'Photo placeholder' }, hue: 350 },
  { id: 'c5', year: '2026', title: { zh: '毕业季', en: 'Graduation' }, caption: { zh: '照片占位：毕业照', en: 'Photo placeholder' }, hue: 270 },
]

/* ---------------- ⑥ 兴趣爱好（牛皮纸拍立得墙） ---------------- */
export interface Hobby {
  id: string
  title: BI
  caption: BI
  photo?: string
  hue: number
  /** 拍立得的错落摆放参数 */
  x: number // 百分比 0-100
  y: number
  rot: number // 角度
}
export const hobbies: Hobby[] = [
  { id: 'h1', title: { zh: '摄影', en: 'Photography' }, caption: { zh: '胶片 / 扫街', en: 'Film & streets' }, hue: 30, x: 6, y: 8, rot: -5 },
  { id: 'h2', title: { zh: '骑行', en: 'Cycling' }, caption: { zh: '周末 50km', en: 'Weekend rides' }, hue: 150, x: 40, y: 4, rot: 4 },
  { id: 'h3', title: { zh: '游戏', en: 'Gaming' }, caption: { zh: '红白机收藏', en: 'Famicom collector' }, hue: 0, x: 70, y: 12, rot: -3 },
  { id: 'h4', title: { zh: '咖啡', en: 'Coffee' }, caption: { zh: '手冲练习中', en: 'Pour-over practice' }, hue: 25, x: 14, y: 48, rot: 6 },
  { id: 'h5', title: { zh: '音乐', en: 'Music' }, caption: { zh: '卧室吉他手', en: 'Bedroom guitarist' }, hue: 260, x: 48, y: 52, rot: -6 },
  { id: 'h6', title: { zh: '阅读', en: 'Reading' }, caption: { zh: '科幻与历史', en: 'Sci-fi & history' }, hue: 200, x: 76, y: 56, rot: 3 },
]
