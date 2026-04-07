<template>
  <div class="articles-page">
    <div class="container">
      <!-- Page Header -->
      <header class="page-header animate-fade-in">
        <h1 class="page-title">📝 文章列表</h1>
        <p class="page-desc">记录学习过程中的点点滴滴，分享CTF解题思路</p>
      </header>

      <!-- Filters -->
      <div class="filters">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="搜索文章..."
            class="search-input"
          >
        </div>
        
        <div class="category-filters">
          <button 
            v-for="cat in categories" 
            :key="cat.value"
            :class="['filter-btn', { active: currentCategory === cat.value }]"
            @click="currentCategory = cat.value"
          >
            <span class="filter-icon">{{ cat.icon }}</span>
            {{ cat.label }}
          </button>
        </div>
      </div>

      <!-- Articles List -->
      <div class="articles-list">
        <article 
          v-for="article in filteredArticles" 
          :key="article.id"
          class="article-item card"
          @click="goToArticle(article.id)"
        >
          <div class="article-main">
            <div class="article-meta">
              <span :class="['tag', 'tag-' + article.category]">
                {{ getCategoryName(article.category) }}
              </span>
              <span class="article-date">
                📅 {{ article.date }}
              </span>
              <span class="read-time">
                ⏱️ {{ article.readTime }}分钟
              </span>
            </div>
            <h2 class="article-title">{{ article.title }}</h2>
            <p class="article-summary">{{ article.excerpt }}</p>
            <div class="article-tags">
              <span v-for="tag in article.tags" :key="tag" class="tag-small">
                #{{ tag }}
              </span>
            </div>
          </div>
          <div class="article-arrow">→</div>
        </article>
      </div>

      <!-- Empty State -->
      <div v-if="filteredArticles.length === 0" class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3>没有找到相关文章</h3>
        <p>试试其他关键词或分类</p>
      </div>

      <!-- Pagination -->
      <div v-if="filteredArticles.length > 0" class="pagination">
        <button 
          class="page-btn" 
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          ← 上一页
        </button>
        <span class="page-info">
          第 {{ currentPage }} / {{ totalPages }} 页
        </span>
        <button 
          class="page-btn" 
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          下一页 →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getAllArticles } from '../utils/data'

const router = useRouter()
const searchQuery = ref('')
const currentCategory = ref('all')
const currentPage = ref(1)
const itemsPerPage = 6

const categories = [
  { value: 'all', label: '全部', icon: '📚' },
  { value: 'web', label: 'Web', icon: '🌐' },
  { value: 'pwn', label: 'Pwn', icon: '💥' },
  { value: 'crypto', label: 'Crypto', icon: '🔐' },
  { value: 'misc', label: 'Misc', icon: '📦' },
  { value: 'reverse', label: 'Reverse', icon: '🔧' }
]

const allArticles = getAllArticles()

const filteredArticles = computed(() => {
  let result = allArticles

  // Filter by category
  if (currentCategory.value !== 'all') {
    result = result.filter(a => a.category === currentCategory.value)
  }

  // Filter by search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(a => 
      a.title.toLowerCase().includes(query) ||
      a.excerpt.toLowerCase().includes(query) ||
      a.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // Pagination
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return result.slice(start, end)
})

const totalPages = computed(() => {
  let result = allArticles
  if (currentCategory.value !== 'all') {
    result = result.filter(a => a.category === currentCategory.value)
  }
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(a => 
      a.title.toLowerCase().includes(query) ||
      a.excerpt.toLowerCase().includes(query)
    )
  }
  return Math.ceil(result.length / itemsPerPage) || 1
})

const getCategoryName = (category) => {
  const cat = categories.find(c => c.value === category)
  return cat ? cat.label : category
}

const goToArticle = (id) => {
  router.push(`/article/${id}`)
}
</script>

<style scoped>
.articles-page {
  padding: 100px 0 60px;
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 50px;
}

