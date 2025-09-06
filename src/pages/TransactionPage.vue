<script setup>
import { ref } from 'vue'
import { useTransactionStore } from '@/stores/useTransactionStore'
import Swal from 'sweetalert2'
import router from '@/router'

const store = useTransactionStore()


const form = ref({
  type: '',
  category: '',
  amount: null,
  date: '',
  note: '',
})

const categories = {
  Revenu: ['Salaire', 'Prime', 'Vente','Benefice','Allocations','Cadeaux','Autres revenu'],
  Dépense: ['Transport', 'Loyer','Alimentation', 'Santé', 'Loisirs','Education','Dette','Logement','Autres dépense'],
}

function isValidForm() {
  return (
    form.value.type &&
    form.value.category &&
    form.value.amount &&
    form.value.date
  )
}

function handleSubmit() {
  if (!isValidForm()) {
    Swal.fire({
  toast: true,
  position: 'top-end',
  icon: 'error',
  title: 'Tous les champs obligatoires doivent être remplis.',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: {
    timerProgressBar: 'myProgessbarErr',
  }
})

    return
  }

  store.addTransaction({ ...form.value })
  Swal.fire({
  toast: true,
  position: 'top-end',
  icon: 'success',
  title: 'Transaction ajoutée avec succès !',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  customClass: {
    timerProgressBar: 'myProgessbarSus',
  }
})



  // Reset form
  form.value = {
    type: '',
    category: '',
    amount: null,
    date: '',
    note: '',
  }

  router.push('/')
}
</script>

<template>
  <div
    class="max-w-2xl mx-auto mt-16 bg-white shadow-xl rounded-3xl p-8 sm:p-10 border border-gray-100 transition-all"
  >
    <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6">
      Ajouter une transaction
    </h2>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Type -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
        <select
          v-model="form.type"
          class="w-full appearance-none bg-gray-50 border border-gray-300 text-gray-800 text-sm sm:text-base rounded-xl focus:ring-blue-500 focus:border-blue-500 p-3"
        >
          <option disabled value="">-- Choisir le type --</option>
          <option>Revenu</option>
          <option>Dépense</option>
        </select>
      </div>

      <!-- Catégorie dynamique -->
      <div v-if="form.type">
        <label class="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
        <select
          v-model="form.category"
          class="w-full appearance-none bg-gray-50 border border-gray-300 text-gray-800 text-sm sm:text-base rounded-xl focus:ring-blue-500 focus:border-blue-500 p-3"
        >
          <option disabled value="">-- Choisir une sous-catégorie --</option>
          <option
            v-for="cat in categories[form.type]"
            :key="cat"
            :value="cat"
          >
            {{ cat }}
          </option>
        </select>
      </div>

      <!-- Montant -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Montant</label>
        <input
          type="number"
          v-model.number="form.amount"
          placeholder="Ex: 5000"
          class="w-full bg-gray-50 border border-gray-300 text-sm sm:text-base rounded-xl focus:ring-blue-500 focus:border-blue-500 p-3"
        />
      </div>

      <!-- Date -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
        <input
          type="date"
          v-model="form.date"
          class="w-full bg-gray-50 border border-gray-300 text-sm sm:text-base rounded-xl focus:ring-blue-500 focus:border-blue-500 p-3"
        />
      </div>

      <!-- Note -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Note (optionnel)</label>
        <textarea
          v-model="form.note"
          rows="3"
          placeholder="Ex: salaire, dépense alimentaire..."
          class="w-full bg-gray-50 border border-gray-300 text-sm sm:text-base rounded-xl focus:ring-blue-500 focus:border-blue-500 p-3 resize-none"
        ></textarea>
      </div>

      <!-- Bouton -->
      <div class="flex items-center justify-around">
        <button
          type="submit"
          class=" bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white p-2 rounded-xl font-semibold shadow-md text-sm sm:text-base transition-all"
        >
          Ajouter la transaction
        </button>

      </div>
    </form>


  </div>
</template>





<style>
.myProgessbarErr {
  background-color: #ef4444;
  height: 5px;
}

.myProgessbarSus {
  background-color: #10b981;
}
</style>
