<template>
  <div class="p-6 max-w-6xl mx-auto space-y-10 mt-20">
    <h1 class="text-3xl font-bold">📈 Statistiques</h1>
    <!-- Onglets stylés -->
    <div class="flex gap-4 mb-8">
      <button
        @click="activeTab = 'revenu'"
        :class="[
          'px-6 py-2 rounded-t-xl font-semibold transition-all duration-200',
          activeTab === 'revenu'
            ? 'bg-green-100 text-green-800 border-b-4 border-green-500 shadow'
            : 'bg-gray-100 text-gray-500 hover:bg-green-50'
        ]"
      >
        Revenu
      </button>
      <button
        @click="activeTab = 'depense'"
        :class="[
          'px-6 py-2 rounded-t-xl font-semibold transition-all duration-200',
          activeTab === 'depense'
            ? 'bg-red-100 text-red-800 border-b-4 border-red-500 shadow'
            : 'bg-gray-100 text-gray-500 hover:bg-red-50'
        ]"
      >
        Dépense
      </button>
    </div>
    <!-- Statistiques et graphique selon l'onglet -->
    <div v-if="activeTab === 'revenu'">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div class="bg-green-100 p-4 rounded-xl border-l-4 border-green-500 shadow">
          <p class="text-sm text-green-700">Nombre de revenus</p>
          <h2 class="text-2xl font-bold text-green-800">{{ revenus.length }}</h2>
        </div>
        <div class="bg-green-100 p-4 rounded-xl border-l-4 border-green-500 shadow">
          <p class="text-sm text-green-700">Moyenne Revenu</p>
          <h2 class="text-2xl font-bold text-green-800">{{ moyenneRevenu.toFixed(0) }} FCFA</h2>
        </div>
        <div class="bg-white shadow p-4 rounded-xl">
          <p class="text-sm text-gray-500">Mois le plus actif (revenu)</p>
          <h2 class="text-lg font-semibold text-gray-700">{{ moisActifRevenu }}</h2>
        </div>
      </div>
      <div class="bg-white p-6 rounded-xl shadow">
        <h2 class="text-xl font-bold mb-4">Graphique des revenus</h2>
        <DoughnutChart :revenu="true" />
      </div>
    </div>
    <div v-else>
      <div v-if="depenses.length === 0" class="text-center text-gray-400 italic mt-8">
        Aucune dépense enregistrée.
      </div>
      <div v-else>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div class="bg-red-100 p-4 rounded-xl border-l-4 border-red-500 shadow">
            <p class="text-sm text-red-700">Nombre de dépenses</p>
            <h2 class="text-2xl font-bold text-red-800">{{ depenses.length }}</h2>
          </div>
          <div class="bg-red-100 p-4 rounded-xl border-l-4 border-red-500 shadow">
            <p class="text-sm text-red-700">Moyenne Dépense</p>
            <h2 class="text-2xl font-bold text-red-800">{{ moyenneDepense.toFixed(0) }} FCFA</h2>
          </div>
          <div class="bg-white shadow p-4 rounded-xl">
            <p class="text-sm text-gray-500">Catégorie la plus dépensée</p>
            <h2 class="text-lg font-semibold text-gray-700">{{ topDepenseCat }}</h2>
          </div>
          <div class="bg-white shadow p-4 rounded-xl">
            <p class="text-sm text-gray-500">Mois le plus actif (dépense)</p>
            <h2 class="text-lg font-semibold text-gray-700">{{ moisActifDepense }}</h2>
          </div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow">
          <h2 class="text-xl font-bold mb-4">Graphique des dépenses</h2>
          <DoughnutChart :revenu="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTransactionStore } from '@/stores/useTransactionStore'
import DoughnutChart from '@/components/chart/DoughnutChart.vue'

const activeTab = ref('revenu')
const store = useTransactionStore()

const revenus = store.transactions.filter(t => t.type === 'Revenu')
const depenses = store.transactions.filter(t => t.type === 'Dépense')

const moyenneRevenu = revenus.length
  ? revenus.reduce((a, b) => a + b.amount, 0) / revenus.length
  : 0

const moyenneDepense = depenses.length
  ? depenses.reduce((a, b) => a + b.amount, 0) / depenses.length
  : 0

let catStats = {}
depenses.forEach(t => {
  catStats[t.category] = (catStats[t.category] || 0) + t.amount
})
const topDepenseCat = Object.entries(catStats).sort((a, b) => b[1] - a[1])[0]?.[0] || '—'

let moisRevenu = {}
revenus.forEach(t => {
  const m = t.date.slice(0, 7)
  moisRevenu[m] = (moisRevenu[m] || 0) + 1
})
const moisActifRevenu = Object.entries(moisRevenu).sort((a, b) => b[1] - a[1])[0]?.[0] || '—'

let moisDepense = {}
depenses.forEach(t => {
  const m = t.date.slice(0, 7)
  moisDepense[m] = (moisDepense[m] || 0) + 1
})
const moisActifDepense = Object.entries(moisDepense).sort((a, b) => b[1] - a[1])[0]?.[0] || '—'
</script>
