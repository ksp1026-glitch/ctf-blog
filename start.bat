@echo off
chcp 65001 >nul
echo 🚀 启动 CTF Blog 本地服务器...
echo.
echo 访问地址: http://localhost:5173
echo 按 Ctrl+C 停止服务器
echo.
npm run dev
pause
