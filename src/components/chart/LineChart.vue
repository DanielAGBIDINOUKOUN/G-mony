<script setup>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js'
import { useTransactionStore } from '@/stores/useTransactionStore'

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend)

const store = useTransactionStore()

// Préparer des labels par mois (simplifié)
const months = [
  '01', '02', '03', '04', '05', '06',
  '07', '08', '09', '10', '11', '12'
]

const mois = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
]

const monthlyData = months.map(month => {
  const total = store.transactions
    .filter(t => t.date.slice(5, 7) === month)
    .reduce((sum, t) => sum + t.amount, 0)
  return total
})

const data = {
  labels: mois.map(m => `${m}`),
  datasets: [
    {
      label: 'Total mensuel',
      data: monthlyData,
      borderColor: '#6366f1',
      backgroundColor: '#a5b4fc',
      tension: 0.3,
      fill: true
    }
  ]
}

const options = {
  responsive: true,
  plugins: {
    legend: { position: 'top' }
  }
}
</script>

<template>
  <Line :data="data" :options="options" />
</template>
