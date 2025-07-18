<template>
  <div class="p-6 max-w-6xl mx-auto space-y-10 mt-20">
    <h1 class="text-3xl font-bold">📈 Statistiques</h1>

    <!-- Statistiques numériques -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="bg-white shadow p-4 rounded-xl">
        <p class="text-sm text-gray-500">Transactions totales</p>
        <h2 class="text-2xl font-bold">{{ totalTransactions }}</h2>
      </div>

      <div class="bg-green-100 p-4 rounded-xl border-l-4 border-green-500">
        <p class="text-sm text-green-700">Moyenne Revenu</p>
        <h2 class="text-2xl font-bold text-green-800">{{ moyenneRevenu.toFixed(0) }} FCFA</h2>
      </div>

      <div class="bg-red-100 p-4 rounded-xl border-l-4 border-red-500">
        <p class="text-sm text-red-700">Moyenne Dépense</p>
        <h2 class="text-2xl font-bold text-red-800">{{ moyenneDepense.toFixed(0) }} FCFA</h2>
      </div>

      <div class="bg-white shadow p-4 rounded-xl">
        <p class="text-sm text-gray-500">Catégorie la plus dépensée</p>
        <h2 class="text-lg font-semibold text-gray-700">{{ topDepenseCat }}</h2>
      </div>

      <div class="bg-white shadow p-4 rounded-xl">
        <p class="text-sm text-gray-500">Mois le plus actif</p>
        <h2 class="text-lg font-semibold text-gray-700">{{ moisActif }}</h2>
      </div>
    </div>

    <!-- Graphiques -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-xl shadow">
        <h2 class="text-xl font-bold mb-4">Transactions par type</h2>
        <TypeBarChart />
      </div>

      <div class="bg-white p-6 rounded-xl shadow">
        <h2 class="text-xl font-bold mb-4">Catégories les plus utilisées</h2>
        <CategoryDoughnutChart />
      </div>
    </div>

    <div class="bg-white p-6 rounded-xl shadow">
      <h2 class="text-xl font-bold mb-4">Transactions mensuelles</h2>
      <TransactionLineChart />
    </div>
  </div>
</template>

<script setup>
import { useTransactionStore } from '@/stores/useTransactionStore'
import TypeBarChart from '@/components/chart/TypeBarChart.vue'
import CategoryDoughnutChart from '@/components/chart/CategoryDoughnutChart.vue'
import TransactionLineChart from '@/components/chart/TransactionLineChart.vue'

const store = useTransactionStore()

const totalTransactions = store.transactions.length

const revenus = store.transactions.filter(t => t.type === 'Revenu')
const depenses = store.transactions.filter(t => t.type === 'Dépense')

const moyenneRevenu = revenus.length
  ? revenus.reduce((a, b) => a + b.amount, 0) / revenus.length
  : 0

const moyenneDepense = depenses.length
  ? depenses.reduce((a, b) => a + b.amount, 0) / depenses.length
  : 0

// Catégorie la plus dépensée
let catStats = {}
depenses.forEach(t => {
  catStats[t.category] = (catStats[t.category] || 0) + t.amount
})
const topDepenseCat = Object.entries(catStats).sort((a, b) => b[1] - a[1])[0]?.[0] || '—'

// Mois le plus actif
let mois = {}
store.transactions.forEach(t => {
  const m = t.date.slice(0, 7)
  mois[m] = (mois[m] || 0) + 1
})
const moisActif = Object.entries(mois).sort((a, b) => b[1] - a[1])[0]?.[0] || '—'
</script>
