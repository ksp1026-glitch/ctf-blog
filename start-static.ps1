# CTF Blog 静态文件服务器
$port = 8080
$distPath = "dist"

# 检查 dist 目录是否存在
if (-Not (Test-Path $distPath)) {
    Write-Host "⚠️  dist 目录不存在，先执行构建..." -ForegroundColor Yellow
    npm run build
}

Write-Host ""
Write-Host "🚀 启动静态文件服务器..." -ForegroundColor Green
Write-Host "访问地址: http://localhost:$port" -ForegroundColor Yellow
Write-Host "按 Ctrl+C 停止服务器" -ForegroundColor Gray
Write-Host ""

# 尝试使用 Python
if (Get-Command python -ErrorAction SilentlyContinue) {
    Set-Location $distPath
    python -m http.server $port
}
elseif (Get-Command python3 -ErrorAction SilentlyContinue) {
    Set-Location $distPath
    python3 -m http.server $port
}
# 尝试使用 Node.js http-server
elseif (Get-Command npx -ErrorAction SilentlyContinue) {
    Set-Location $distPath
    npx http-server -p $port
}
else {
    Write-Host "❌ 未找到可用的服务器工具" -ForegroundColor Red
    Write-Host "请安装 Python 或运行: npm install -g http-server" -ForegroundColor Yellow
    Read-Host "按回车键退出"
}
