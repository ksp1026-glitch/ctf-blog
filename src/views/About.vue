<template>
  <div class="about-page">
    <div class="container">
      <!-- Hero Section -->
      <section class="about-hero animate-fade-in">
        <div class="profile-card card">
          <div class="profile-avatar">
            <span class="avatar-text">🏴</span>
            <div class="avatar-glow"></div>
          </div>
          <div class="profile-info">
            <h1 class="profile-name">CTF Learner</h1>
            <p class="profile-title">网络安全爱好者 | CTF小白</p>
            <div class="profile-stats">
              <div class="stat">
                <span class="stat-value">{{ stats.articles }}</span>
                <span class="stat-label">文章</span>
              </div>
              <div class="stat">
                <span class="stat-value">{{ stats.ctfs }}</span>
                <span class="stat-label">学习阶段</span>
              </div>
              <div class="stat">
                <span class="stat-value">{{ stats.learningDays }}</span>
                <span class="stat-label">学习天数</span>
              </div>
            </div>
            <div class="profile-links">
              <a href="#" class="social-link" title="GitHub">
                <span>📦</span> GitHub
              </a>
              <a href="#" class="social-link" title="Email">
                <span>📧</span> Email
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- About Content -->
      <div class="about-grid">
        <!-- Bio -->
        <section class="about-section card animate-fade-in">
          <h2 class="section-title">👤 关于我</h2>
          <div class="bio-content">
            <p>你好！我是一名正在学习网络安全和CTF（Capture The Flag）的小白。</p>
            <p>创建这个博客是为了：</p>
            <ul>
              <li>📝 记录学习过程中的知识点</li>
              <li>🔍 整理CTF题目的解题思路</li>
              <li>📚 分享学习资源和技术心得</li>
              <li>🤝 结识更多安全圈的朋友</li>
            </ul>
            <p>如果你也是CTF学习者，欢迎一起交流！</p>
          </div>
        </section>

        <!-- Skills Radar -->
        <section class="about-section card animate-fade-in">
          <h2 class="section-title">🎯 技能分布</h2>
          <div class="skills-chart">
            <div 
              v-for="skill in skills" 
              :key="skill.name"
              class="chart-item"
            >
              <div class="chart-label">
                <span class="chart-icon">{{ skill.icon }}</span>
                <span>{{ skill.name }}</span>
              </div>
              <div class="chart-bar">
                <div 
                  class="chart-progress" 
                  :style="{ width: skill.level + '%' }"
                ></div>
              </div>
              <span class="chart-value">{{ skill.level }}%</span>
            </div>
          </div>
        </section>

        <!-- Learning Path -->
        <section class="about-section card animate-fade-in">
          <h2 class="section-title">🛤️ 学习路线</h2>
          <div class="timeline-mini">
            <div 
              v-for="(step, index) in learningPath" 
              :key="index"
              class="timeline-step"
              :class="{ completed: step.completed, current: step.current }"
            >
              <div class="step-marker">
                <span v-if="step.completed">✓</span>
                <span v-else-if="step.current">●</span>
                <span v-else>○</span>
              </div>
              <div class="step-content">
                <h4>{{ step.title }}</h4>
                <p>{{ step.desc }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Tools -->
        <section class="about-section card animate-fade-in">
          <h2 class="section-title">🛠️ 常用工具</h2>
          <div class="tools-grid">
            <div 
              v-for="tool in tools" 
              :key="tool.name"
              class="tool-item"
            >
              <span class="tool-icon">{{ tool.icon }}</span>
              <div class="tool-info">
                <h4>{{ tool.name }}</h4>
                <p>{{ tool.desc }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Contact CTA -->
      <section class="contact-cta card animate-fade-in">
        <div class="cta-content">
          <h2>💬 想和我一起学习？</h2>
          <p>欢迎通过邮件或GitHub与我交流，共同进步！</p>
          <div class="cta-buttons">
            <a href="mailto:your.email@example.com" class="btn btn-primary">
              📧 发送邮件
            </a>
            <a href="#" class="btn btn-secondary">
              📦 GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const stats = ref({
  articles: 12,
  ctfs: 3,
  learningDays: 180
})

const skills = [
  { name: 'Web安全', icon: '🌐', level: 65 },
  { name: '密码学', icon: '🔐', level: 45 },
  { name: 'Misc', icon: '📦', level: 40 },
  { name: '逆向工程', icon: '🔧', level: 30 },
  { name: 'Pwn', icon: '💥', level: 20 }
]

const learningPath = [
  { title: '基础知识', desc: '网络基础、Linux、Python', completed: true },
  { title: 'Web安全入门', desc: 'SQL注入、XSS、CSRF', completed: true },
  { title: '加密与编码', desc: '常见编码、古典密码', completed: true },
  { title: '进阶学习', desc: '反序列化、SSRF、提权', current: true },
  { title: '二进制安全', desc: '逆向分析、漏洞利用', completed: false },
  { title: '持续精进', desc: '实战演练、漏洞研究', completed: false }
]

const tools = [
  { name: 'Burp Suite', icon: '🕷️', desc: 'Web渗透测试神器' },
  { name: 'Python', icon: '🐍', desc: '自动化脚本编写' },
  { name: 'IDA Pro', icon: '🔍', desc: '逆向分析工具' },
  { name: 'GDB', icon: '🐛', desc: '调试工具' },
  { name: 'CyberChef', icon: '👨‍🍳', desc: '编码转换工具' },
  { name: 'Wireshark', icon: '🦈', desc: '网络抓包分析' }
]
</script>

<style scoped>
.about-page {
  padding: 100px 0 60px;
  min-height: 100vh;
}

/* Hero */
.about-hero {
  margin-bottom: 50px;
}

.profile-card {
  display: flex;
  align-items: center;
  gap: 50px;
  padding: 50px;
  max-width: 800px;
  margin: 0 auto;
}

.profile-avatar {
  position: relative;
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-text {
  font-size: 5rem;
  z-index: 1;
}

.avatar-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--gradient-1);
  border-radius: 50%;
  filter: blur(30px);
  opacity: 0.3;
  animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.1); opacity: 0.5; }
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 10px;
}

