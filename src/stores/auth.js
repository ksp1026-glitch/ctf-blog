import { reactive, computed } from 'vue'

const state = reactive({
  user: JSON.parse(localStorage.getItem('ctfblog_user') || 'null'),
  token: localStorage.getItem('ctfblog_token') || null,
})

export function isAuthenticated() {
  return !!localStorage.getItem('ctfblog_token')
}

export function useAuth() {
  const isLoggedIn = computed(() => !!state.token)
  const currentUser = computed(() => state.user)

  function login(username, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'homo' && password === 'Hhwasdfg6') {
          const user = { username, role: 'admin' }
          const token = 'token_' + Date.now()
          state.user = user
          state.token = token
          localStorage.setItem('ctfblog_user', JSON.stringify(user))
          localStorage.setItem('ctfblog_token', token)
          resolve({ success: true, user })
        } else {
          reject(new Error('用户名或密码错误'))
        }
      }, 800)
    })
  }

  function logout() {
    state.user = null
    state.token = null
    localStorage.removeItem('ctfblog_user')
    localStorage.removeItem('ctfblog_token')
  }

  return { isLoggedIn, currentUser, login, logout }
}
