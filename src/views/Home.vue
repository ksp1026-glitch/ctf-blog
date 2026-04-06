<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content animate-fade-in">
          <div class="hero-badge">
            <span class="badge-icon">🚩</span>
            <span>CTF学习者</span>
          </div>
          <h1 class="hero-title">
            Welcome to My
            <span class="gradient-text">CTF Journey</span>
          </h1>
          <p class="hero-subtitle">
            记录网络安全学习历程，分享CTF解题思路与技术心得
          </p>
          <div class="hero-stats">
            <div class="stat-item">
              <span class="stat-number">{{ stats.articles }}</span>
              <span class="stat-label">文章</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ stats.categories }}</span>
              <span class="stat-label">分类</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ stats.ctfs }}</span>
              <span class="stat-label">学习</span>
            </div>
          </div>
          <div class="hero-actions">
            <router-link to="/articles" class="btn btn-primary">
              开始阅读 🚀
            </router-link>
            <router-link to="/about" class="btn btn-secondary">
              了解更多
            </router-link>
          </div>
        </div>
        <div class="hero-visual">
          <div class="code-window">
            <div class="window-header">
              <span class="window-dot red"></span>
              <span class="window-dot yellow"></span>
              <span class="window-dot green"></span>
              <span class="window-title">flag.txt</span>
            </div>
            <div class="window-content">
              <pre><code>{{ typingText }}<span class="typing-cursor">|</span></code></pre>
            </div>
          </div>
        </div>
      </div>
      <div class="scroll-indicator">
        <span>向下滚动</span>
        <div class="scroll-arrow"></div>
      </div>
    </section>

    <!-- Featured Articles -->
    <section class="featured">
      <div class="container">
        <h2 class="section-title">🔥 精选文章</h2>
        <div class="articles-grid">
          <article 
            v-for="article in featuredArticles" 
            :key="article.id"
            class="article-card card"
            @click="goToArticle(article.id)"
          >
            <div class="article-header">
              <span :class="['tag', 'tag-' + article.category]">
                {{ getCategoryName(article.category) }}
              </span>
              <span class="article-date">{{ article.date }}</span>
            </div>
            <h3 class="article-title">{{ article.title }}</h3>
            <p class="article-excerpt">{{ article.excerpt }}</p>
            <div class="article-footer">
              <span class="read-time">⏱️ {{ article.readTime }}分钟阅读</span>
              <span class="read-more">阅读全文 →</span>
            </div>
          </article>
        </div>
        <div class="view-all">
          <router-link to="/articles" class="btn btn-secondary">
            查看全部文章
          </router-link>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="skills">
      <div class="container">
        <h2 class="section-title">🎯 技能矩阵</h2>
        <div class="skills-grid">
          <div 
            v-for="skill in skills" 
            :key="skill.name"
            class="skill-card card"
          >
            <div class="skill-icon">{{ skill.icon }}</div>
            <h3 class="skill-name">{{ skill.name }}</h3>
            <div class="skill-level">
              <div class="skill-bar">
                <div 
                  class="skill-progress" 
                  :style="{ width: skill.level + '%' }"
                ></div>
              </div>
              <span class="skill-percent">{{ skill.level }}%</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTF Timeline -->
    <section class="timeline">
      <div class="container">
        <h2 class="section-title">📚 CTF学习之路</h2>
        <div class="timeline-list">
          <div 
            v-for="(event, index) in ctfEvents" 
            :key="index"
            class="timeline-item"
          >
            <div class="timeline-marker">
              <span class="timeline-icon">{{ event.icon }}</span>
            </div>
            <div class="timeline-content card">
              <div class="timeline-header">
                <h4>{{ event.name }}</h4>
                <span class="timeline-date">{{ event.date }}</span>
              </div>
              <p>{{ event.description }}</p>
              <div class="timeline-tags">
                <span v-for="tag in event.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getFeaturedArticles, getSkills, getCtfEvents } from '../utils/data'

const router = useRouter()
const stats = ref({ articles: 12, categories: 5, ctfs: 3 })
const featuredArticles = ref([])
const skills = ref([])
const ctfEvents = ref([])
const typingText = ref('')
const fullText = 'flag{welcome_to_my_ctf_blog}'

const getCategoryName = (category) => {
  const names = {
    web: 'Web',
    pwn: 'Pwn',
    crypto: 'Crypto',
    misc: 'Misc',
    reverse: 'Reverse'
  }
  return names[category] || category
}

