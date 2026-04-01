# 🚀 快速部署到 GitHub

## 方式 1: GitHub Pages（最简单，5 分钟完成）

### 步骤 1: 推送到 GitHub
```bash
# 1. 在 https://github.com/new 创建新仓库，命名为 ctf-blog

# 2. 推送代码
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ctf-blog.git
git push -u origin main
```

### 步骤 2: 启用 GitHub Pages
1. 打开仓库页面 → 点击 **Settings**
2. 左侧菜单点击 **Pages**
3. **Source** 选择 "GitHub Actions"
4. 点击 Save

### 步骤 3: 等待部署
1. 点击仓库上方的 **Actions** 标签
2. 等待 workflow 运行完成（显示绿色 ✓）
3. 访问: `https://YOUR_USERNAME.github.io/ctf-blog`

---

## 方式 2: Vercel（推荐，支持自定义域名）

### 步骤 1: 准备
- 注册 Vercel 账号：https://vercel.com
- 用 GitHub 账号登录

### 步骤 2: 一键导入
1. 点击 "Add New..." → "Project"
2. 选择你的 GitHub 仓库
3. Framework Preset: 选择 **Vite**
4. 点击 **Deploy**

### 步骤 3: 自定义域名（可选）
1. 进入项目控制台
2. 点击 **Settings** → **Domains**
3. 添加你的域名并配置 DNS

---

## 方式 3: 自己的服务器

### 步骤 1: 准备 Secrets
进入仓库 → Settings → Secrets and variables → Actions

添加：
- `SERVER_HOST`: 服务器 IP 或域名
- `SERVER_USER`: SSH 用户名
- `SERVER_PASSWORD`: SSH 密码
- 或 `SSH_PRIVATE_KEY`: SSH 私钥

### 步骤 2: 启用部署
编辑 `.github/workflows/deploy.yml`，找到 `deploy-server` 部分，取消注释。

### 步骤 3: 推送代码
```bash
git add .
git commit -m "Enable server deployment"
git push
```

---

## 📋 部署后检查

- [ ] GitHub Actions 显示绿色 ✓
- [ ] 网站能正常访问
- [ ] 页面切换正常
- [ ] 刷新页面不 404

---

## 🆘 遇到问题？

### 页面空白
1. 检查 Actions 日志是否有报错
2. 确认 `vite.config.js` 中的 `base` 配置正确

### 资源 404
GitHub Pages 需要设置 `base: '/ctf-blog/'`，已在 Actions 中自动配置。

### Actions 失败
点击查看失败的 workflow，查看详细日志。
