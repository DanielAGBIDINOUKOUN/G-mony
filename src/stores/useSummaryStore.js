import { defineStore } from 'pinia'
import { useTransactionStore } from './useTransactionStore'

export const useSummaryStore = defineStore('summary', {
  getters: {
    // Liste séparée des revenus
    revenus() {
      const tStore = useTransactionStore()
      return tStore.transactions.filter(t => t.type === 'Revenu')
    },

    // Liste séparée des dépenses
    depenses() {
      const tStore = useTransactionStore()
      return tStore.transactions.filter(t => t.type === 'Dépense')
    },

    // Total des revenus
    totalRevenu() {
      return this.revenus.reduce((acc, t) => acc + t.amount, 0)
    },

    // Total des dépenses
    totalDepense() {
      return this.depenses.reduce((acc, t) => acc + t.amount, 0)
    },

    // Solde = revenus - dépenses
    solde() {
      return this.totalRevenu - this.totalDepense
    }
  }
})
