<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip
} from 'chart.js'
import { useTransactionStore } from '@/stores/useTransactionStore'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip)

const store = useTransactionStore()

const typeCounts = {
  Revenu: store.transactions.filter(t => t.type === 'Revenu').length,
  Dépense: store.transactions.filter(t => t.type === 'Dépense').length
}

const data = {
  labels: Object.keys(typeCounts),
  datasets: [{
    label: 'Nombre de transactions',
    data: Object.values(typeCounts),
    backgroundColor: ['#16a34a', '#dc2626']
  }]
}
</script>

<template>
  <Bar :data="data" />
</template>
