@echo off
chcp 65001 >nul
echo 🚀 正在打开 CTF Blog...
echo.

:: 检查 dist 目录
if not exist "dist\index.html" (
    echo ⚠️  未找到构建文件，先执行构建...
    call npm run build
)

:: 直接用浏览器打开
echo 📂 正在打开网站...
start "" "dist\index.html"
echo.
echo ✅ 已打开！如果显示不正常，请使用以下方式：
echo    方式1: 双击 start-static.ps1 启动本地服务器
echo    方式2: 在 dist 目录运行 python -m http.server 8080
echo.
pause
