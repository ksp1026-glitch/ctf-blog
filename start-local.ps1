# CTF Blog 本地启动脚本
Write-Host "🚀 启动 CTF Blog 本地服务器..." -ForegroundColor Green

# 方式1: 使用 Vite 开发服务器 (推荐开发使用)
Write-Host ""
Write-Host "方式1: Vite 开发服务器 (热更新)" -ForegroundColor Cyan
Write-Host "访问地址: http://localhost:5173" -ForegroundColor Yellow
Write-Host "按 Ctrl+C 停止服务器" -ForegroundColor Gray
Write-Host ""
npm run dev -- --host
