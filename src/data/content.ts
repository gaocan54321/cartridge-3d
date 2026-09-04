export type Lang = 'zh' | 'en'
export type SectionId = 'about' | 'contact' | 'social' | 'projects' | 'campus' | 'internships'

type BI = { zh: string; en: string }

/* ---------------- 全局 UI 文案 ---------------- */
export const ui: Record<string, BI> = {
  heroTitle: { zh: 'Hey！这是我的电子简历', en: 'Hey! This is my e-resume' },
  downloadCv: { zh: '下载简历', en: 'Download CV' },
  eject: { zh: '⏏ 拔出卡带', en: '⏏ Eject' },
  copy: { zh: '复制', en: 'Copy' },
  copied: { zh: '已复制', en: 'Copied' },
  demo: { zh: '在线 Demo', en: 'Live Demo' },
  repo: { zh: '源代码', en: 'Source Code' },
  video: { zh: '演示视频', en: 'Video' },
  article: { zh: '项目文章', en: 'Write-up' },
  adxSite: { zh: 'Adx 官网', en: 'Adx Gallery' },
  scanQr: { zh: '扫码添加', en: 'Scan to add' },
}

/* ---------------- ① 个人简介 ---------------- */
export const profile = {
  name: { zh: '高灿', en: 'Gao Can' } as BI,
  role: { zh: '电子信息工程 · 新工科实验班', en: 'Electronic Information Engineering' } as BI,
  bio: {
    zh: '2023.9-2027.6 杭州电子科技大学 | 电子信息新工科实验班 | 本科',
    en: '2023.9-2027.6 Hangzhou Dianzi University | Electronic Information Engineering | Bachelor',
  } as BI,
  achievement: {
    zh: '专业排名前10% ，国家励志奖学金2次，校优秀奖学金5次，校媒体之星（全校仅10人），校十佳勤工助学之星（全校仅10人）',
    en: 'Top 10% in major, National Inspiration Scholarship 2x, University Excellence Scholarship 5x, University Media Star (top 10), University Top 10 Work-Study Star (top 10)',
  } as BI,
  skills: [
    '⚡ 嵌入式/硬件工程师',
    '🌈 WaytoAGI/观猹志愿者',
    '🎮 孵化剧本杀中，后期上线~',
    '🤖 AI 应用开发',
    '🎮 AI 游戏',
    '🎬 AI 漫剧',
    '📱 AI 自媒体',
    '📰 AI 活动策划PM',
    '💻 Hackathon 爱好者（胜率4/6）',
    '📷 视频拍摄剪辑后期',
    '🎤 脱口秀/Sketch爱好者',
  ],
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
  /** 二维码图片（public 路径），可选 */
  qr?: string
}
export const socials: SocialLink[] = [
  { id: 'github', name: { zh: 'GitHub', en: 'GitHub' }, handle: '@gaocan54321', url: 'https://github.com/gaocan54321', color: '#17171b' },
  { id: 'xiaohongshu', name: { zh: '小红书', en: 'RED' }, handle: '小红书号: 5510949411', url: 'https://xhslink.cn/m/9XO0CTfOfQQ', color: '#ff2442', qr: '/qr/xhs.jpg' },
  { id: 'douyin', name: { zh: '抖音', en: 'Douyin' }, handle: '抖音号: 44067085490', url: 'https://v.douyin.com/5qopu4M0JV8/', color: '#161823', qr: '/qr/douyin.jpg' },
  { id: 'bilibili', name: { zh: '哔哩哔哩', en: 'Bilibili' }, handle: 'UID: 397787616', url: 'https://b23.tv/yxyT5fb', color: '#00a1d6', qr: '/qr/bilibili.jpg' },
]

