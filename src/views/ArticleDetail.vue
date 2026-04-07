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
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { marked } from 'marked'
import { getArticleById, getAdjacentArticles, getCategoryName } from '../utils/data'

const route = useRoute()
const router = useRouter()
const article = ref(null)
const prevArticle = ref(null)
const nextArticle = ref(null)

const renderedContent = computed(() => {
  if (!article.value) return ''
  // 使用 marked 渲染 Markdown
  return marked(article.value.content, {
    breaks: true,  // 支持换行
    gfm: true      // 支持 GitHub Flavored Markdown
  })
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

// 监听路由参数变化，切换文章时重新加载
watch(() => route.params.id, () => {
  loadArticle()
})
</script>

<style scoped>
.article-detail {
  padding: 100px 0 60px;
  min-height: 100vh;
  /* 确保文章详情页不溢出 */
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
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
  /* 确保内容不溢出 */
  width: 100%;
  overflow-x: hidden;
}

.content-body {
  color: var(--text-primary);
  line-height: 1.8;
  font-size: 1.05rem;
  /* 确保内容不溢出 */
  max-width: 100%;
  overflow-wrap: break-word;
  word-wrap: break-word;
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

/* 代码块样式 - 关键修复横向滚动 */
.content-body :deep(pre) {
  background: #0d0d1a;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  border-left: 4px solid var(--primary-color);
  /* 横向滚务关键设置 */
  overflow-x: auto;
  max-width: 100%;
  -webkit-overflow-scrolling: touch;
}

.content-body :deep(pre code) {
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.95rem;
  color: var(--primary-color);
  line-height: 1.6;
  /* 关键：防止代码换行破坏格式 */
  white-space: pre;
  word-break: normal;
  word-wrap: normal;
  display: block;
}

/* marked 生成的 code-block 类 */
.content-body :deep(pre.code-block) {
  background: #0d0d1a;
  border-radius: 8px;
  padding: 20px;
  overflow-x: auto;
  margin: 20px 0;
  border-left: 4px solid var(--primary-color);
  max-width: 100%;
  -webkit-overflow-scrolling: touch;
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

/* marked 生成的额外样式 */
/* 链接样式 - 确保长链接不溢出 */
.content-body :deep(a) {
  color: var(--primary-color);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s ease;
  word-break: break-all;
  overflow-wrap: break-word;
}

.content-body :deep(a:hover) {
  border-bottom-color: var(--primary-color);
}

/* 表格样式 - 添加横向滚动 */
.content-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  background: var(--bg-card);
  border-radius: 8px;
  overflow: hidden;
  display: block;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  white-space: nowrap;
}

.content-body :deep(thead),
.content-body :deep(tbody) {
  display: table;
  width: 100%;
}

.content-body :deep(th),
.content-body :deep(td) {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

.content-body :deep(th) {
  background: rgba(0, 255, 136, 0.1);
  color: var(--primary-color);
  font-weight: 600;
}

.content-body :deep(tr:last-child td) {
  border-bottom: none;
}

.content-body :deep(hr) {
  border: none;
  height: 1px;
  background: var(--border-color);
  margin: 30px 0;
}

.content-body :deep(blockquote) {
  border-left: 4px solid var(--primary-color);
  padding-left: 20px;
  margin: 20px 0;
  color: var(--text-secondary);
  font-style: italic;
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

/* 平板和手机 */
@media (max-width: 768px) {
  .article-detail {
    padding: 80px 0 40px;
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
  }
  
  .article-header {
    margin-bottom: 25px;
  }
  
  .back-link {
    font-size: 0.9rem;
    margin-bottom: 20px;
  }
  
  .article-meta-top {
    gap: 10px;
    margin-bottom: 15px;
  }
  
  .article-title {
    font-size: 1.4rem;
    margin-bottom: 15px;
  }
  
  .article-content {
    padding: 20px;
    margin-bottom: 40px;
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
  }
  
  .content-body {
    font-size: 0.95rem;
    line-height: 1.7;
  }
  
  .content-body :deep(h1) {
    font-size: 1.5rem;
    margin: 30px 0 15px;
  }
  
  .content-body :deep(h2) {
    font-size: 1.3rem;
    margin: 25px 0 12px;
  }
  
  .content-body :deep(h3) {
    font-size: 1.1rem;
    margin: 20px 0 10px;
  }
  
  .content-body :deep(p) {
    margin-bottom: 15px;
  }
  
  .content-body :deep(pre),
  .content-body :deep(pre.code-block) {
    padding: 15px;
    margin: 15px 0;
    overflow-x: auto;
    max-width: 100%;
    -webkit-overflow-scrolling: touch;
    /* 确保代码块在容器内 */
    box-sizing: border-box;
  }
  
  .content-body :deep(pre code) {
    font-size: 0.8rem;
    white-space: pre;
    word-break: normal;
  }
  
  .content-body :deep(code) {
    font-size: 0.85rem;
  }
  
  .content-body :deep(ul) {
    padding-left: 20px;
    margin: 10px 0;
  }
  
  .content-body :deep(li) {
    margin-bottom: 6px;
  }
  
  .content-body :deep(table) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    font-size: 0.9rem;
    -webkit-overflow-scrolling: touch;
    max-width: 100%;
  }
  
  .content-body :deep(thead),
  .content-body :deep(tbody) {
    display: table;
    width: 100%;
  }
  
  .content-body :deep(th),
  .content-body :deep(td) {
    padding: 10px 12px;
    white-space: nowrap;
  }
  
  .content-body :deep(th),
  .content-body :deep(td) {
    padding: 10px 12px;
  }
  
  .tag-item {
    font-size: 0.8rem;
    padding: 4px 10px;
  }
  
  .share-section {
    margin-bottom: 35px;
  }
  
  .share-buttons {
    flex-direction: column;
    gap: 10px;
  }
  
  .share-btn {
    width: 100%;
    padding: 12px;
  }
  
  .article-nav {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .nav-card {
    padding: 18px;
  }
  
  .nav-card.next {
    text-align: left;
  }
  
  .nav-label {
    font-size: 0.8rem;
  }
  
  .nav-title {
    font-size: 1rem;
  }
}

/* 超小屏幕 */
@media (max-width: 480px) {
  .article-detail {
    padding: 70px 0 30px;
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
  }
  
  .article-title {
    font-size: 1.2rem;
  }
  
  .article-content {
    padding: 15px;
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
    border-radius: 12px;
  }
  
  .content-body {
    font-size: 0.9rem;
    max-width: 100%;
    overflow-wrap: break-word;
    word-wrap: break-word;
  }
  
  .content-body :deep(h1) {
    font-size: 1.3rem;
  }
  
  .content-body :deep(h2) {
    font-size: 1.15rem;
  }
  
  .content-body :deep(h3) {
    font-size: 1rem;
  }
  
  .content-body :deep(pre),
  .content-body :deep(pre.code-block) {
    padding: 12px;
    margin: 12px 0;
    border-radius: 6px;
    border-left-width: 3px;
  }
  
  .content-body :deep(pre code) {
    font-size: 0.75rem;
    white-space: pre;
    word-break: normal;
  }
  
  .content-body :deep(code) {
    font-size: 0.8rem;
  }
  
  /* 确保小屏幕下所有元素不溢出 */
  .content-body :deep(p),
  .content-body :deep(li),
  .content-body :deep(span) {
    overflow-wrap: break-word;
    word-wrap: break-word;
  }
  
  .content-body :deep(a) {
    word-break: break-all;
  }
  
  .content-body :deep(th),
  .content-body :deep(td) {
    padding: 8px 10px;
    font-size: 0.85rem;
  }
  
  .nav-card {
    padding: 15px;
  }
  
  .nav-title {
    font-size: 0.9rem;
  }
}
</style>
