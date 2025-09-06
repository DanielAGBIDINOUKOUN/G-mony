<template>
  <div class="p-6 max-w-6xl mx-auto space-y-10 mt-20">
    <h1 class="text-3xl font-bold">Dashboard financier</h1>

    <!-- Résumé financier -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-green-100 border-l-4 border-green-500 p-4 rounded-xl">
        <p class="text-sm text-green-700">Total Revenu</p>
        <h2 class="text-2xl font-bold text-green-800">
          {{ summary.totalRevenu.toLocaleString() }} FCFA
        </h2>
      </div>
      <div class="bg-red-100 border-l-4 border-red-500 p-4 rounded-xl">
        <p class="text-sm text-red-700">Total Dépense</p>
        <h2 class="text-2xl font-bold text-red-800">
          {{ summary.totalDepense.toLocaleString() }} FCFA
        </h2>
      </div>
      <div class="bg-gray-100 border-l-4 border-gray-500 p-4 rounded-xl">
        <p class="text-sm text-gray-700">Solde actuel</p>
        <h2 class="text-2xl font-bold text-gray-800">
          {{ summary.solde.toLocaleString() }} FCFA
        </h2>
      </div>
    </div>

    <!-- Diagramme Doughnut -->
    <div class="bg-white p-6 rounded-xl shadow">
      <h2 class="text-xl font-bold mb-4">Répartition Revenu / Dépense</h2>
      <DoughnutChart />
    </div>

    <!-- Barres par catégorie -->
    <div class="bg-white p-6 rounded-xl shadow">
      <h2 class="text-xl font-bold mb-4">Montant par sous-catégorie</h2>
      <BarChart />
    </div>

    <!-- Graphique ligne temporel -->
    <div class="bg-white p-6 rounded-xl shadow">
      <h2 class="text-xl font-bold mb-4">Évolution mensuelle</h2>
      <LineChart />
    </div>
  </div>
</template>

<script setup>
import { useSummaryStore } from '@/stores/useSummaryStore'
import DoughnutChart from '@/components/chart/DoughnutChart.vue'
import BarChart from '@/components/chart/BarChart.vue'
import LineChart from '@/components/chart/LineChart.vue'

const summary = useSummaryStore()
</script>

