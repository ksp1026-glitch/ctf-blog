<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <div class="terminal-bar">
          <span class="terminal-dot red"></span>
          <span class="terminal-dot yellow"></span>
          <span class="terminal-dot green"></span>
          <span class="terminal-title">auth@ctf-blog:~$</span>
        </div>
        <div class="login-icon">
          <span class="icon-shield">🛡️</span>
        </div>
        <h1 class="login-title">身份验证</h1>
        <p class="login-subtitle">Authentication Required</p>
      </div>

      <form class="login-form" @submit.prevent="handleLogin">
        <div class="input-group" :class="{ 'focused': focusField === 'username', 'has-value': form.username }">
          <span class="input-icon">👤</span>
          <input
            id="username"
            v-model="form.username"
            type="text"
            class="form-input"
            placeholder="用户名 / Username"
            autocomplete="username"
            @focus="focusField = 'username'"
            @blur="focusField = ''"
          />
          <label for="username" class="input-label">用户名 / Username</label>
          <div class="input-line"></div>
        </div>

        <div class="input-group" :class="{ 'focused': focusField === 'password', 'has-value': form.password }">
          <span class="input-icon">🔑</span>
          <input
            id="password"
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            class="form-input"
            placeholder="密码 / Password"
            autocomplete="current-password"
            @focus="focusField = 'password'"
            @blur="focusField = ''"
          />
          <label for="password" class="input-label">密码 / Password</label>
          <button type="button" class="toggle-password" @click="showPassword = !showPassword">
            {{ showPassword ? '🙈' : '👁️' }}
          </button>
          <div class="input-line"></div>
        </div>

        <div v-if="errorMsg" class="error-message">
          <span class="error-icon">⚠️</span>
          <span>{{ errorMsg }}</span>
        </div>

        <button type="submit" class="login-btn" :disabled="loading">
          <span v-if="loading" class="loading-text">
            <span class="loading-dot">.</span>
            <span class="loading-dot">.</span>
            <span class="loading-dot">.</span>
            <span> 验证中</span>
          </span>
          <span v-else class="btn-text">
            <span class="btn-arrow">⟩</span> 登录 / Login
          </span>
        </button>
      </form>

      <div class="login-footer">
        <p class="hint-text">
          <span class="hint-prompt">$</span>
          <span class="hint-typing">提示: 使用管理员账号登录</span>
          <span class="hint-cursor">▊</span>
        </p>
      </div>
    </div>

    <div class="matrix-bg">
      <div v-for="n in 20" :key="n" class="matrix-column" :style="{ left: (n * 5) + '%', animationDelay: (n * 0.3) + 's' }">
        <span v-for="c in 10" :key="c" class="matrix-char">{{ randomChar() }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../stores/auth.js'

const router = useRouter()
const { login } = useAuth()

const form = reactive({ username: '', password: '' })
const focusField = ref('')
const showPassword = ref(false)
const loading = ref(false)
const errorMsg = ref('')

function randomChar() {
  const chars = '01アイウエオカキクケコサシスセソタチツテト'
  return chars[Math.floor(Math.random() * chars.length)]
}

async function handleLogin() {
  if (!form.username || !form.password) {
    errorMsg.value = '请填写用户名和密码'
    return
  }

  loading.value = true
  errorMsg.value = ''

  try {
    await login(form.username, form.password)
    router.push('/')
  } catch (e) {
    errorMsg.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  position: relative;
  overflow: hidden;
}

.login-container {
  width: 100%;
  max-width: 420px;
  background: var(--bg-card);
  border-radius: 16px;
  border: 1px solid var(--border-color);
  overflow: hidden;
  position: relative;
  z-index: 1;
  animation: fadeIn 0.6s ease-out;
}

.terminal-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid var(--border-color);
}

.terminal-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.terminal-dot.red { background: #ff5f56; }
.terminal-dot.yellow { background: #ffbd2e; }
.terminal-dot.green { background: #27c93f; }

.terminal-title {
  margin-left: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.8rem;
  color: var(--text-secondary);
  opacity: 0.7;
}

.login-header {
  text-align: center;
  padding: 40px 30px 20px;
}

.login-icon {
  font-size: 3rem;
  margin-bottom: 15px;
  animation: float 3s ease-in-out infinite;
}

.login-title {
  font-size: 1.6rem;
  color: #fff;
  margin-bottom: 8px;
}

.login-subtitle {
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-family: 'Fira Code', monospace;
}

.login-form {
  padding: 20px 30px 30px;
}

.input-group {
  position: relative;
  margin-bottom: 24px;
}

.input-icon {
  position: absolute;
  left: 14px;
  top: 14px;
  font-size: 1.1rem;
  z-index: 1;
  transition: all 0.3s ease;
}

.input-group.focused .input-icon {
  transform: scale(1.1);
}

.form-input {
  width: 100%;
  padding: 14px 14px 14px 44px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  color: #fff;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  font-family: 'Fira Code', monospace;
}

.form-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 15px rgba(0, 255, 136, 0.1);
}

.form-input::placeholder {
  color: var(--text-secondary);
  opacity: 0.5;
  font-family: inherit;
}

.input-label {
  display: none;
}

.toggle-password {
  position: absolute;
  right: 14px;
  top: 12px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 2px;
  opacity: 0.6;
  transition: opacity 0.3s;
}

.toggle-password:hover {
  opacity: 1;
}

.input-line {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--gradient-1);
  transition: all 0.3s ease;
  border-radius: 0 0 2px 2px;
}

.input-group.focused .input-line {
  left: 0;
  width: 100%;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.3);
  border-radius: 10px;
  color: var(--secondary-color);
  font-size: 0.9rem;
  margin-bottom: 20px;
  animation: shake 0.4s ease-out;
}

.error-icon {
  font-size: 1rem;
}

.login-btn {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 10px;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  background: var(--gradient-1);
  color: #0f0f23;
  font-family: 'Fira Code', monospace;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 255, 136, 0.3);
}

