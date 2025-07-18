<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js'
import { useTransactionStore } from '@/stores/useTransactionStore'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const store = useTransactionStore()

// Catégories et leur total
const grouped = {}

store.transactions.forEach(t => {
  grouped[t.category] = (grouped[t.category] || 0) + t.amount
})

const data = {
  labels: Object.keys(grouped),
  datasets: [
    {
      label: 'Montants par catégorie',
      data: Object.values(grouped),
      backgroundColor: '#3b82f6'
    }
  ]
}

const options = {
  responsive: true,
  plugins: {
    legend: { display: false }
  }
}
</script>

<template>
  <Bar :data="data" :options="options" />
</template>
