#!/usr/bin/env node

/**
 * CTF Blog 部署脚本
 * 
 * 使用方法:
 * 1. 配置下方的服务器信息
 * 2. 运行 npm run deploy
 * 
 * 支持多种部署方式：
 * - SCP/SFTP 上传到远程服务器
 * - 本地复制到指定目录
 * - GitHub Pages 部署
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

// ==================== 配置区域 ====================

// 部署方式: 'scp' | 'local' | 'gh-pages'
const DEPLOY_METHOD = 'local'

// SCP部署配置（如果使用scp方式）
const SCP_CONFIG = {
  host: 'your-server.com',
  username: 'root',
  port: 22,
  // 使用密钥或密码认证
  privateKey: '~/.ssh/id_rsa',
  // password: 'your-password',
  remotePath: '/var/www/ctf-blog'
}

// 本地部署配置（如果使用local方式）
const LOCAL_CONFIG = {
  targetPath: '../ctf-blog-dist'
}

// GitHub Pages 配置
const GH_PAGES_CONFIG = {
  repo: 'https://github.com/yourusername/ctf-blog.git',
  branch: 'gh-pages'
}

// ==================== 部署函数 ====================

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m'
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function exec(command, options = {}) {
  try {
    return execSync(command, { stdio: 'inherit', ...options })
  } catch (error) {
    log(`命令执行失败: ${command}`, 'red')
    process.exit(1)
  }
}

// SCP 部署
function deploySCP() {
  log('📦 使用 SCP 部署到远程服务器...', 'blue')
  
  const { host, username, port, privateKey, password, remotePath } = SCP_CONFIG
  
  // 构建scp命令
  let scpCmd = `scp -P ${port} -r dist/* ${username}@${host}:${remotePath}`
  
  if (privateKey) {
    scpCmd = `scp -P ${port} -i ${privateKey} -r dist/* ${username}@${host}:${remotePath}`
  }
  
  log(`执行: ${scpCmd}`, 'yellow')
  exec(scpCmd)
  
  log('✅ SCP 部署完成！', 'green')
}

// 本地部署
function deployLocal() {
  const { targetPath } = LOCAL_CONFIG
  const absolutePath = path.resolve(targetPath)
  
  log(`📦 部署到本地目录: ${absolutePath}`, 'blue')
  
  // 确保目标目录存在
  if (!fs.existsSync(absolutePath)) {
    fs.mkdirSync(absolutePath, { recursive: true })
  }
  
  // 清空目标目录
  const files = fs.readdirSync(absolutePath)
  for (const file of files) {
    const filePath = path.join(absolutePath, file)
    fs.rmSync(filePath, { recursive: true, force: true })
  }
  
  // 复制dist内容
  if (process.platform === 'win32') {
    // Windows
    exec(`xcopy dist\\* "${absolutePath}" /s /e /y /q`)
  } else {
    // Linux/Mac
    exec(`cp -r dist/* ${absolutePath}/`)
  }
  
  log('✅ 本地部署完成！', 'green')
  log(`📁 部署目录: ${absolutePath}`, 'yellow')
  
  // 生成一个简单的启动脚本
  const serverScript = process.platform === 'win32' 
    ? 'start-server.bat'
    : 'start-server.sh'
    
  const serverContent = process.platform === 'win32'
    ? `@echo off
echo Starting CTF Blog server...
cd /d "${absolutePath}"
python -m http.server 8080
pause`
    : `#!/bin/bash
echo "Starting CTF Blog server..."
cd "${absolutePath}"
python3 -m http.server 8080`

  fs.writeFileSync(path.join(absolutePath, '..', serverScript), serverContent)
  
  if (process.platform !== 'win32') {
    exec(`chmod +x ${path.join(absolutePath, '..', serverScript)}`)
  }
  
  log(`🚀 启动脚本已生成: ${serverScript}`, 'green')
  log('   运行该脚本即可在 http://localhost:8080 访问网站', 'yellow')
}

// GitHub Pages 部署
function deployGhPages() {
  log('📦 部署到 GitHub Pages...', 'blue')
  
  const { repo, branch } = GH_PAGES_CONFIG
  
  // 创建临时目录
  const tempDir = '.gh-pages-temp'
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true })
  }
  
  // 克隆gh-pages分支
  exec(`git clone -b ${branch} ${repo} ${tempDir} 2>nul || git clone ${repo} ${tempDir}`)
  
  // 复制dist内容
  fs.rmSync(tempDir, { recursive: true })
  fs.mkdirSync(tempDir)
  
  if (process.platform === 'win32') {
    exec(`xcopy dist\\* ${tempDir}\\ /s /e /y /q`)
  } else {
    exec(`cp -r dist/* ${tempDir}/`)
  }
  
  // 创建.nojekyll文件
  fs.writeFileSync(path.join(tempDir, '.nojekyll'), '')
  
  // 提交到gh-pages
  exec('git add .', { cwd: tempDir })
  exec('git commit -m "Deploy to GitHub Pages"', { cwd: tempDir })
  exec(`git push origin ${branch}`, { cwd: tempDir })
  
  // 清理
  fs.rmSync(tempDir, { recursive: true })
  
  log('✅ GitHub Pages 部署完成！', 'green')
  log(`🌐 访问地址: https://yourusername.github.io/ctf-blog`, 'yellow')
}

// ==================== 主程序 ====================

function main() {
  log('🚀 CTF Blog 部署脚本', 'green')
  log('=' .repeat(40), 'green')
  
  // 检查dist目录是否存在
  if (!fs.existsSync('dist')) {
    log('❌ 错误: dist 目录不存在，请先运行 npm run build', 'red')
    process.exit(1)
  }
  
  // 根据配置选择部署方式
  switch (DEPLOY_METHOD) {
    case 'scp':
      deploySCP()
      break
    case 'local':
      deployLocal()
      break
    case 'gh-pages':
      deployGhPages()
      break
    default:
      log(`❌ 未知的部署方式: ${DEPLOY_METHOD}`, 'red')
      process.exit(1)
  }
  
  log('=' .repeat(40), 'green')
  log('🎉 部署完成！', 'green')
}

main()