/* ---------------- ④ 项目浏览 ---------------- */
export interface Award {
  rank: BI
  track: BI
}
export interface ProjectSection {
  heading: BI
  body?: BI
  items?: BI[]
}
export interface Project {
  id: string
  title: BI
  period: string
  /** 一句话 slogan，可选 */
  slogan?: BI
  desc: BI
  /** 获奖记录（醒目框出），可选 */
  awards?: Award[]
  /** 结构化段落：项目介绍 / 我的工作 / 技术方案 / 未来想象等 */
  sections?: ProjectSection[]
  tags: string[]
  demoUrl?: string
  repoUrl?: string
  videoUrl?: string
  articleUrl?: string
  adxUrl?: string
  /** 项目实拍/宣传图（public 路径） */
  images?: { src: string; alt: BI }[]
  shellColor: string
  accentColor: string
}
export const projects: Project[] = [
  {
    id: 'camtrace',
    title: { zh: 'CamTrace 运镜机械臂', en: 'CamTrace' },
    period: '2026',
    slogan: { zh: '让机械臂看懂镜头，一键复刻火爆运镜！', en: 'Teach a robotic arm to read camera moves — replay viral shots in one click!' },
    desc: {
      zh: '一段好运镜背后，是运镜师扛着稳定器凭肌肉记忆反复拍十几遍；团播、舞蹈直播里更是连续数小时的高强度体力活。CamTrace 想回答一个问题：如果运镜是一种「技能」，它能不能像代码一样被下载和运行？上传一段喜欢的视频，系统即从中重建出逐帧的相机三维轨迹，再由六轴机械臂在真实空间中精准复现，并支持人物追踪——视频创作者的「第三只手」。',
      en: 'Behind every great camera move is an operator replaying it a dozen times by muscle memory. CamTrace asks: if a camera move is a "skill", can it be downloaded and run like code? Upload a video you love, and the system reconstructs the per-frame 3D camera trajectory, replays it on a 6-axis robotic arm in real space, with subject tracking — a "third hand" for creators.',
    },
    awards: [
      { rank: { zh: '二等奖', en: '2nd Prize' }, track: { zh: 'Qoder 赛道 · 小团队高效开发', en: 'Qoder Track · Efficient Dev' } },
      { rank: { zh: '第四名', en: 'Top 4' }, track: { zh: '.xyz 主题', en: '.xyz Theme' } },
      { rank: { zh: 'Top 3', en: 'Top 3' }, track: { zh: 'B 站直播赛道', en: 'Bilibili Live Track' } },
    ],
    sections: [
      {
        heading: { zh: '项目介绍', en: 'Overview' },
        body: {
          zh: 'CamTrace 做的事很简单：你给我一段喜欢的运镜视频，我还你一条机械臂能执行的运动轨迹。它第一次把「从视频理解运镜」和「让物理设备执行运镜」打通成完整产品——不是滤镜、不是后期特效，而是从视频中重建相机在三维空间中的位置与朝向，让机械臂在真实空间里走出同一条轨迹。',
          en: 'CamTrace is simple: give it a camera move you love, it returns a trajectory a robotic arm can execute. It is the first end-to-end product connecting "understanding camera moves from video" with "executing them on physical hardware" — not a filter or post effect, but a true 3D reconstruction of camera position and orientation, replayed in real space.',
        },
      },
      {
        heading: { zh: '我的工作', en: 'My Role' },
        body: {
          zh: '作为队长发起并统筹该项目：提出「手机 + 机械臂复刻运镜」的核心创意，负责整体方案设计、任务拆解与进度把控、系统测试与现场演示；带领团队在 48 小时内跑通从路径解算到前后端部署的完整闭环，并以 Qoder Agent 工作流（Spec 规划 + Goal 目标驱动）组织高效开发。',
          en: 'Initiated and led the project as team captain: proposed the core idea of replaying camera moves with a phone + robotic arm; owned the solution design, task breakdown, schedule, testing and on-site demo; drove the team to ship the full loop from path solving to deployment within 48 hours, organized with a Qoder Agent workflow (Spec planning + Goal-driven execution).',
        },
      },
      {
        heading: { zh: '技术方案', en: 'Technical Approach' },
        items: [
          { zh: '视频接入：Web 端上传，ffprobe 校验编码 / 时长 / 分辨率 / 帧率，进入 GPU 处理队列', en: 'Ingest: uploaded on the web, validated by ffprobe (codec / duration / resolution / fps), queued for GPU processing' },
          { zh: 'AI 三维重建：基于 MegaSaM（DROID-SLAM 架构），融合 Depth Anything 与 UniDepth 双深度模型，区分「相机在动」与「画面内容在动」', en: '3D reconstruction: MegaSaM (DROID-SLAM) fusing Depth Anything + UniDepth to separate camera motion from scene motion' },
          { zh: '全局轨迹优化：多关键帧约束一次求解，输出逐帧三维坐标 (x, y, z) 与四元数朝向 (qx, qy, qz, qw)，避免逐帧累积误差', en: 'Global optimization: multi-keyframe constraints solved at once, yielding per-frame position + quaternion pose without drift' },
          { zh: '轨迹可视化：Three.js 实时渲染三维轨迹，可旋转 / 回放 / 逐帧检查，视锥体标出每帧相机朝向', en: 'Visualization: Three.js renders the 3D trajectory live — rotate, replay, inspect per-frame frusta' },
          { zh: '一键下发执行：标准化协议将轨迹下发机械臂控制系统，完成物理世界的运镜复刻', en: 'One-click execution: the trajectory is streamed to the arm controller to replay the move in the physical world' },
        ],
      },
      {
        heading: { zh: '项目亮点', en: 'Highlights' },
        items: [
          { zh: '创新范式：首次把「视频运镜理解」与「机器人物理执行」打通为端到端产品，运镜从经验技能变成可复制的数据资产', en: 'New paradigm: first end-to-end product from video move understanding to robotic execution — camera moves become reusable data assets' },
          { zh: '算法深度：MegaSaM 三维重建 + 双深度模型融合 + 全局优化，是真正的三维空间理解而非 2D 跟踪', en: 'Algorithm depth: true 3D spatial understanding (MegaSaM + dual-depth fusion + global optimization), not 2D tracking' },
          { zh: '工程完整度：48 小时内搭出 FastAPI + React + GPU 推理 + Three.js 可视化 + 机械臂控制的完整链路', en: 'Engineering completeness: full stack (FastAPI + React + GPU inference + Three.js + arm control) built in 48 hours' },
          { zh: '真实场景切入：B 站团播、舞蹈拍摄、产品直播的运镜是真实痛点，而非伪需求', en: 'Real-world fit: live-streaming and dance shooting are genuine pain points, not fabricated demand' },
        ],
      },
      {
        heading: { zh: '未来想象', en: 'What’s Next' },
        body: {
          zh: '运镜将成为可分享的「动作资产」——顶级摄影师的经典运镜可被提取、保存、下载，如同 MIDI 让音乐制作民主化，CamTrace 想让运镜民主化。更进一步，结合场景理解让系统「理解」运镜为何好看，并在新场景中智能适配；其「从视频理解三维运动并让物理设备执行」的技术内核，也可延伸到任何需要精确运动复刻的场景。',
          en: 'Camera moves will become shareable "motion assets" — a master shot can be extracted, saved and downloaded by anyone, just as MIDI democratized music. Further, scene understanding could let the system adapt a move to new stages and subjects; its core — understanding 3D motion from video and executing it physically — extends to any precise motion-replay scenario.',
        },
      },
    ],
    tags: ['MegaSaM / SLAM', 'Depth Anything + UniDepth', '六轴机械臂', 'Three.js 可视化', 'FastAPI + React', 'Qoder Agent 工作流'],
    articleUrl: 'https://mp.weixin.qq.com/s/0nXoMc8TiP5unV8W-9yjZg',
    adxUrl: 'https://gallery.adventure-x.org/projects/cmrzrrij9000k02ibgdt4hlpa',
    videoUrl: 'https://www.bilibili.com/video/BV1Hr336PEKy/',
    images: [
      { src: '/img/camtrace-banner.png', alt: { zh: 'CamTrace 宣传海报', en: 'CamTrace banner' } },
      { src: '/img/camtrace-award.png', alt: { zh: 'Qoder 赛道二等奖', en: 'Qoder track 2nd Prize' } },
    ],
    shellColor: '#2e3138', accentColor: '#22252b',
  },
  {
    id: 'joyoung',
    title: { zh: '九阳「探索者」创新挑战赛', en: 'Joyoung Explorer Challenge' },
    period: '2024.11 - 2025.03',
    slogan: { zh: '从新品洞察到高可执行性方案，拿下全国营销策划冠军', en: 'From product insight to a highly executable plan — national marketing plan champion.' },
    desc: {
      zh: '作为队长带领 5 人团队参加九阳全国「探索者」创新挑战赛：围绕新品「沸萃养生壶」，完成从市场洞察、策略制定到高可执行性方案的全链路营销策划案，斩获全国营销策划赛道第一名，方案被九阳采纳为官方参考营销案例。',
      en: 'Led a 5-person team at the Joyoung "Explorer" Innovation Challenge: built a full-loop marketing plan around the new "Joyoung Kettle", from market insight and strategy to a highly executable plan. Won the national marketing plan championship; the plan was adopted by Joyoung as an official reference case.',
    },
    awards: [
      { rank: { zh: '冠军', en: 'Champion' }, track: { zh: '全国营销策划赛道', en: 'National Marketing Plan Track' } },
      { rank: { zh: '官方采纳', en: 'Adopted' }, track: { zh: '九阳官方参考营销案例', en: 'Joyoung Official Reference Case' } },
    ],
    sections: [
      {
        heading: { zh: '项目介绍', en: 'Overview' },
        body: {
          zh: '九阳「探索者」创新挑战赛是国内知名家电品牌九阳面向全国高校举办的创新营销竞赛。参赛团队需围绕九阳新品「沸萃养生壶」，完成从市场洞察、策略制定到高可执行性方案的全链路营销策划案，最终由企业评审团从全国队伍中评选出冠军方案。',
          en: 'The Joyoung "Explorer" Innovation Challenge is a national college marketing competition hosted by the leading home-appliance brand Joyoung. Teams built a full-loop marketing plan around the new "Joyoung Kettle", with the winning plan selected by the company’s jury from entries nationwide.',
        },
      },
      {
        heading: { zh: '我的工作', en: 'My Role' },
        items: [
          { zh: '市场与用户分析：完成市场环境、产品卖点与目标用户的全维度调研，输出数据支撑的洞察结论', en: 'Market & user analysis: conducted full-dimensional research on market environment, product strengths, and target users, producing data-backed insights.' },
          { zh: '策略设计：设计「四季常态化营销 + 关键节点爆发营销」双轨内容传播体系，覆盖日常种草与大促爆破', en: 'Strategy design: created a dual-track content system — "year-round nurturing + key-node burst marketing" — covering both daily seeding and campaign bursts.' },
          { zh: '跨团队管理：协调 5 人团队分工协作，搭建项目进度管控机制，把控策略、内容、设计、路演各环节交付质量', en: 'Team management: coordinated a 5-person cross-functional team, set up a project governance mechanism, and ensured delivery quality across strategy, content, design, and presentation.' },
          { zh: '路演呈现：负责决赛路演 PPT 的全部制作与美化，将复杂策略转化为清晰有力的商业叙事', en: 'Final presentation: owned the complete production and visual design of the final pitch deck, translating complex strategy into a compelling business narrative.' },
        ],
      },
      {
        heading: { zh: '策略方案', en: 'Strategy' },
        items: [
          { zh: '四季常态化营销：根据产品特性与用户生活节奏，设计全年无休的内容传播矩阵，保持品牌声量稳定输出', en: 'Year-round nurturing: built a continuous content matrix aligned with product traits and user routines, maintaining steady brand presence.' },
          { zh: '关键节点爆发营销：瞄准电商大促、节日礼品等核心消费场景，集中资源制造话题爆破，实现品效合一', en: 'Key-node burst marketing: concentrated resources on e-commerce festivals and gifting occasions to create buzz and drive measurable results.' },
          { zh: '数据驱动决策：基于用户调研与市场洞察制定策略，避免伪需求与自嗨型方案', en: 'Data-driven decisions: formulated strategy based on user research and market insights to avoid fabricated needs or self-serving ideas.' },
          { zh: '全链路可执行：配套预算管控表、执行甘特图、效果追踪指标体系，方案可直接作为品牌方执行手册', en: 'End-to-end executability: equipped with a budget tracker, execution Gantt chart, and KPI system, ready to serve as an operational playbook for the brand.' },
        ],
      },
      {
        heading: { zh: '核心亮点', en: 'Highlights' },
        items: [
          { zh: '策略完整性：从市场分析到高可执行性方案的全链路闭环，而非单一创意点子', en: 'Full-loop strategy: a closed loop from analysis to a highly executable plan, not a single creative idea.' },
          { zh: '数据驱动：基于用户调研与市场洞察制定策略，避免伪需求与自嗨型方案', en: 'Data-driven: grounded in user research and market insight, avoiding fabricated demand.' },
          { zh: '可执行性：配套预算管控、执行节点与效果追踪体系，真正可作为品牌方参考案例', en: 'Executable: includes budget controls, execution milestones, and tracking metrics — a true reference case for the brand.' },
          { zh: '团队领导力：作为队长统筹 5 人跨职能团队，完成从 0 到 1 的竞赛项目交付', en: 'Leadership: as captain, led a 5-person cross-functional team to deliver the competition project from scratch.' },
        ],
      },
    ],
    tags: ['营销策划', '市场调研', '策略设计', '跨团队管理', '路演 PPT', '数据驱动'],
    images: [
      { src: '/img/joyoung/cover.png', alt: { zh: '九阳沸萃系列养生壶', en: 'Joyoung kettle lineup' } },
      { src: '/img/joyoung/slide-13.png', alt: { zh: '用户分析 — 大数据统计', en: 'User analysis — data insights' } },
      { src: '/img/joyoung/slide-15.png', alt: { zh: '用户分析 — 场景占比', en: 'User analysis — usage scenarios' } },
      { src: '/img/joyoung/slide-57.png', alt: { zh: '致敬伟大的小问题', en: 'Tribute to small problems' } },
    ],
    shellColor: '#d95d2a', accentColor: '#b84a1f',
  },
  {
    id: 'ai-murder-mystery',
    title: { zh: '多 Agent — AI 剧本杀', en: 'Multi-Agent AI Murder Mystery' },
    period: '',
    slogan: { zh: 'LLM 驱动的 NPC 自动发言，打造沉浸式 AI 剧本杀体验', en: 'LLM-driven NPC auto-play creates an immersive AI murder mystery experience.' },
    desc: {
      zh: '面向 PC 端的 AI 剧本杀游戏，支持选角、阅读剧本、自我介绍、搜证、讨论、投票、真相揭示等完整游戏流程。融合 LLM 驱动的 NPC 自动发言与玩家实时互动，让传统桌搭数字化的同时保留社交推理乐趣。',
      en: 'A PC-based AI murder mystery game supporting the full loop: role selection, script reading, self-introductions, evidence search, discussion, voting, and truth reveal. LLM-driven NPC auto-play blends with real-time player interaction, digitizing tabletop mystery while preserving social deduction fun.'
    },
    awards: [
      { rank: { zh: '人气奖', en: 'Audience Award' }, track: { zh: 'EvoMap 进化酒馆黑客松', en: 'EvoMap Evolution Saloon Hackathon' } },
    ],
    sections: [
      {
        heading: { zh: '项目介绍', en: 'Overview' },
        body: {
          zh: '这是一款面向 PC 端的 AI 剧本杀游戏，目标是让传统桌面推理游戏在线上获得更沉浸、更高效的体验。玩家可完成选角、阅读剧本、自我介绍、搜证、讨论、投票、真相揭示等完整流程；系统通过多 Agent 架构让 NPC 自动发言、回应玩家，并保持角色设定与剧情一致性。',
          en: 'A PC-based AI murder mystery game that brings tabletop推理 into a more immersive digital experience. Players go through the full loop: role selection, script reading, self-introduction, evidence search, discussion, voting, and truth reveal. A multi-Agent architecture powers NPC auto-play and responses while maintaining character consistency.'
        },
      },
      {
        heading: { zh: '我的工作', en: 'My Role' },
        body: {
          zh: '作为项目核心开发者，负责整体架构设计与多 Agent 系统搭建：设计 LLM Agent 的角色 prompt 与对话状态机，协调 NPC 发言时机与内容一致性；主导后端 FastAPI + SQLAlchemy 接口开发，管理会话、剧本、证物等数据模型；参与前端 Mantine 组件设计与对话布局实现。',
          en: 'As a core developer, I owned the architecture and multi-Agent system: designed LLM agent prompts and dialogue state machines, coordinated NPC timing and content consistency; led backend API development with FastAPI + SQLAlchemy for sessions, scripts, and evidence; contributed to frontend Mantine components and chat layout.'
        },
      },
      {
        heading: { zh: '技术方案', en: 'Technical Approach' },
        items: [
          { zh: '前端沉浸式布局：React + TypeScript + Mantine 实现对话式界面，Vite 构建，支持角色卡、剧本弹窗、证据面板等模块', en: 'Frontend: React + TypeScript + Mantine for immersive dialogue UI, built with Vite, featuring character cards, script modals, and evidence panels' },
          { zh: '多 Agent 后端：FastAPI + SQLAlchemy 提供会话、剧本、证物、Agent 管理等接口，LLM Agent 自动生成 NPC 发言', en: 'Multi-Agent backend: FastAPI + SQLAlchemy for session, script, evidence, and agent management; LLM agents auto-generate NPC dialogue' },
          { zh: '游戏流程引擎：状态机管理选角→自我介绍→搜证→讨论→投票→真相揭示的完整流程', en: 'Game flow engine: state machine managing the complete loop from role selection through truth reveal' },
          { zh: '实时互动：WebSocket 支持玩家与 NPC、玩家与玩家之间的实时消息同步', en: 'Real-time interaction: WebSocket for live message sync between players and NPCs' },
        ],
      },
      {
        heading: { zh: '项目亮点', en: 'Highlights' },
        items: [
          { zh: '多 Agent 协作：多个 LLM Agent 分别控制不同 NPC，保持角色设定与剧情一致性，支持并行对话', en: 'Multi-Agent collaboration: separate LLM agents control different NPCs, maintaining character consistency and supporting parallel conversations' },
          { zh: '沉浸式体验：Mantine 组件库实现类似剧本杀 APP 的对话布局，支持证据卡片、角色头像、时间线等元素', en: 'Immersive UX: Mantine components recreate the feel of native murder mystery apps with evidence cards, avatars, and timelines' },
          { zh: '完整游戏闭环：从选角到真相揭示的完整流程可运行，已获得黑客松人气奖验证', en: 'Complete loop: the full flow from role selection to truth reveal is playable, validated by the hackathon audience award' },
          { zh: '持续迭代：团队处于持续开发阶段，期待正式上线', en: 'Ongoing iteration: team is actively developing with plans for public launch' },
        ],
      },
    ],
    tags: ['React', 'TypeScript', 'Mantine', 'Vite', 'FastAPI', 'Python', 'SQLAlchemy', 'LLM Agent', 'WebSocket'],
    videoUrl: 'https://pan.baidu.com/s/1u7YhkfFlqrq7ZbCf-WOpDw?pwd=2ywi',
    images: [
      { src: '/img/ai-murder-mystery/screenshot-1.jpg', alt: { zh: 'AI 剧本杀游戏界面 — 角色立绘与对话', en: 'Game UI — character portrait and dialogue' } },
      { src: '/img/ai-murder-mystery/screenshot-2.jpg', alt: { zh: 'EvoMap 进化酒馆黑客松现场', en: 'EvoMap Evolution Saloon Hackathon venue' } },
    ],
    shellColor: '#4a3f35', accentColor: '#3a322a',
  },
  {
    id: 'electronic-design-contest',
    title: { zh: '全国大学生电子设计竞赛', en: 'National Undergraduate Electronic Design Contest' },
    period: '2025.08',
    desc: {
      zh: '基于OpenMV/K230，实现靶心识别、云台控制、串口通信系统，实现激光实时打靶的效果。',
      en: 'Built target recognition, gimbal control, and serial communication system using OpenMV/K230, enabling real-time laser target hitting.'
    },
    sections: [
      {
        heading: { zh: '项目内容', en: 'Project Content' },
        items: [
          { zh: '基于OpenMV/K230，实现靶心识别、云台控制、串口通信系统，实现激光实时打靶的效果。', en: 'Built target recognition, gimbal control, and serial communication system using OpenMV/K230, enabling real-time laser target hitting.' }
        ]
      },
      {
        heading: { zh: '我的工作', en: 'My Role' },
        items: [
          { zh: '负责赛题视觉模块，基于Python语言编程，识别正确率超过90%。', en: 'Led the vision module development using Python, achieving over 90% recognition accuracy.' }
        ]
      }
    ],
    tags: ['OpenMV', 'K230', 'Python', '视觉识别', '云台控制', '串口通信'],
    shellColor: '#c17f59', accentColor: '#a66a48',
  },
  {
    id: 'stm32-weather-system',
    title: { zh: '基于STM32的 日历+时钟+天气预报系统', en: 'STM32 Calendar / Clock / Weather Forecast System' },
    period: '2024.12',
    desc: {
      zh: '基于STM32单片机、屏幕显示、LED、蓝牙、电源、按键、蜂鸣器、WiFi等模块，用C语言开发时钟+闹钟天气预报系统，天气预报通过WiFi获取实时信息并显示，闹钟蜂鸣器提示。',
      en: 'Developed a clock + alarm + weather forecast system on STM32 using C, with display, LED, Bluetooth, WiFi, buttons, and buzzer modules.'
    },
    sections: [
      {
        heading: { zh: '项目内容', en: 'Project Content' },
        items: [
          { zh: '基于STM32单片机、屏幕显示、LED、蓝牙、电源、按键、蜂鸣器、WiFi等模块，用C语言开发时钟+闹钟天气预报系统，天气预报通过WiFi获取实时信息并显示，闹钟蜂鸣器提示。', en: 'Developed a clock + alarm + weather forecast system on STM32 using C, with display, LED, Bluetooth, WiFi, buttons, and buzzer modules.' }
        ]
      },
      {
        heading: { zh: '我的工作', en: 'My Role' },
        items: [
          { zh: '3天内独立完成项目编程、Debug、文档撰写，在STM32单片机原有功能上进行模块化的拓展开发。', en: 'Independently completed programming, debugging, and documentation within 3 days, with modular extensions on STM32.' }
        ]
      },
      {
        heading: { zh: '项目成果', en: 'Achievements' },
        items: [
          { zh: '课程项目教师评分达98分，技术文档撰写95分，具备嵌入式开发全流程的实战经验。', en: 'Course project scored 98/100 from instructor, 95/100 for technical documentation; gained full-cycle embedded development experience.' }
        ]
      }
    ],
    tags: ['STM32', 'C语言', '嵌入式', '物联网', 'WiFi', '蓝牙'],
    shellColor: '#5e7a8c', accentColor: '#4a6575',
  },
  {
    id: 'p1',
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
  bullets?: Array<BI>
  /** 照片占位符：之后换成真实图片 URL 即可 */
  photo?: string
  hue: number
  shellColor: string
  accentColor: string
}
export const campus: CampusItem[] = [
  { id: 'c2', year: '', title: { zh: '电子新媒体 运营策划部主任', en: 'Digital Media Operations & Planning Dept. Director' }, caption: { zh: '统筹部门文稿、策划、推文、采访工作，带领团队完成校媒体日常运营', en: 'Led writing, events, copy, and interview teams for campus media operations' },
    bullets: [
      { zh: '文稿：参与撰写文章节被刊载在新华网、学习强国、中国蓝新闻、中国教育在线等国家、省级媒体，总计10+篇。', en: 'Writing: Articles published on Xinhua Net, Learning Power, China Blue News, China Education Online and other national/provincial media, 10+ pieces.' },
      { zh: '策划：策划电子新媒体破冰、主题分享会、日常部门会议等工作。', en: 'Events: Organized icebreakers, themed sharing sessions, and routine department meetings.' },
      { zh: '推文：制作/审核/排版杭电电子官微推文340+ 篇，总浏览量 15W+ 次，有良好的审美和文字功底。', en: 'Copywriting: Produced/reviewed/typeset 340+ WeChat posts for HDU Electronic official account, with total views exceeding 150,000.' },
      { zh: '采访：表达能力和文稿撰写能力强，多次参与新生报到、大型活动采访和文案撰写工作。', en: 'Interviews: Strong communication and writing skills; participated in freshman registration, major event coverage, and copywriting.' },
    ],
    hue: 350, shellColor: '#a9c3e6', accentColor: '#8fadd6' },
  { id: 'c3', year: '', title: { zh: '抖音WowLand校园计划 视频创作者&工作人员', en: 'Douyin WowLand Campus Program Video Creator & Staff' }, caption: { zh: '抖音官方校园创作者扶持专项项目，聚焦校园内容生态孵化与青年创作者培养', en: 'Official Douyin campus creator support program focusing on campus content ecosystem incubation' },
    bullets: [
      { zh: '项目内容：抖音官方校园创作者扶持专项项目，聚焦校园内容生态孵化与青年创作者培养，主打校园原创短视频内容创作、校园活动落地执行、优质内容孵化推广、校园创作者社群运营等工作，解决校园优质原创内容稀缺、学生创作者缺乏官方扶持、校园活动宣传曝光不足的痛点。', en: 'Project: Official Douyin campus creator support program focusing on original short-form video creation, event execution, content incubation, and creator community operations.' },
      { zh: '工作内容：身兼项目工作人员与原创视频创作者双重身份，全程参与项目落地执行与内容创作。负责项目校园落地对接、活动流程统筹、社群日常维护及素材整理汇总等运营工作；独立策划、拍摄、剪辑校园原创短视频内容，贴合平台流量规则打磨视频脚本、画面质感与文案风格，持续输出优质校园内容，配合官方运营团队完成内容优化、选题迭代和活动宣发工作。', en: 'Responsibilities: Served as both staff and original video creator. Managed campus coordination, event planning, community operations, and素材 compilation; independently planned, filmed, and edited short-form videos, optimizing scripts, visuals, and copy to align with platform algorithms.' },
      { zh: '项目成果：累计产出多条优质校园原创短视频，获得4月官方一等奖拍立得，5月校园活动工作人员。', en: 'Achievements: Produced multiple high-quality campus short videos; received April Official First Prize Polaroid and served as May campus event staff.' },
    ],
    hue: 40, shellColor: '#d9c9a1', accentColor: '#c9b78d' },
  { id: 'c6', year: '', title: { zh: '电子辩论队 教练/最佳辩手', en: 'Electronic Debate Team Coach / Best Debater' }, caption: { zh: '担任电子辩论队教练，策划并举办日常训练赛和学院间友谊赛、表演赛', en: 'Served as coach for the Electronic Debate Team, organizing training sessions and inter-college friendly matches' },
    bullets: [
      { zh: '文稿：曾担任过全辩位，有良好的表达能力、文稿撰写能力、团队配合能力，擅长叙事，能很好的照顾观众听感。', en: 'Writing: Served as all-position debater with strong expression, writing, and teamwork skills; skilled at narrative and audience engagement.' },
    ],
    hue: 140, shellColor: '#7ba68d', accentColor: '#5e8a72' },
  { id: 'c4', year: '', title: { zh: '竞赛获奖', en: 'Competition Award' }, caption: { zh: '照片占位：颁奖现场', en: 'Photo placeholder' }, hue: 40, shellColor: '#cfc9b8', accentColor: '#bcb5a2' },
  { id: 'c5', year: '', title: { zh: '毕业季', en: 'Graduation' }, caption: { zh: '照片占位：毕业照', en: 'Photo placeholder' }, hue: 270, shellColor: '#31405e', accentColor: '#263350' },
]

/* ---------------- ⑥ 实习经历（卡带 + 说明书） ---------------- */
export interface Internship {
  id: string
  company: BI
  role: BI
  period: string
  slogan?: BI
  desc: BI
  highlights?: Array<BI>
  tags?: string[]
  images?: Array<{ src: string; alt: BI }>
  link?: string
  shellColor: string
  accentColor: string
}
export const internships: Internship[] = [
  {
    id: 'i1',
    company: { zh: '实习公司 A', en: 'Company A' },
    role: { zh: '岗位名称', en: 'Role Title' },
    period: '2025.06 - 2025.09',
    slogan: { zh: '在这里填写一句话概括这段实习的核心收获', en: 'One-line summary of key takeaways from this internship.' },
    desc: { zh: '在这里填写实习的公司简介、团队背景，以及你主要负责的方向。描述你在团队中的角色、参与的核心项目，以及带来的可量化成果。', en: 'Describe the company, team background, and your main responsibilities. Include your role, core projects, and measurable outcomes.' },
    highlights: [
      { zh: '亮点一：具体成果或贡献', en: 'Highlight 1: specific achievement or contribution' },
      { zh: '亮点二：具体成果或贡献', en: 'Highlight 2: specific achievement or contribution' },
    ],
    tags: ['技能/工具', '技能/工具', '技能/工具'],
    images: [],
    link: '',
    shellColor: '#2c3e50',
    accentColor: '#1a252f',
  },
  {
    id: 'i2',
    company: { zh: '实习公司 B', en: 'Company B' },
    role: { zh: '岗位名称', en: 'Role Title' },
    period: '2025.01 - 2025.05',
    slogan: { zh: '在这里填写一句话概括这段实习的核心收获', en: 'One-line summary of key takeaways from this internship.' },
    desc: { zh: '在这里填写实习的公司简介、团队背景，以及你主要负责的方向。描述你在团队中的角色、参与的核心项目，以及带来的可量化成果。', en: 'Describe the company, team background, and your main responsibilities. Include your role, core projects, and measurable outcomes.' },
    highlights: [
      { zh: '亮点一：具体成果或贡献', en: 'Highlight 1: specific achievement or contribution' },
    ],
    tags: ['技能/工具', '技能/工具'],
    images: [],
    link: '',
    shellColor: '#34495e',
    accentColor: '#2c3e50',
  },
  {
    id: 'i3',
    company: { zh: '大华股份·浙江华诺康科技有限公司', en: 'Dahua Co., Ltd. / Zhejiang Huanuokang Technology Co., Ltd.' },
    role: { zh: '测试开发实习生', en: 'Test Development Intern' },
    period: '2026.05 - 2026.07',
    slogan: { zh: '医疗内窥镜项目测试开发：从用例设计到自动化工具，推动测试效率提升50%', en: 'Medical endoscope project test development: from test case design to automation tools, improving test efficiency by 50%.' },
    desc: { zh: '在大华股份旗下华诺康科技担任测试开发实习生，负责医疗内窥镜"天柱山"项目的测试开发工作。覆盖图像处理主机、摄像头、控制、机械臂模组等核心模块，参与功能测试、自动化工具开发、缺陷闭环及知识库建设，保障项目按节点交付。', en: 'Served as a test development intern at Dahua\'s Huanuokang Technology, responsible for test development on the medical endoscope "Tianzhushan" project. Covered core modules including image processing host, camera, control, and robotic arm, participating in functional testing, automation tool development, defect closure, and knowledge base construction.' },
    highlights: [
      { zh: '测试用例设计与执行：独立编写覆盖基本功能、图像质量、接口协议等维度的测试用例200余条，累计执行测试用例500轮次。', en: 'Test case design & execution: Independently designed 200+ test cases covering basic functionality, image quality, and interface protocols; executed 500 test rounds in total.' },
      { zh: '测试工具开发：开发EasyOCR多语言自动化测试工具、自动化脚本录制工具，实现50%的测试提效。', en: 'Test tool development: Developed EasyOCR multilingual automation testing tool and automated script recording tool, achieving 50% test efficiency improvement.' },
      { zh: '缺陷管理与闭环追踪：在禅道中提交并跟踪100+个有效Bug，推动问题100%闭环解决，确保项目按节点交付。', en: 'Defect management: Submitted and tracked 100+ valid bugs in Zen Tao, drove 100% defect closure, and ensured on-time project delivery.' },
      { zh: '测试文档与知识库建设：撰写及维护《天柱山整机测试操作手册》、《Bug复现步骤指引》，搭建部门测试知识库，将高频问题及解决方案归档，提升团队协同测试效率。', en: 'Test documentation & knowledge base: Wrote and maintained "Tianzhushan Full Machine Test Operation Manual" and "Bug Reproduction Steps Guide"; built department test knowledge base to archive high-frequency issues and solutions.' },
      { zh: '产品需求评审与质量前置：参与项目需求评审会，从测试角度对用户操作逻辑、异常提示文案、系统响应时间等提出优化建议，在产品开发早期规避了3项潜在设计缺陷。', en: 'Product requirement review & quality前置: Participated in requirement review meetings, provided optimization suggestions from testing perspective on user operation logic, error message copy, and system response time, preventing 3 potential design defects early in development.' },
    ],
    tags: ['测试开发', '自动化测试', '禅道', 'EasyOCR', '缺陷管理', '需求评审'],
    images: [],
    link: '',
    shellColor: '#1e5f74',
    accentColor: '#153b4a',
  },
  {
    id: 'i4',
    company: { zh: '西安西安青年时代网络科技有限公司', en: "Xi'an Youth Era Network Technology Co., Ltd." },
    role: { zh: '小红书运营线上远程实习生', en: 'Xiaohongshu Operations Remote Intern' },
    period: '2025.09 - 2025.12',
    slogan: { zh: 'AIGC 赋能小红书运营：用 n8n 搭建图文生成工作流，单篇创作周期缩短至 1 分钟内', en: 'AIGC-powered Xiaohongshu operations: built an n8n workflow for image-text generation, reducing creation cycle to under 1 minute per post.' },
    desc: { zh: '在西安青年时代网络科技担任小红书运营线上远程实习生，负责平台官方小红书账号全流程运营。围绕大学生志愿者招募核心业务，完成内容选题策划、文案创作、多模态内容制作、账号运维全链路工作，精准触达全国高校学生目标群体。', en: 'Worked as a remote Xiaohongshu operations intern at Xi\'an Youth Era Network Technology, responsible for the full-cycle operation of the official Xiaohongshu account. Focused on college student volunteer recruitment, handling content planning, copywriting, multimodal content creation, and account maintenance to reach university students nationwide.' },
    highlights: [
      { zh: '平台官方账号全流程运营：围绕大学生志愿者招募核心业务，完成内容选题策划、文案创作、多模态内容制作、账号运维全链路工作，精准触达全国高校学生目标群体。', en: 'End-to-end official account operations: handled content planning, copywriting, multimodal content creation, and account maintenance for college student volunteer recruitment, reaching university students nationwide.' },
      { zh: 'AIGC 内容生产全流程赋能：用 n8n 搭建小红书图文生成工作流，完成文案、配图批量制作，单篇内容创作周期缩短至 1 分钟内。', en: 'AIGC-powered content production: built an n8n workflow for Xiaohongshu image-text generation, enabling batch copywriting and image creation, reducing per-post creation cycle to under 1 minute.' },
      { zh: '数据驱动的效果评估体系：基于账号后台数据反馈，搭建内容效果评估体系，通过互动量等核心指标，结构化迭代内容创作 SOP。', en: 'Data-driven evaluation system: built a content performance evaluation framework based on account analytics, using engagement metrics to iteratively improve content creation SOPs.' },
    ],
    tags: ['小红书运营', 'AIGC', 'n8n', '内容SOP', '数据分析'],
    images: [],
    link: '',
    shellColor: '#c0392b',
    accentColor: '#a93226',
  },
]
