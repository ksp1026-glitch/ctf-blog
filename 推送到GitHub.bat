@echo off
chcp 65001 >nul
echo ==========================================
echo 🚀 推送到 GitHub
echo ==========================================
echo.

set /p USERNAME="请输入你的 GitHub 用户名: "

echo.
echo 正在设置远程仓库...
git branch -M main
git remote add origin https://github.com/%USERNAME%/ctf-blog.git

echo.
echo 正在推送代码...
git push -u origin main

echo.
if %errorlevel% == 0 (
    echo ✅ 推送成功！
    echo.
    echo 接下来：
    echo 1. 打开 https://github.com/%USERNAME%/ctf-blog
echo 2. 点击 Settings ^> Pages
echo 3. Source 选择 "GitHub Actions"
    echo 4. 等待 Actions 运行完成
    echo 5. 访问：https://%USERNAME%.github.io/ctf-blog
) else (
    echo ❌ 推送失败！
    echo.
    echo 可能的原因：
    echo - 仓库名不是 ctf-blog
echo - 用户名输入错误
echo - 未登录 GitHub 账号
echo.
    echo 你可以手动运行：
    echo git remote add origin https://github.com/你的用户名/ctf-blog.git
    echo git push -u origin main
)

pause
