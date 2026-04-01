@echo off
chcp 65001 >nul
echo 🚀 正在启动 CTF Blog...
echo.
cd /d "%~dp0dist"
echo 📁 服务目录: %cd%
echo 🌐 访问地址: http://localhost:8080
echo.
echo 正在启动服务器，请稍候...
python -m http.server 8080 >nul 2>&1
if errorlevel 1 (
    echo ❌ 启动失败，请检查 Python 是否安装
    pause
)
