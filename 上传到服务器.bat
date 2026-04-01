@echo off
chcp 65001 >nul
echo ==========================================
echo 🚀 CTF Blog 服务器部署工具
echo ==========================================
echo.

REM 请修改以下配置为你的服务器信息
set SERVER_IP=your-server-ip.com
set USERNAME=root
set REMOTE_PATH=/tmp/ctf-blog-dist

if "%SERVER_IP%"=="your-server-ip.com" (
    echo ❌ 请先编辑此文件，设置你的服务器信息！
    echo.
    echo 请修改以下变量：
    echo   SERVER_IP=你的服务器IP或域名
    echo   USERNAME=你的SSH用户名
    echo   REMOTE_PATH=/var/www/ctf-blog ^(或 /tmp/ctf-blog-dist^)
    pause
    exit /b 1
)

echo 📦 正在构建项目...
cd /d "%~dp0"
call npm run build
if errorlevel 1 (
    echo ❌ 构建失败！
    pause
    exit /b 1
)

echo.
echo 📁 正在打包文件...
if exist "..\ctf-blog-deploy.zip" del "..\ctf-blog-deploy.zip"
powershell -Command "Compress-Archive -Path 'dist\*' -DestinationPath '..\ctf-blog-deploy.zip' -Force"

echo.
echo 🌐 上传到服务器 %USERNAME%@%SERVER_IP%...
echo 目标路径: %REMOTE_PATH%
echo.
echo ⚠️  请输入服务器密码...

REM 使用 scp 上传
scp -r dist\* %USERNAME%@%SERVER_IP%:%REMOTE_PATH%

if errorlevel 1 (
    echo.
    echo ❌ 上传失败！请检查：
    echo   1. 服务器地址和用户名是否正确
    echo   2. SSH 服务是否已启动
    echo   3. 密码是否正确
    echo   4. 或者使用 SFTP 工具手动上传
    pause
    exit /b 1
)

echo.
echo ✅ 文件上传成功！
echo.
echo 📋 接下来请在服务器上运行：
echo   cd /tmp
echo   sudo bash deploy-nginx.sh
echo.
pause
