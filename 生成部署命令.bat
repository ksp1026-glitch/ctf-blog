@echo off
chcp 65001 >nul
echo ==========================================
echo 🚀 Nginx 部署命令生成器
echo ==========================================
echo.

set /p SERVER_IP="请输入服务器 IP 或域名: "
set /p USERNAME="请输入 SSH 用户名 (如 root): "
set /p DOMAIN="请输入网站域名 (如 ctfblog.example.com): "

echo.
echo ==========================================
echo 📋 请按照以下步骤操作：
echo ==========================================
echo.

echo 【步骤 1】在服务器上运行以下命令安装 Nginx：
echo --------------------------------------------------
echo ssh %USERNAME%@%SERVER_IP%
echo sudo apt update ^&^& sudo apt install nginx -y
echo --------------------------------------------------
echo.

echo 【步骤 2】构建并上传网站文件：
echo --------------------------------------------------
echo npm run build
echo scp -r dist/* %USERNAME%@%SERVER_IP%:/var/www/%DOMAIN%/
echo --------------------------------------------------
echo.

echo 【步骤 3】SSH 登录服务器配置 Nginx：
echo --------------------------------------------------
echo ssh %USERNAME%@%SERVER_IP%
echo.
echo # 创建网站目录
echo sudo mkdir -p /var/www/%DOMAIN%
echo sudo chown -R $USER:$USER /var/www/%DOMAIN%
echo.
echo # 创建 Nginx 配置
echo sudo tee /etc/nginx/sites-available/%DOMAIN% ^> /dev/null ^<^< 'EOF'
echo server {
echo     listen 80;
echo     server_name %DOMAIN% www.%DOMAIN%;
echo     root /var/www/%DOMAIN%;
echo     index index.html;
echo     
echo     location / {
echo         try_files $uri $uri/ /index.html;
echo     }
echo }
echo EOF
echo.
echo # 启用网站
echo sudo ln -sf /etc/nginx/sites-available/%DOMAIN% /etc/nginx/sites-enabled/
echo sudo nginx -t
echo sudo systemctl restart nginx
echo --------------------------------------------------
echo.

echo 【步骤 4】配置 HTTPS（SSL）：
echo --------------------------------------------------
echo ssh %USERNAME%@%SERVER_IP%
echo sudo apt install certbot python3-certbot-nginx -y
echo sudo certbot --nginx -d %DOMAIN%
echo --------------------------------------------------
echo.

echo ==========================================
echo 🎉 部署完成后访问：
echo    http://%DOMAIN%
echo    https://%DOMAIN% (配置 SSL 后)
echo ==========================================
echo.

pause