.login-btn:active:not(:disabled) {
  transform: translateY(0);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-text {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.btn-arrow {
  font-size: 1.3rem;
  font-weight: bold;
}

.loading-text {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
}

.loading-dot {
  animation: pulse 0.8s infinite;
  font-weight: bold;
  font-size: 1.2rem;
}

.loading-dot:nth-child(2) { animation-delay: 0.2s; }
.loading-dot:nth-child(3) { animation-delay: 0.4s; }

.login-footer {
  padding: 16px 30px;
  border-top: 1px solid var(--border-color);
  background: rgba(0, 0, 0, 0.2);
}

.hint-text {
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 8px;
}

.hint-prompt {
  color: var(--primary-color);
}

.hint-typing {
  overflow: hidden;
  white-space: nowrap;
  animation: typing 3s steps(20) infinite;
  display: inline-block;
}

.hint-cursor {
  color: var(--primary-color);
  animation: blink 1s infinite;
}

/* Matrix background effect */
.matrix-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.04;
  pointer-events: none;
}

.matrix-column {
  position: absolute;
  top: -100%;
  display: flex;
  flex-direction: column;
  font-family: monospace;
  font-size: 14px;
  color: var(--primary-color);
  animation: matrixFall 8s linear infinite;
}

.matrix-char {
  line-height: 1;
  user-select: none;
}

@keyframes matrixFall {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

/* Mobile styles */
@media (max-width: 768px) {
  .login-page {
    padding: 20px 15px;
    min-height: calc(100vh - 50px);
  }

  .login-container {
    max-width: 100%;
  }

  .login-header {
    padding: 30px 20px 15px;
  }

  .login-icon {
    font-size: 2.5rem;
    margin-bottom: 12px;
  }

  .login-title {
    font-size: 1.3rem;
  }

  .login-form {
    padding: 15px 20px 25px;
  }

  .form-input {
    padding: 12px 12px 12px 40px;
    font-size: 0.95rem;
  }

  .login-btn {
    padding: 12px;
    font-size: 1rem;
  }

  .login-footer {
    padding: 12px 20px;
  }

  .hint-text {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .login-header {
    padding: 25px 15px 12px;
  }

  .login-icon {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  .login-title {
    font-size: 1.15rem;
  }

  .login-form {
    padding: 12px 15px 20px;
  }

  .form-input {
    padding: 10px 10px 10px 36px;
    font-size: 0.9rem;
  }

  .terminal-bar {
    padding: 10px 12px;
  }

  .terminal-dot {
    width: 10px;
    height: 10px;
  }

  .terminal-title {
    font-size: 0.7rem;
  }
}
</style>
