<template>
  <div class="app">
    <template v-if="showShell">
      <Navbar />
      <main class="main-content">
        <router-view />
      </main>
      <Footer />
    </template>
    <template v-else>
      <router-view />
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const route = useRoute()
const showShell = computed(() => route.name !== 'Login')
</script>

<style>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #16213e 100%);
  color: #e0e0e0;
  /* 确保应用不溢出 */
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
}

.main-content {
  flex: 1;
  padding-top: 60px;
  /* 确保主内容区域不溢出 */
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
}

@media (max-width: 768px) {
  .main-content {
    padding-top: 50px;
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  line-height: 1.6;
  /* 确保body不溢出 */
  max-width: 100vw;
  overflow-x: hidden;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #0f0f23;
}

::-webkit-scrollbar-thumb {
  background: #00ff88;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #00cc6a;
}

/* 移动端滚动条 */
@media (max-width: 768px) {
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
}
</style>
