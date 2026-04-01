#!/bin/bash
# CTF Blog Nginx 部署脚本（在服务器上运行）

echo "🚀 开始部署 CTF Blog..."

# 配置变量（请根据实际情况修改）
DOMAIN="your-domain.com"  # 你的域名
EMAIL="your-email@example.com"  # 用于 SSL 证书

# 1. 更新系统
echo "📦 更新系统..."
sudo apt update && sudo apt upgrade -y

# 2. 安装 Nginx
echo "🌐 安装 Nginx..."
sudo apt install nginx -y

# 3. 创建网站目录
echo "📁 创建网站目录..."
sudo mkdir -p /var/www/ctf-blog
sudo chown -R $USER:$USER /var/www/ctf-blog
sudo chmod -R 755 /var/www/ctf-blog

# 4. 复制网站文件（假设文件已上传到 /tmp/ctf-blog-dist）
echo "📂 复制网站文件..."
if [ -d "/tmp/ctf-blog-dist" ]; then
    cp -r /tmp/ctf-blog-dist/* /var/www/ctf-blog/
else
    echo "⚠️  请将网站文件上传到 /tmp/ctf-blog-dist 目录"
    exit 1
fi

# 5. 创建 Nginx 配置
echo "⚙️  配置 Nginx..."
sudo tee /etc/nginx/sites-available/ctf-blog > /dev/null << 'EOF'
server {
    listen 80;
    listen [::]:80;
    
    # 域名配置
    server_name your-domain.com www.your-domain.com;
    
    # 网站根目录
    root /var/www/ctf-blog;
    index index.html;
    
    # 日志
    access_log /var/log/nginx/ctf-blog.access.log;
    error_log /var/log/nginx/ctf-blog.error.log;
    
    # 静态文件缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # 前端路由支持（Vue Router History 模式）
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
EOF

# 替换域名
sudo sed -i "s/your-domain.com/$DOMAIN/g" /etc/nginx/sites-available/ctf-blog

# 6. 启用网站
echo "✅ 启用网站..."
sudo ln -sf /etc/nginx/sites-available/ctf-blog /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# 7. 测试配置
echo "🧪 测试 Nginx 配置..."
sudo nginx -t

# 8. 重启 Nginx
echo "🔄 重启 Nginx..."
sudo systemctl restart nginx
sudo systemctl enable nginx

# 9. 配置防火墙
echo "🔥 配置防火墙..."
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw --force enable

echo ""
echo "=========================================="
echo "🎉 部署完成！"
echo "🌐 访问地址: http://$DOMAIN"
echo "=========================================="
echo ""
echo "📋 后续操作："
echo "1. 确保域名 DNS 指向服务器 IP"
echo "2. 如需 HTTPS，运行: sudo certbot --nginx -d $DOMAIN"
echo "=========================================="
