<script setup>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { useTransactionStore } from '@/stores/useTransactionStore'

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale)

const store = useTransactionStore()

const monthLabels = [
  '01', '02', '03', '04', '05', '06',
  '07', '08', '09', '10', '11', '12'
]

const monthCounts = monthLabels.map(month => {
  return store.transactions.filter(t => t.date.slice(5, 7) === month).length
})

const data = {
  labels: monthLabels.map(m => `Mois ${m}`),
  datasets: [{
    label: 'Transactions mensuelles',
    data: monthCounts,
    borderColor: '#3b82f6',
    backgroundColor: '#93c5fd',
    tension: 0.3,
    fill: true
  }]
}
</script>

<template>
  <Line :data="data" />
</template>
