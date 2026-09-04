# 项目长期记忆（MEMORY.md）

## 站点定位
- cartridge-3d = 高灿的红白机 3D 卡带风格个人作品集（React18+TS+Vite+Three.js）
- 数据源：src/data/content.ts（唯一事实来源）；项目浏览组件：src/components/modals/ProjectsPack.tsx
- 双语（zh/en）、占位卡带待逐步替换为真实项目

## 已收录项目
- camtrace（2026）：CamTrace 运镜机械臂，Adx 黑客松，队长高灿。获 Qoder 赛道二等奖等
- p1~p4 仍为占位卡带（p1 为本作品集自身）

## 用户约定
- 对外展示的项目文案只写高灿本人，不出现队友姓名
- 项目档案统一归档到 workspace/projects/ 目录（Markdown）
- 构建注意：dist 清空可能被沙箱阻止，验证构建用 `npx vite build --no-emptyOutDir`
