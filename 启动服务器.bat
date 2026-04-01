@echo off
chcp 65001 >nul
cd /d "%~dp0dist"
start http://localhost:8888
python -m http.server 8888
pause
