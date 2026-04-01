# 🏴 CTF Blog - 个人CTF学习博客

一个专为CTF学习者打造的现代化个人博客网站，基于 Vue 3 + Vite 构建。

![Vue](https://img.shields.io/badge/Vue-3.4-4FC08D?logo=vue.js)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ 特性

- 🎨 **赛博朋克主题** - 专为CTFer设计的深色配色方案
- 📱 **响应式设计** - 完美适配桌面和移动设备
- ⚡ **快速加载** - 基于 Vite 构建，极速体验
- 📝 **文章分类** - 支持 Web、Pwn、Crypto、Misc、Reverse 等CTF分类
- 🔍 **搜索功能** - 快速查找感兴趣的文章
- 🎯 **技能展示** - 可视化的技能矩阵
- 📊 **CTF时间线** - 记录参赛历程

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm 或 yarn

### 安装

```bash
# 克隆项目
git clone https://github.com/yourusername/ctf-blog.git
cd ctf-blog

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 构建

```bash
# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 📁 项目结构

```
ctf-blog-vue/
├── public/              # 静态资源
├── src/
│   ├── assets/         # 样式文件
│   ├── components/     # 组件
│   │   ├── Navbar.vue  # 导航栏
│   │   └── Footer.vue  # 页脚
│   ├── router/         # 路由配置
│   ├── utils/          # 工具函数
│   │   └── data.js     # 文章数据
│   ├── views/          # 页面视图
│   │   ├── Home.vue    # 首页
│   │   ├── Articles.vue # 文章列表
│   │   ├── ArticleDetail.vue # 文章详情
│   │   └── About.vue   # 关于页面
│   ├── App.vue         # 根组件
│   └── main.js         # 入口文件
├── deploy.js           # 部署脚本
├── index.html
├── package.json
└── vite.config.js
```

## 📝 添加文章

编辑 `src/utils/data.js` 文件，在 `articles` 数组中添加新文章：

```javascript
{
  id: 7,
  title: '你的文章标题',
  category: 'web',  // web | pwn | crypto | misc | reverse
  date: '2024-03-20',
  readTime: 10,
  excerpt: '文章摘要...',
  tags: ['标签1', '标签2'],
  content: `
## 标题

文章正文，支持 Markdown 格式...
  `
}
```

## 🌐 部署

### 方式一：本地部署

```bash
npm run deploy
```

这会将构建好的文件复制到 `../ctf-blog-dist` 目录，并生成启动脚本。

### 方式二：SCP 部署到服务器

1. 编辑 `deploy.js`，配置服务器信息：

```javascript
const DEPLOY_METHOD = 'scp'
const SCP_CONFIG = {
  host: 'your-server.com',
  username: 'root',
  port: 22,
  privateKey: '~/.ssh/id_rsa',
  remotePath: '/var/www/ctf-blog'
}
```

2. 运行部署：

```bash
npm run deploy
```

### 方式三：GitHub Pages

1. 编辑 `deploy.js`，配置 GitHub 仓库：

```javascript
const DEPLOY_METHOD = 'gh-pages'
const GH_PAGES_CONFIG = {
  repo: 'https://github.com/yourusername/ctf-blog.git',
  branch: 'gh-pages'
}
```

2. 运行部署：

```bash
npm run deploy
```

## 🎨 自定义主题

编辑 `src/assets/style.css` 文件，修改 CSS 变量来自定义主题色：

```css
:root {
  --primary-color: #00ff88;    /* 主色调 */
  --secondary-color: #ff6b6b;  /* 辅助色 */
  --accent-color: #4ecdc4;     /* 强调色 */
  --bg-dark: #0f0f23;          /* 背景色 */
  /* ... */
}
```

## 📄 许可证

MIT License

## 🙏 致谢

感谢所有CTF社区的开源项目和Writeup分享，让学习之路不再孤单！

---

Made with 💚 for CTFers
