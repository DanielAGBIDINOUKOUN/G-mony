import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('gmony_token') || null,
    users: JSON.parse(localStorage.getItem('gmony_users')) || []
  }),

  getters: {
    isLoggedIn: (state) => !!state.token
  },

  actions: {
    login(email, password) {
      const user = this.users.find(u => u.email === email && u.password === password)

      if (user) {
        this.user = user
        this.token = this.generateToken()
        localStorage.setItem('gmony_token', this.token)
        return true
      }
      return false
    },

    register(user) {
      const exists = this.users.find(u => u.email === user.email)
      if (exists) {
        return false // utilisateur déjà inscrit
      }

      this.users.push(user)
      localStorage.setItem('gmony_users', JSON.stringify(this.users))
      return true // succès
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('gmony_token')
    },

    generateToken() {
      return Math.random().toString(36).slice(2) + Date.now().toString(36)
    }
  }
})
