<script setup>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useSummaryStore } from '@/stores/useSummaryStore'

ChartJS.register(ArcElement, Tooltip, Legend)

const summary = useSummaryStore()

const data = {
  labels: ['Revenus', 'Dépenses'],
  datasets: [
    {
      backgroundColor: ['#16a34a', '#dc2626'],
      data: [summary.totalRevenu, summary.totalDepense]
    }
  ]
}

const options = {
  responsive: true,
  plugins: {
    legend: { position: 'bottom' }
  }
}
</script>

<template>
  <Doughnut :data="data" :options="options" />
</template>