const goToArticle = (id) => {
  router.push(`/article/${id}`)
}

// 打字机效果
const typeWriter = () => {
  let i = 0
  const typing = setInterval(() => {
    if (i < fullText.length) {
      typingText.value += fullText.charAt(i)
      i++
    } else {
      clearInterval(typing)
      setTimeout(() => {
        typingText.value = ''
        typeWriter()
      }, 3000)
    }
  }, 100)
}

onMounted(() => {
  featuredArticles.value = getFeaturedArticles()
  skills.value = getSkills()
  ctfEvents.value = getCtfEvents()
  typeWriter()
})
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  padding: 100px 0;
}

.hero .container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid var(--primary-color);
  border-radius: 20px;
  color: var(--primary-color);
  font-size: 0.9rem;
  margin-bottom: 20px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 20px;
  color: #fff;
}

.gradient-text {
  background: var(--gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 30px;
  line-height: 1.8;
}

.hero-stats {
  display: flex;
  gap: 40px;
  margin-bottom: 30px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--primary-color);
  font-family: 'Fira Code', monospace;
}

.stat-label {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.hero-actions {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

/* Code Window */
.code-window {
  background: var(--bg-card);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  border: 1px solid var(--border-color);
}

.window-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.3);
}

.window-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.window-dot.red { background: #ff5f56; }
.window-dot.yellow { background: #ffbd2e; }
.window-dot.green { background: #27c93f; }

.window-title {
  margin-left: 10px;
  color: var(--text-secondary);
  font-size: 0.85rem;
}

.window-content {
  padding: 20px;
  font-family: 'Fira Code', monospace;
  font-size: 1.1rem;
}

.window-content code {
  color: var(--primary-color);
}

.typing-cursor {
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.85rem;
}

.scroll-arrow {
  width: 20px;
  height: 20px;
  border-right: 2px solid var(--primary-color);
  border-bottom: 2px solid var(--primary-color);
  transform: rotate(45deg);
  margin: 10px auto 0;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0) rotate(45deg); }
  40% { transform: translateY(-10px) rotate(45deg); }
  60% { transform: translateY(-5px) rotate(45deg); }
}

/* Featured Articles */
.featured {
  padding: 80px 0;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.article-card {
  cursor: pointer;
}

.article-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.article-date {
  color: var(--text-secondary);
  font-size: 0.85rem;
}

.article-title {
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: #fff;
  transition: color 0.3s ease;
}

.article-card:hover .article-title {
  color: var(--primary-color);
}

.article-excerpt {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.read-time {
  color: var(--text-secondary);
  font-size: 0.85rem;
}

.read-more {
  color: var(--primary-color);
  font-size: 0.9rem;
  font-weight: 500;
}

.view-all {
  text-align: center;
}

/* Skills */
.skills {
  padding: 80px 0;
  background: rgba(0, 0, 0, 0.2);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}

.skill-card {
  text-align: center;
}

.skill-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.skill-name {
  color: #fff;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.skill-level {
  display: flex;
  align-items: center;
  gap: 15px;
}

.skill-bar {
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: var(--gradient-1);
  border-radius: 4px;
  transition: width 1s ease;
}

.skill-percent {
  color: var(--primary-color);
  font-weight: bold;
  font-family: 'Fira Code', monospace;
  min-width: 45px;
}

/* Timeline */
.timeline {
  padding: 80px 0;
}

.timeline-list {
  position: relative;
  padding-left: 40px;
}

.timeline-list::before {
  content: '';
  position: absolute;
  left: 15px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--gradient-1);
}

.timeline-item {
  position: relative;
  margin-bottom: 30px;
}

.timeline-marker {
  position: absolute;
  left: -33px;
  top: 0;
  width: 30px;
  height: 30px;
  background: var(--bg-card);
  border: 2px solid var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

.timeline-content {
  padding: 20px;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.timeline-header h4 {
  color: #fff;
  font-size: 1.1rem;
}

.timeline-date {
  color: var(--primary-color);
  font-size: 0.85rem;
  font-family: 'Fira Code', monospace;
}

.timeline-content p {
  color: var(--text-secondary);
  margin-bottom: 10px;
  line-height: 1.6;
}

.timeline-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

@media (max-width: 968px) {
  .hero .container {
    grid-template-columns: 1fr;
  }
  
  .hero-visual {
    order: -1;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .articles-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-stats {
    gap: 20px;
  }
  
  .stat-number {
    font-size: 2rem;
  }
}
</style>
