<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3 class="footer-title">
            <span class="logo-icon">🏴</span> CTF Blog
          </h3>
          <p class="footer-desc">
            记录我的CTF学习之路，分享网络安全技术心得。
          </p>
          <div class="social-links">
            <a href="#" class="social-link" title="GitHub">📦</a>
            <a href="#" class="social-link" title="Twitter">🐦</a>
            <a href="#" class="social-link" title="Email">📧</a>
          </div>
        </div>
        
        <div class="footer-section">
          <h4 class="footer-subtitle">快速链接</h4>
          <ul class="footer-links">
            <li><router-link to="/">🏠 首页</router-link></li>
            <li><router-link to="/articles">📝 文章</router-link></li>
            <li><router-link to="/about">👤 关于我</router-link></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4 class="footer-subtitle">CTF分类</h4>
          <ul class="footer-links">
            <li><span class="category-dot web"></span> Web安全</li>
            <li><span class="category-dot pwn"></span> Pwn</li>
            <li><span class="category-dot crypto"></span> 密码学</li>
            <li><span class="category-dot misc"></span> Misc</li>
            <li><span class="category-dot reverse"></span> 逆向工程</li>
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>© {{ currentYear }} CTF Blog. Made with 💚 for CTFers.</p>
        <p class="terminal-line">
          <span class="prompt">$</span> 
          <span class="command">echo "Happy Hacking!"</span>
          <span class="cursor">_</span>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  background: rgba(0, 0, 0, 0.3);
  border-top: 1px solid var(--border-color);
  padding: 50px 0 20px;
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
}

.footer-section {
  color: var(--text-secondary);
}

.footer-title {
  color: #fff;
  font-size: 1.3rem;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-icon {
  color: var(--primary-color);
}

.footer-desc {
  line-height: 1.8;
  margin-bottom: 20px;
}

.social-links {
  display: flex;
  gap: 15px;
}

.social-link {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--bg-card);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
}

.social-link:hover {
  background: var(--primary-color);
  transform: translateY(-3px);
}

.footer-subtitle {
  color: #fff;
  font-size: 1rem;
  margin-bottom: 15px;
}

.footer-links {
  list-style: none;
}

.footer-links li {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-links a {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: var(--primary-color);
}

.category-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.category-dot.web { background: var(--primary-color); }
.category-dot.pwn { background: var(--secondary-color); }
.category-dot.crypto { background: var(--accent-color); }
.category-dot.misc { background: #ffce54; }
.category-dot.reverse { background: #a078ff; }

.footer-bottom {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
  color: var(--text-secondary);
}

.terminal-line {
  margin-top: 10px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
}

.prompt {
  color: var(--primary-color);
}

.command {
  color: var(--accent-color);
}

.cursor {
  color: var(--primary-color);
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}
</style>
