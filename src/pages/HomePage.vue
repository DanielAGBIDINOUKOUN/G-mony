<template>
<template v-if="!useAuthStore().isLoggedIn">
  <main class="pt-24 bg-background dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100">
    <section class="text-center px-6 py-20 max-w-3xl mx-auto">
      <h1 class="text-3xl md:text-5xl font-bold text-heading mb-4 animate-fadeIn">
        G-Mony, gérez votre argent avec confiance.
      </h1>
      <p class="text-md md:text-xl text-zinc-600 dark:text-zinc-300 mb-8">
        Suivez vos dépenses, planifiez vos budgets et maîtrisez vos finances au quotidien.
      </p>
      <RouterLink
        to="/register"
        class="bg-primary text-white px-6 py-3 rounded-lg text-base font-semibold shadow hover:bg-blue-700 transition"
      >
        Créer un compte gratuitement
      </RouterLink>
    </section>

    <section class="grid md:grid-cols-3 gap-8 px-6 py-12 max-w-6xl mx-auto">
      <div class="bg-white dark:bg-zinc-800 rounded-xl shadow p-6 text-left">
        <p><i class="text-h3 py-3 text-heading fas fa-exchange-alt"></i></p>
        <h2 class="text-xl font-semibold text-heading mb-2">Transactions</h2>

        <p class="text-sm text-zinc-500 dark:text-zinc-300">
          Enregistrez vos revenus et dépenses facilement et consultez-les à tout moment.
        </p>
      </div>
      <div class="bg-white dark:bg-zinc-800 rounded-xl shadow p-6 text-left">
        <p><i class="text-h3 py-3 text-heading fas fa-chart-line"></i></p>
        <h2 class="text-xl font-semibold text-heading mb-2">Statistiques</h2>

        <p class="text-sm text-zinc-500 dark:text-zinc-300">
          Visualisez vos finances sous forme de graphiques interactifs et rapports.
        </p>
      </div>
      <div class="bg-white dark:bg-zinc-800 rounded-xl shadow p-6 text-left">
        <p><i class="text-h3 py-3 text-heading fas fa-tachometer-alt"></i></p>
        <h2 class="text-xl font-semibold text-heading mb-2">Dashbord</h2>

        <p class="text-sm text-zinc-500 dark:text-zinc-300">
          Obtenez une vue d'ensemble de vos finances avec des graphiques et des résumés.
        </p>
      </div>
    </section>
  </main>
</template>


<template v-else>
  <div class="p-6 max-w-7xl mx-auto space-y-10 mt-16">
    <!-- 🔹 Titre principal -->
    <h1 class="text-4xl font-bold text-gray-900 tracking-tight">📋 Transactions</h1>

    <!-- 🎛️ Filtres -->
    <div class="bg-white p-6 rounded-3xl  space-y-4">
      <!-- Filtres avec option par défaut -->
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 text-sm sm:text-base">
        <!-- Type -->
        <select v-model="filters.type" class="filter-select">
          <option value="" selected>Tous les types</option>
          <option value="Revenu">Revenu</option>
          <option value="Dépense">Dépense</option>
        </select>

        <!-- Catégorie -->
        <select v-model="filters.category" class="filter-select">
          <option value="" selected>Toutes les catégories</option>
          <option v-for="cat in allCategories" :key="cat" :value="cat">{{ cat }}</option>
        </select>

        <!-- Période -->
        <select v-model="filters.period" class="filter-select">
          <option value="" selected>Toutes les périodes</option>
          <option value="today">Aujourd’hui</option>
          <option value="week">Cette semaine</option>
          <option value="month">Ce mois</option>
        </select>

        <!-- Tri -->
        <select v-model="filters.sortBy" class="filter-select">
          <option value="date" selected>Trier par date</option>
          <option value="amount">Trier par montant</option>
        </select>
      </div>

      <!-- 🔄 Bouton de reset -->
      <div class="pt-2 flex ">
        <button
          @click="filterStore.resetFilters"
          class="inline-flex items-center gap-2 cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          Réinitialiser les filtres
        </button>
        <RouterLink to="/transaction">
                  <button class="inline-flex items-center cursor-pointer gap-2 ml-4 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition"> <i class="fas fa-plus text-primary"></i> Ajoutez de nouvelles transactions</button>
    </RouterLink>
      </div>
    </div>

    <!-- 🔎 Si aucune transaction -->
    <div v-if="filteredTransactions.length === 0" class="text-center text-gray-400 italic mt-8">
      Aucune transaction ne correspond aux filtres.
    </div>

    <!-- 📦 Transactions -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <div
    v-for="t in filteredTransactions"
    :key="t.id"
    :class="[

      'relative  p-6 rounded-2xl flex flex-col justify-between items-start transition-all duration-300',
      t.type === 'Dépense' ? 'border-l-4 border-danger' : 'border-l-4 border-success'
    ]"
      class="bg-white relative p-6 rounded-xl  flex justify-between items-center"
    >
      <div class="w-full">
        <h3 class="text-lg font-bold mb-2 text-blue-900 flex items-center gap-2">
          <i :class="t.type === 'Dépense' ? 'fas fa-arrow-down text-danger' : 'fas fa-arrow-up text-success'"></i>
          {{ t.title }}
        </h3>
        <p class="text-sm text-blue-700 py-1 font-semibold">
          {{ t.category }} • {{ t.type }} • <span class="font-bold">{{ t.amount }} FCFA</span>
        </p>
        <p class="text-xs text-blue-500 py-1 italic">{{ t.note }}</p>
        <p class="text-xs text-gray-400 py-1">{{ new Date(t.date).toLocaleDateString() }}</p>
      </div>
      <button
        @click="confirmDelete(t.id)"
        class="text-red-500 hover:text-red-700 absolute top-4 right-4 transition text-xl bg-white rounded-full p-2 shadow"
        title="Supprimer"
      >
        <i class="fas fa-trash"></i>
      </button>
    </div>
  </div>
  </div>
</template>


</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/useAuthStore'
import Swal from 'sweetalert2'

import { useTransactionStore } from '@/stores/useTransactionStore'

const transactionStore = useTransactionStore()

// Accès aux filtres en v-model
const {
  filters,
  filteredTransactions
} = storeToRefs(transactionStore)

// Suppression avec alerte
const confirmDelete = async (id) => {
  const result = await Swal.fire({
    title: 'Confirmer la suppression',
    text: 'Voulez-vous vraiment supprimer cette transaction ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e3342f',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Annuler',
  })

  if (result.isConfirmed) {
    transactionStore.deleteTransaction(id)
    Swal.fire('Supprimé !', 'La transaction a été supprimée.', 'success')
  }
}


// Liste globale des catégories (à adapter selon ton projet)
const allCategories = [
  'Salaire', 'Prime', 'Vente','Benefice','Allocations','Cadeaux','Transport', 'Loyer','Alimentation', 'Santé', 'Loisirs','Education','Dette','Logement','Autres depense','Autres revenu'
]
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.5s ease-in-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.filter-select{
  border: 2px solid rgba(77, 125, 214, 0.945);
  border-radius: 10px;
}
</style>
