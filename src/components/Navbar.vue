<template>
  <nav class="navbar" :class="{ 'scrolled': isScrolled }">
    <div class="container navbar-content">
      <router-link to="/" class="logo">
        <span class="logo-icon">🏴</span>
        <span class="logo-text">CTF<span class="highlight">Blog</span></span>
      </router-link>
      
      <div class="nav-links" :class="{ 'active': mobileMenuOpen }">
        <router-link to="/" class="nav-link" @click="closeMenu">
          <span class="nav-icon">🏠</span> 首页
        </router-link>
        <router-link to="/articles" class="nav-link" @click="closeMenu">
          <span class="nav-icon">📝</span> 文章
        </router-link>
        <router-link to="/about" class="nav-link" @click="closeMenu">
          <span class="nav-icon">👤</span> 关于
        </router-link>
      </div>
      
      <button class="mobile-menu-btn" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMenu = () => {
  mobileMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 12px 0;
  transition: all 0.3s ease;
  background: transparent;
}

@media (max-width: 768px) {
  .navbar {
    padding: 10px 0;
  }
}

.navbar.scrolled {
  background: rgba(15, 15, 35, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  font-size: 1.3rem;
  font-weight: bold;
}

.logo-icon {
  font-size: 1.5rem;
}

.logo-text {
  color: #fff;
}

.highlight {
  color: var(--primary-color);
}

.nav-links {
  display: flex;
  gap: 10px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--primary-color);
  background: rgba(0, 255, 136, 0.1);
}

.nav-icon {
  font-size: 1.1rem;
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.mobile-menu-btn span {
  width: 25px;
  height: 3px;
  background: var(--primary-color);
  border-radius: 3px;
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .nav-links {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: rgba(15, 15, 35, 0.98);
    backdrop-filter: blur(10px);
    flex-direction: column;
    padding: 20px;
    transform: translateY(-150%);
    transition: transform 0.3s ease;
    z-index: 999;
    border-bottom: 1px solid var(--border-color);
    /* 确保导航不溢出 */
    max-width: 100vw;
    box-sizing: border-box;
  }
  
  .nav-links.active {
    transform: translateY(0);
  }
  
  .mobile-menu-btn {
    display: flex;
  }
  
  .nav-link {
    padding: 12px 16px;
    font-size: 1rem;
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