.profile-title {
  color: var(--primary-color);
  font-size: 1.1rem;
  margin-bottom: 25px;
}

.profile-stats {
  display: flex;
  gap: 40px;
  margin-bottom: 25px;
}

.stat {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  color: var(--primary-color);
  font-family: 'Fira Code', monospace;
}

.stat-label {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.profile-links {
  display: flex;
  gap: 15px;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

/* Grid */
.about-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-bottom: 40px;
}

.about-section {
  padding: 30px;
}

.about-section .section-title {
  font-size: 1.4rem;
  margin-bottom: 25px;
}

/* Bio */
.bio-content {
  color: var(--text-secondary);
  line-height: 1.8;
}

.bio-content p {
  margin-bottom: 15px;
}

.bio-content ul {
  margin: 15px 0;
  padding-left: 20px;
}

.bio-content li {
  margin-bottom: 8px;
}

/* Skills Chart */
.skills-chart {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.chart-item {
  display: flex;
  align-items: center;
  gap: 15px;
}

.chart-label {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 100px;
  color: #fff;
}

.chart-icon {
  font-size: 1.3rem;
}

.chart-bar {
  flex: 1;
  height: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  overflow: hidden;
}

.chart-progress {
  height: 100%;
  background: var(--gradient-1);
  border-radius: 5px;
  transition: width 1s ease;
}

.chart-value {
  min-width: 45px;
  text-align: right;
  color: var(--primary-color);
  font-family: 'Fira Code', monospace;
  font-weight: bold;
}

/* Timeline */
.timeline-mini {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.timeline-step {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 15px;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.timeline-step.completed {
  background: rgba(0, 255, 136, 0.05);
}

.timeline-step.current {
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid var(--primary-color);
}

.step-marker {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.timeline-step.completed .step-marker {
  background: var(--primary-color);
  color: #0f0f23;
}

.timeline-step.current .step-marker {
  background: transparent;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  animation: pulse-dot 2s infinite;
}

.timeline-step:not(.completed):not(.current) .step-marker {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-secondary);
}

@keyframes pulse-dot {
  0%, 100% { box-shadow: 0 0 0 0 rgba(0, 255, 136, 0.4); }
  50% { box-shadow: 0 0 0 10px rgba(0, 255, 136, 0); }
}

.step-content h4 {
  color: #fff;
  margin-bottom: 5px;
  font-size: 1rem;
}

.step-content p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

/* Tools */
.tools-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.tool-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.tool-item:hover {
  background: rgba(0, 255, 136, 0.05);
  transform: translateX(5px);
}

.tool-icon {
  font-size: 1.8rem;
}

.tool-info h4 {
  color: #fff;
  font-size: 0.95rem;
  margin-bottom: 3px;
}

.tool-info p {
  color: var(--text-secondary);
  font-size: 0.85rem;
}

/* Contact CTA */
.contact-cta {
  text-align: center;
  padding: 50px;
  max-width: 600px;
  margin: 0 auto;
}

.cta-content h2 {
  color: #fff;
  font-size: 1.8rem;
  margin-bottom: 15px;
}

.cta-content p {
  color: var(--text-secondary);
  margin-bottom: 25px;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

/* 平板响应式 */
@media (max-width: 968px) {
  .about-page {
    padding: 90px 0 50px;
  }
  
  .profile-card {
    flex-direction: column;
    text-align: center;
    padding: 40px;
    gap: 30px;
  }
  
  .profile-avatar {
    width: 120px;
    height: 120px;
  }
  
  .avatar-text {
    font-size: 4rem;
  }
  
  .profile-name {
    font-size: 2rem;
  }
  
  .profile-stats {
    justify-content: center;
  }
  
  .profile-links {
    justify-content: center;
  }
  
  .about-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .about-section {
    padding: 25px;
  }
  
  .chart-label {
    min-width: 90px;
    font-size: 0.9rem;
  }
}

/* 手机 */
@media (max-width: 768px) {
  .about-page {
    padding: 80px 0 40px;
  }
  
  .about-hero {
    margin-bottom: 30px;
  }
  
  .profile-card {
    padding: 30px 20px;
  }
  
  .profile-avatar {
    width: 100px;
    height: 100px;
  }
  
  .avatar-text {
    font-size: 3rem;
  }
  
  .profile-name {
    font-size: 1.6rem;
  }
  
  .profile-title {
    font-size: 1rem;
    margin-bottom: 20px;
  }
  
  .profile-stats {
    gap: 25px;
    margin-bottom: 20px;
  }
  
  .stat-value {
    font-size: 1.5rem;
  }
  
  .stat-label {
    font-size: 0.8rem;
  }
  
  .profile-links {
    flex-direction: column;
    gap: 10px;
  }
  
  .social-link {
    justify-content: center;
  }
  
  .about-section {
    padding: 20px;
  }
  
  .about-section .section-title {
    font-size: 1.2rem;
    margin-bottom: 18px;
  }
  
  .bio-content {
    font-size: 0.95rem;
  }
  
  .bio-content ul {
    padding-left: 18px;
  }
  
  .skills-chart {
    gap: 15px;
  }
  
  .chart-item {
    gap: 10px;
  }
  
  .chart-label {
    min-width: 80px;
    font-size: 0.85rem;
  }
  
  .chart-icon {
    font-size: 1.1rem;
  }
  
  .chart-bar {
    height: 8px;
  }
  
  .chart-value {
    font-size: 0.85rem;
    min-width: 35px;
  }
  
  .timeline-mini {
    gap: 10px;
  }
  
  .timeline-step {
    padding: 12px;
    gap: 12px;
  }
  
  .step-marker {
    width: 24px;
    height: 24px;
    font-size: 0.75rem;
  }
  
  .step-content h4 {
    font-size: 0.95rem;
  }
  
  .step-content p {
    font-size: 0.85rem;
  }
  
  .tools-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  
  .tool-item {
    padding: 12px;
  }
  
  .tool-icon {
    font-size: 1.5rem;
  }
  
  .tool-info h4 {
    font-size: 0.9rem;
  }
  
  .tool-info p {
    font-size: 0.8rem;
  }
  
  .contact-cta {
    padding: 30px 20px;
  }
  
  .cta-content h2 {
    font-size: 1.4rem;
  }
  
  .cta-content p {
    font-size: 0.9rem;
    margin-bottom: 20px;
  }
  
  .cta-buttons {
    flex-direction: column;
    gap: 10px;
  }
  
  .cta-buttons .btn {
    width: 100%;
  }
}

/* 超小屏幕 */
@media (max-width: 480px) {
  .about-page {
    padding: 70px 0 30px;
  }
  
  .profile-card {
    padding: 25px 15px;
  }
  
  .profile-avatar {
    width: 80px;
    height: 80px;
  }
  
  .avatar-text {
    font-size: 2.5rem;
  }
  
  .profile-name {
    font-size: 1.4rem;
  }
  
  .profile-title {
    font-size: 0.9rem;
  }
  
  .profile-stats {
    gap: 15px;
  }
  
  .stat-value {
    font-size: 1.3rem;
  }
  
  .about-section {
    padding: 18px;
  }
  
  .about-section .section-title {
    font-size: 1.1rem;
  }
  
  .bio-content {
    font-size: 0.9rem;
  }
  
  .chart-label {
    min-width: 75px;
    font-size: 0.8rem;
  }
  
  .chart-value {
    font-size: 0.8rem;
  }
  
  .contact-cta {
    padding: 25px 15px;
  }
  
  .cta-content h2 {
    font-size: 1.2rem;
  }
  
  .cta-content p {
    font-size: 0.85rem;
  }
}
</style>
