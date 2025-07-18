import { defineStore } from 'pinia'
import { isSameDay, isSameWeek, isSameMonth, parseISO } from 'date-fns'

export const useFilterStore = defineStore('filters', {
  state: () => ({
    type: '',            // 'Revenu' ou 'Dépense' ou ''
    category: '',        // ex: 'Courses'
    period: '',          // 'today' | 'week' | 'month' | ''
    minAmount: null,
    maxAmount: null,
    sortBy: 'date',      // 'date' ou 'amount'
  }),

  getters: {
    applyFilters: (state) => {
      return (transactions) => {
        let result = [...transactions]

        if (state.type) {
          result = result.filter(t => t.type === state.type)
        }

        if (state.category) {
          result = result.filter(t => t.category === state.category)
        }

        if (state.period) {
          result = result.filter(t => {
            const date = parseISO(t.date)
            if (state.period === 'today') return isSameDay(date, new Date())
            if (state.period === 'week') return isSameWeek(date, new Date())
            if (state.period === 'month') return isSameMonth(date, new Date())
            return true
          })
        }

        if (state.minAmount !== null) {
          result = result.filter(t => t.amount >= state.minAmount)
        }

        if (state.maxAmount !== null) {
          result = result.filter(t => t.amount <= state.maxAmount)
        }

        if (state.sortBy === 'amount') {
          result.sort((a, b) => b.amount - a.amount)
        } else {
          result.sort((a, b) => new Date(b.date) - new Date(a.date))
        }

        return result
      }
    }
  },

  actions: {
    resetFilters() {
      this.type = ''
      this.category = ''
      this.period = ''
      this.minAmount = null
      this.maxAmount = null
      this.sortBy = 'date'
    },

    setFilter({ type, category, period, minAmount, maxAmount, sortBy }) {
      if (type !== undefined) this.type = type
      if (category !== undefined) this.category = category
      if (period !== undefined) this.period = period
      if (minAmount !== undefined) this.minAmount = minAmount
      if (maxAmount !== undefined) this.maxAmount = maxAmount
      if (sortBy !== undefined) this.sortBy = sortBy
    },
  }
})
