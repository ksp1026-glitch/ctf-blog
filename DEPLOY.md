# 🚀 CTF Blog 部署指南（Nginx 方案）

## 快速部署步骤

### 第 1 步：准备服务器

购买云服务器（推荐）：
- **阿里云**、**腾讯云**、**华为云**、**AWS**、**DigitalOcean**
- 配置：**1核2G** 即可，系统选择 **Ubuntu 22.04 LTS**
- 开放端口：**80**（HTTP）、**443**（HTTPS）、**22**（SSH）

### 第 2 步：上传部署脚本

#### 方式 A：使用提供的脚本（推荐）

1. **编辑上传脚本**：
   ```
   打开：上传到服务器.bat
   修改以下变量：
   - SERVER_IP=你的服务器IP或域名
   - USERNAME=你的SSH用户名（如 root 或 ubuntu）
   ```

2. **双击运行**：`上传到服务器.bat`
   - 会自动构建并上传文件

#### 方式 B：手动上传（备用）

1. **构建项目**：
   ```bash
   npm run build
   ```

2. **使用 SFTP 工具上传**：
   - 下载 [FileZilla](https://filezilla-project.org/) 或 [WinSCP](https://winscp.net/)
   - 连接服务器（SFTP 协议，端口 22）
   - 上传 `dist` 文件夹内容到 `/tmp/ctf-blog-dist`

3. **上传部署脚本**：
   - 上传 `deploy-nginx.sh` 到服务器的 `/tmp` 目录

### 第 3 步：在服务器上执行部署

SSH 登录服务器，执行：

```bash
# 1. 进入 /tmp 目录
cd /tmp

# 2. 编辑脚本，修改为你的域名
nano deploy-nginx.sh
# 修改：DOMAIN="your-domain.com"

# 3. 给脚本执行权限
chmod +x deploy-nginx.sh

# 4. 运行部署脚本
sudo bash deploy-nginx.sh
```

### 第 4 步：配置域名（重要）

1. **购买域名**（阿里云、腾讯云、GoDaddy 等）
2. **添加 DNS 解析记录**：
   - 类型：A 记录
   - 主机记录：@（根域名）或 www（子域名）
   - 记录值：你的服务器 IP 地址

等待 DNS 生效（通常几分钟到几小时）

### 第 5 步：配置 HTTPS（SSL 证书）

```bash
# 安装 Certbot
sudo apt install certbot python3-certbot-nginx -y

# 申请证书（自动配置 Nginx）
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# 按照提示操作，选择 redirect（自动 HTTP 跳转 HTTPS）
```

### 第 6 步：访问网站

- **HTTP**: http://your-domain.com
- **HTTPS**: https://your-domain.com ✅

---

## 📁 服务器目录结构

```
/var/www/ctf-blog/          # 网站文件
├── index.html
├── favicon.svg
└── assets/
    ├── index-xxx.js
    └── index-xxx.css

/etc/nginx/sites-available/ctf-blog   # Nginx 配置文件
/etc/nginx/sites-enabled/ctf-blog     # 配置软链接
```

---

## 🔄 后续更新网站

**方式 1：使用脚本**
```bash
# 本地运行
上传到服务器.bat
```

**方式 2：手动更新**
```bash
# 本地构建
npm run build

# 上传到服务器（替换 /var/www/ctf-blog 内容）
scp -r dist/* root@your-domain.com:/var/www/ctf-blog/
```

---

## 🛠️ 常见问题

### 1. 网站显示 404
```bash
# 检查 Nginx 配置
sudo nginx -t

# 确保路径正确
ls -la /var/www/ctf-blog/

# 重启 Nginx
sudo systemctl restart nginx
```

### 2. 刷新页面 404（Vue Router 问题）
这是正常的，因为 Vue 使用 History 模式。部署脚本已自动配置 Nginx 支持：
```nginx
try_files $uri $uri/ /index.html;
```

### 3. 域名无法访问
- 检查 DNS 解析是否生效：`ping your-domain.com`
- 检查服务器防火墙：`sudo ufw status`
- 检查云服务商安全组（控制台放行 80/443 端口）

### 4. 申请 SSL 证书失败
```bash
# 确保域名已解析到服务器
# 检查 80 端口是否开放
sudo netstat -tlnp | grep 80

# 重新申请
sudo certbot --nginx -d your-domain.com
```

---

## 📞 需要帮助？

如果遇到问题，请提供：
1. 服务器 IP/域名
2. SSH 登录方式（密码或密钥）
3. 具体的错误信息

我会帮你生成精确的部署命令！
