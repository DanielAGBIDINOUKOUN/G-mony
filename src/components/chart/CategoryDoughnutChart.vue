<script setup>
import { Doughnut } from 'vue-chartjs'
import { useTransactionStore } from '@/stores/useTransactionStore'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const store = useTransactionStore()

const categoryCounts = {}
store.transactions.forEach(t => {
  categoryCounts[t.category] = (categoryCounts[t.category] || 0) + 1
})

const data = {
  labels: Object.keys(categoryCounts),
  datasets: [{
    data: Object.values(categoryCounts),
    backgroundColor: ['#3b82f6', '#6366f1', '#f43f5e', '#16a34a', '#f59e0b','#f53b0b', '#5cf6', '#ec4899', '#14b8a6','#A21e0b'],
  }]
}
</script>

<template>
  <Doughnut :data="data" />
</template>
