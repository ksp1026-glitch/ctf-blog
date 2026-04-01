# 🚀 GitHub Actions 自动部署指南

## 方案选择

| 方案 | 适用场景 | 难度 | 费用 |
|------|---------|------|------|
| **GitHub Pages** | 个人博客、静态网站 | ⭐ 最简单 | 免费 |
| **Vercel** | 前端项目、需要边缘加速 | ⭐⭐ 简单 | 免费额度充足 |
| **自己的服务器** | 需要完整控制、自定义域名 | ⭐⭐⭐ 中等 | 服务器费用 |

---

## 方案 1: GitHub Pages（推荐新手）

### 特点
- ✅ 完全免费
- ✅ 自动 HTTPS
- ✅ 全球 CDN 加速
- ⚠️ 域名格式：`https://username.github.io/ctf-blog`
- ⚠️ 仓库需要设置为 Public

### 配置步骤

#### 1. 创建 GitHub 仓库
```bash
# 在 GitHub 上创建新仓库，命名为 ctf-blog
# 然后推送到 GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ctf-blog.git
git push -u origin main
```

#### 2. 启用 GitHub Pages
1. 进入仓库 → **Settings** → **Pages**
2. **Source** 选择 "GitHub Actions"
3. 保存

#### 3. 推送代码触发部署
```bash
git add .
git commit -m "Add GitHub Actions workflow"
git push
```

#### 4. 查看部署状态
- 进入仓库 → **Actions** 标签
- 等待 workflow 运行完成（绿色 ✓）
- 访问：`https://yourusername.github.io/ctf-blog`

---

## 方案 2: Vercel（推荐需要自定义域名）

### 特点
- ✅ 自动 HTTPS + 自定义域名
- ✅ 全球边缘网络加速
- ✅ 自动预览部署
- ✅ 免费额度充足（100GB/月）

### 配置步骤

#### 1. 注册 Vercel 账号
访问 https://vercel.com，用 GitHub 账号登录

#### 2. 导入项目
1. 点击 "Add New Project"
2. 选择你的 GitHub 仓库
3. Framework Preset 选择 "Vite"
4. 点击 Deploy

#### 3. 自定义域名（可选）
1. 进入项目 → Settings → Domains
2. 添加你的域名
3. 按照提示配置 DNS

#### 4. 配置 GitHub Actions（可选）
取消 `deploy.yml` 中 Vercel 部分的注释，并添加 Secrets：

```bash
# 获取 Vercel Token
vercel login
vercel tokens

# 获取项目 ID
vercel link
cat .vercel/project.json
```

在 GitHub 仓库添加 Secrets：
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

---

## 方案 3: 部署到自己的服务器

### 特点
- ✅ 完全控制
- ✅ 可使用任意域名
- ⚠️ 需要维护服务器
- ⚠️ 需要配置 SSL

### 配置步骤

#### 1. 准备服务器
- Ubuntu 20.04+ 服务器
- 已安装 Nginx
- 开放 80/443 端口

#### 2. 配置 SSH 密钥
```bash
# 在本地生成密钥（如果还没有）
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"

# 复制公钥到服务器
ssh-copy-id root@your-server-ip

# 测试免密登录
ssh root@your-server-ip
```

#### 3. 配置 GitHub Secrets
进入仓库 → Settings → Secrets and variables → Actions → New repository secret

添加以下 Secrets：

| Secret Name | 说明 | 示例 |
|------------|------|------|
| `SERVER_HOST` | 服务器 IP 或域名 | `123.45.67.89` |
| `SERVER_USER` | SSH 用户名 | `root` |
| `SERVER_PASSWORD` | SSH 密码（如果用密码）| `your-password` |
| `SSH_PRIVATE_KEY` | SSH 私钥（如果用密钥）| 复制 `~/.ssh/id_rsa` 内容 |

#### 4. 启用 GitHub Actions
编辑 `.github/workflows/deploy.yml`，取消 `deploy-server` 部分的注释。

#### 5. 推送代码
```bash
git add .
git commit -m "Enable server deployment"
git push
```

---

## 🔧 配置文件说明

### 文件结构
```
.github/
└── workflows/
    └── deploy.yml      # GitHub Actions 工作流配置
```

### 触发条件（可修改）
```yaml
on:
  push:
    branches: [ main, master ]    # 推送到 main/master 时触发
  pull_request:
    branches: [ main, master ]    # PR 时触发
  workflow_dispatch:              # 允许手动触发
```

### 环境变量
如果需要自定义构建设置，可以添加：

```yaml
env:
  VITE_APP_TITLE: 'CTF Blog'
  VITE_APP_API_URL: 'https://api.example.com'
```

---

## 📋 部署前检查清单

- [ ] 代码已推送到 GitHub
- [ ] 仓库是 Public（GitHub Pages 需要）
- [ ] `vite.config.js` 中 `base` 配置正确：
  - GitHub Pages: `base: '/ctf-blog/'`
  - 其他: `base: './'`

---

## 🐛 常见问题

### 1. 部署后页面空白
检查 `vite.config.js`：
```js
export default defineConfig({
  base: '/ctf-blog/',  // GitHub Pages 需要仓库名
  // ...
})
```

### 2. 刷新页面 404
GitHub Actions 已自动配置。如果是自己的服务器，确保 Nginx 配置：
```nginx
try_files $uri $uri/ /index.html;
```

### 3. 资源加载失败（404）
检查浏览器开发者工具 → Network，确认资源路径正确。

### 4. Actions 运行失败
进入仓库 → Actions → 点击失败的 workflow → 查看日志

---

## 🎯 推荐配置

### 纯静态博客（最简单）
**选择：GitHub Pages**
- 免费、稳定、快速
- 适合个人博客

### 需要自定义域名
**选择：Vercel**
- 免费 SSL + 自定义域名
- 全球 CDN

### 需要后端服务
**选择：自己的服务器**
- 完全控制
- 可扩展性强

---

## 📞 需要帮助？

部署遇到问题请提供：
1. 选择的方案（GitHub Pages / Vercel / 服务器）
2. GitHub Actions 运行日志截图
3. 浏览器控制台的错误信息
