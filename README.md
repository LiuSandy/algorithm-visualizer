# 算法实验室 (Algorithm Laboratory)

这是一个基于 Next.js 和 Tailwind CSS 构建的算法可视化学习平台。它提供了一个直观的交互式界面，帮助开发者和学习者深入理解各种核心算法的工作原理。

## 主要功能

- **算法可视化**: 将抽象的算法步骤转化为动态的图形展示，包括数组、树、图等数据结构。
- **步进执行**: 支持单步前进、后退，允许暂停和恢复，方便仔细观察每一步的内部状态演变。
- **双核对比模式**: 支持同时运行两个不同的算法（例如不同的搜索算法），直观对比其性能和执行路径。
- **丰富的算法库**: 涵盖了不同类别的经典算法：
  - **排序算法**: 冒泡、选择、插入、归并、快速排序等。
  - **搜索/图算法**: BFS、DFS、Dijkstra、A*、Prim、Kruskal、Bellman-Ford、Floyd-Warshall 等。
  - **字符串算法**: KMP、Rabin-Karp、Z-Algorithm、基于栈的括号匹配等。
  - **实用/工作算法**: LRU 缓存、布隆过滤器、一致性哈希等。
  - **经典问题**: N皇后、汉诺塔、迷宫生成与求解等。
- **变量监控面板**: 实时展示关键变量的值和状态，辅助理解算法逻辑。
- **速度调节与断点**: 可自定义执行速度，并支持设置断点以便在重点步骤暂停。

## 技术栈

- 框架：Next.js (App Router)
- 语言：TypeScript
- 样式：Tailwind CSS
- 动画库：Framer Motion (通过 `motion/react`)
- 图标：Lucide React

## 本地开发指南

1. **安装依赖**

```bash
npm install
```

2. **启动开发服务器**

```bash
npm run dev
```

3. **访问应用**

打开浏览器并访问 `http://localhost:3000`。

## 部署到 Vercel

本项目完全兼容 Vercel 部署：

1. 将代码推送到 GitHub、GitLab 或 Bitbucket。
2. 登录 Vercel，选择 "Add New Project"。
3. 导入你的仓库。
4. Vercel 会自动检测到 Next.js 框架，保留默认构建配置。
5. 点击 "Deploy" 等待部署完成即可。

> **部署提示**: 如果在构建过程中遇到错误（例如 `next/document` 引入错误等），请确保遵循 Next.js App Router 的规范，不要在 `app` 目录下的组件中混用 Pages Router 特有的全局组件（如 `<Html>` 或 `<Head>`，这些应在 `app/layout.tsx` 中使用标准的 HTML 标签替代）。

## 注意事项

- 本应用使用了大量的状态和动态可视化，在某些极端的性能场景下（如节点极多或执行速度飞快），请注意动画库的渲染开销。
- Vercel 部署无需额外配置即可良好运行在 Serverless 环境。如果你需要完整的 Node 服务以保持 WebSocket 等持久连接，可能需要考虑使用其他承载服务，但基础版本纯客户端交互通过 Vercel 是最简单及最佳的选择。
