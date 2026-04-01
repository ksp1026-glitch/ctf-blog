<template>
  <div class="article-detail">
    <div class="container">
      <!-- Loading State -->
      <div v-if="!article" class="loading">
        <div class="loading-spinner"></div>
        <p>加载中...</p>
      </div>

      <template v-else>
        <!-- Article Header -->
        <header class="article-header animate-fade-in">
          <router-link to="/articles" class="back-link">
            ← 返回文章列表
          </router-link>
          
          <div class="article-meta-top">
            <span :class="['tag', 'tag-' + article.category]">
              {{ getCategoryName(article.category) }}
            </span>
            <span class="article-date">📅 {{ article.date }}</span>
            <span class="read-time">⏱️ {{ article.readTime }}分钟阅读</span>
          </div>
          
          <h1 class="article-title">{{ article.title }}</h1>
          
          <div class="article-tags">
            <span v-for="tag in article.tags" :key="tag" class="tag-item">
              #{{ tag }}
            </span>
          </div>
        </header>

        <!-- Article Content -->
        <article class="article-content card animate-fade-in">
          <div class="content-body" v-html="renderedContent"></div>
        </article>

        <!-- Article Footer -->
        <footer class="article-footer">
          <div class="share-section">
            <h4>分享文章</h4>
            <div class="share-buttons">
              <button class="share-btn" @click="share('twitter')">𝕏 Twitter</button>
              <button class="share-btn" @click="share('copy')">📋 复制链接</button>
            </div>
          </div>
          
          <!-- Navigation -->
          <div class="article-nav">
            <router-link 
              v-if="prevArticle" 
              :to="`/article/${prevArticle.id}`"
              class="nav-card prev"
            >
              <span class="nav-label">← 上一篇</span>
              <span class="nav-title">{{ prevArticle.title }}</span>
            </router-link>
            <div v-else class="nav-card placeholder"></div>
            
            <router-link 
              v-if="nextArticle" 
              :to="`/article/${nextArticle.id}`"
              class="nav-card next"
            >
              <span class="nav-label">下一篇 →</span>
              <span class="nav-title">{{ nextArticle.title }}</span>
            </router-link>
            <div v-else class="nav-card placeholder"></div>
          </div>
        </footer>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getArticleById, getAdjacentArticles, getCategoryName } from '../utils/data'

const route = useRoute()
const router = useRouter()
const article = ref(null)
const prevArticle = ref(null)
const nextArticle = ref(null)

const renderedContent = computed(() => {
  if (!article.value) return ''
  // Simple markdown-like rendering
  return article.value.content
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="code-block"><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
    .replace(/### (.+)/g, '<h3>$1</h3>')
    .replace(/## (.+)/g, '<h2>$1</h2>')
    .replace(/# (.+)/g, '<h1>$1</h1>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/- (.+)/g, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
})

const loadArticle = () => {
  const id = parseInt(route.params.id)
  article.value = getArticleById(id)
  
  if (!article.value) {
    router.push('/articles')
    return
  }
  
  const adjacent = getAdjacentArticles(id)
  prevArticle.value = adjacent.prev
  nextArticle.value = adjacent.next
  
  // Scroll to top
  window.scrollTo(0, 0)
}

const share = (platform) => {
  const url = window.location.href
  if (platform === 'twitter') {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.value.title)}&url=${encodeURIComponent(url)}`)
  } else if (platform === 'copy') {
    navigator.clipboard.writeText(url)
    alert('链接已复制到剪贴板！')
  }
}

onMounted(() => {
  loadArticle()
})
</script>

<style scoped>
.article-detail {
  padding: 100px 0 60px;
  min-height: 100vh;
}

/* Loading */
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid var(--border-color);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Header */
.article-header {
  max-width: 800px;
  margin: 0 auto 40px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: var(--text-secondary);
  text-decoration: none;
  margin-bottom: 30px;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: var(--primary-color);
}

.article-meta-top {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.article-date,
.read-time {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.article-title {
  font-size: 2.5rem;
  color: #fff;
  line-height: 1.3;
  margin-bottom: 20px;
}

.article-tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.tag-item {
  padding: 6px 14px;
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid var(--primary-color);
  border-radius: 20px;
  color: var(--primary-color);
  font-size: 0.9rem;
}

/* Content */
.article-content {
  max-width: 800px;
  margin: 0 auto 60px;
  padding: 40px;
}

.content-body {
  color: var(--text-primary);
  line-height: 1.8;
  font-size: 1.05rem;
}

.content-body :deep(h1) {
  font-size: 2rem;
  color: #fff;
  margin: 40px 0 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--border-color);
}

.content-body :deep(h2) {
  font-size: 1.6rem;
  color: #fff;
  margin: 35px 0 18px;
}

.content-body :deep(h3) {
  font-size: 1.3rem;
  color: var(--primary-color);
  margin: 30px 0 15px;
}

.content-body :deep(p) {
  margin-bottom: 20px;
}

.content-body :deep(pre.code-block) {
  background: #0d0d1a;
  border-radius: 8px;
  padding: 20px;
  overflow-x: auto;
  margin: 20px 0;
  border-left: 4px solid var(--primary-color);
}

.content-body :deep(pre code) {
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.95rem;
  color: var(--primary-color);
  line-height: 1.6;
}

.content-body :deep(code.inline-code) {
  background: rgba(0, 255, 136, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
  color: var(--primary-color);
  font-family: 'Fira Code', monospace;
  font-size: 0.9em;
}

.content-body :deep(ul) {
  margin: 15px 0;
  padding-left: 25px;
}

.content-body :deep(li) {
  margin-bottom: 8px;
  color: var(--text-secondary);
}

.content-body :deep(strong) {
  color: #fff;
}

/* Footer */
.article-footer {
  max-width: 800px;
  margin: 0 auto;
}

.share-section {
  text-align: center;
  margin-bottom: 50px;
}

.share-section h4 {
  color: var(--text-secondary);
  margin-bottom: 15px;
}

.share-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.share-btn {
  padding: 10px 25px;
  border-radius: 8px;
  border: 2px solid var(--border-color);
  background: var(--bg-card);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
}

.share-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

/* Navigation */
.article-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.nav-card {
  padding: 25px;
  background: var(--bg-card);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.nav-card:hover {
  border-color: var(--primary-color);
  transform: translateY(-3px);
}

.nav-card.prev {
  text-align: left;
}

.nav-card.next {
  text-align: right;
}

.nav-label {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.nav-title {
  color: #fff;
  font-weight: 600;
  font-size: 1.1rem;
}

.nav-card:hover .nav-title {
  color: var(--primary-color);
}

.nav-card.placeholder {
  visibility: hidden;
}

@media (max-width: 768px) {
  .article-title {
    font-size: 1.8rem;
  }
  
  .article-content {
    padding: 25px;
  }
  
  .article-nav {
    grid-template-columns: 1fr;
  }
  
  .nav-card.next {
    text-align: left;
  }
}
</style>