.page-title {
  font-size: 2.5rem;
  margin-bottom: 15px;
  background: var(--gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-desc {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

/* Filters */
.filters {
  margin-bottom: 40px;
}

.search-box {
  position: relative;
  max-width: 500px;
  margin: 0 auto 25px;
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
}

.search-input {
  width: 100%;
  padding: 15px 20px 15px 50px;
  border-radius: 12px;
  border: 2px solid var(--border-color);
  background: var(--bg-card);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.1);
}

.search-input::placeholder {
  color: var(--text-secondary);
}

.category-filters {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  border-radius: 25px;
  border: 2px solid var(--border-color);
  background: var(--bg-card);
  color: var(--text-secondary);
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.filter-btn.active {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: #0f0f23;
}

.filter-icon {
  font-size: 1.1rem;
}

/* Articles List */
.articles-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
}

.article-item {
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 25px;
}

.article-main {
  flex: 1;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.article-date,
.read-time {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.article-title {
  font-size: 1.4rem;
  color: #fff;
  margin-bottom: 10px;
  transition: color 0.3s ease;
}

.article-item:hover .article-title {
  color: var(--primary-color);
}

.article-summary {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.tag-small {
  padding: 4px 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.article-arrow {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(0, 255, 136, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  font-size: 1.5rem;
  transition: all 0.3s ease;
}

.article-item:hover .article-arrow {
  background: var(--primary-color);
  color: #0f0f23;
  transform: translateX(5px);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.empty-state h3 {
  color: #fff;
  margin-bottom: 10px;
}

.empty-state p {
  color: var(--text-secondary);
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.page-btn {
  padding: 12px 25px;
  border-radius: 8px;
  border: 2px solid var(--primary-color);
  background: transparent;
  color: var(--primary-color);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-btn:hover:not(:disabled) {
  background: var(--primary-color);
  color: #0f0f23;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

/* 平板和手机横屏 */
@media (max-width: 768px) {
  .articles-page {
    padding: 80px 0 40px;
  }
  
  .page-header {
    margin-bottom: 30px;
  }
  
  .page-title {
    font-size: 1.6rem;
  }
  
  .page-desc {
    font-size: 0.95rem;
  }
  
  .filters {
    margin-bottom: 25px;
  }
  
  .search-box {
    max-width: 100%;
  }
  
  .search-input {
    padding: 12px 15px 12px 45px;
    font-size: 0.95rem;
  }
  
  .category-filters {
    gap: 8px;
  }
  
  .filter-btn {
    padding: 8px 14px;
    font-size: 0.85rem;
  }
  
  .filter-icon {
    font-size: 1rem;
  }
  
  .article-item {
    flex-direction: column;
    align-items: flex-start;
    padding: 18px;
  }
  
  .article-arrow {
    display: none;
  }
  
  .article-title {
    font-size: 1.15rem;
  }
  
  .article-summary {
    font-size: 0.9rem;
    -webkit-line-clamp: 2;
  }
  
  .article-meta {
    gap: 10px;
  }
  
  .article-date,
  .read-time {
    font-size: 0.8rem;
  }
  
  .tag-small {
    font-size: 0.75rem;
    padding: 3px 8px;
  }
  
  .pagination {
    gap: 10px;
  }
  
  .page-btn {
    padding: 10px 18px;
    font-size: 0.9rem;
  }
  
  .page-info {
    font-size: 0.85rem;
  }
}

/* 超小屏幕 */
@media (max-width: 480px) {
  .articles-page {
    padding: 70px 0 30px;
  }
  
  .page-title {
    font-size: 1.4rem;
  }
  
  .page-desc {
    font-size: 0.85rem;
  }
  
  .search-box {
    margin-bottom: 15px;
  }
  
  .category-filters {
    justify-content: flex-start;
    overflow-x: auto;
    flex-wrap: nowrap;
    padding-bottom: 5px;
    -webkit-overflow-scrolling: touch;
  }
  
  .category-filters::-webkit-scrollbar {
    height: 3px;
  }
  
  .filter-btn {
    white-space: nowrap;
    flex-shrink: 0;
  }
  
  .article-item {
    padding: 15px;
  }
  
  .article-title {
    font-size: 1.05rem;
  }
  
  .article-summary {
    font-size: 0.85rem;
    margin-bottom: 10px;
  }
  
  .article-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .pagination {
    flex-direction: column;
    gap: 15px;
  }
  
  .page-btn {
    width: 100%;
  }
}
</style>
