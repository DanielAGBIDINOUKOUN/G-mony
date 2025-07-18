import { defineStore } from 'pinia'

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    transactions: JSON.parse(localStorage.getItem('gmony_transactions')) || [],
    filters: {
      type: null,
      category: null,
      sortBy: 'date', // 'date' ou 'amount'
      dateRange: 'all' // 'all', 'week', 'month', 'year'
    },
  }),

  getters: {
    filteredTransactions(state) {
      let result = [...state.transactions]

      // 🔹 Filtre par type
      if (state.filters.type) {
        result = result.filter(t => t.type === state.filters.type)
      }

      // 🔹 Filtre par catégorie
      if (state.filters.category) {
        result = result.filter(t => t.category === state.filters.category)
      }

      // 🔹 Filtre par plage de temps
      if (state.filters.dateRange !== 'all') {
        const now = new Date()
        result = result.filter(t => {
          const date = new Date(t.date)

          if (state.filters.dateRange === 'week') {
            const oneWeekAgo = new Date()
            oneWeekAgo.setDate(now.getDate() - 7)
            return date >= oneWeekAgo && date <= now
          }

          if (state.filters.dateRange === 'month') {
            return date.getMonth() === now.getMonth() &&
                   date.getFullYear() === now.getFullYear()
          }

          if (state.filters.dateRange === 'year') {
            return date.getFullYear() === now.getFullYear()
          }

          return true
        })
      }

      // 🔹 Tri
      if (state.filters.sortBy === 'amount') {
        result.sort((a, b) => b.amount - a.amount)
      } else {
        result.sort((a, b) => new Date(b.date) - new Date(a.date))
      }

      return result
    }
  },

  actions: {
    addTransaction(transaction) {
      transaction.id = Date.now()
      this.transactions.push(transaction)
      this.saveToLocalStorage()
    },

    updateTransaction(updated) {
      const index = this.transactions.findIndex(t => t.id === updated.id)
      if (index !== -1) {
        this.transactions[index] = updated
        this.saveToLocalStorage()
      }
    },

    deleteTransaction(id) {
      this.transactions = this.transactions.filter(t => t.id !== id)
      this.saveToLocalStorage()
    },

    saveToLocalStorage() {
      localStorage.setItem('gmony_transactions', JSON.stringify(this.transactions))
    },

    setFilter(type = null, category = null) {
      this.filters.type = type
      this.filters.category = category
    },

    setSort(by) {
      this.filters.sortBy = by
    },
  }
})
