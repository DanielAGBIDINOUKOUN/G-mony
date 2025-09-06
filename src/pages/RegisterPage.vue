<script setup>
import { ref, watch } from 'vue';
import { useAuthStore } from '../stores/useAuthStore';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2'
const name = ref('')
const email = ref('')
const password = ref('')
const Conpassword = ref('')
const checked = ref('')
const errorName = ref('')
const errorEmail = ref('')
const errorPassword = ref('')
const errorConPassword = ref('')
const errorChecked = ref('')
const submiTed = ref(false)
const router = useRouter()
const isPassword = ref(false);
const togglePassword = () => {
  isPassword.value = !isPassword.value
}

const isConPassword = ref(false);
const toggleConPassword = () => {
  isConPassword.value = !isConPassword.value
}

  function isValidEmail(value) {
  return /\S+@\S+\.\S+/.test(value)
}

function isStrongPassword(value) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%^&*?])[A-Za-z\d@$!#%^&*?]{8,}$/.test(value)
}

 // 🧠 Validation en direct
 watch(name, (val) => {
  if (!submiTed.value) {
    if (!val.trim()){
    errorName.value = 'Champ requis'
} else {
    errorName.value = ''
}
  }

})

watch(email, (val) => {
  if (!submiTed.value) {
    if (!val.trim()){
    errorEmail.value = 'Champ requis'
} else if (!isValidEmail(val)) {
    errorEmail.value = 'Email invalide'
} else {
    errorEmail.value = ''
}
  }

})

watch(password, (val) => {
 if (!submiTed.value) {
   if (!val.trim()) {
    errorPassword.value = 'Champ requis'
} else if (!isStrongPassword(val)) {
    errorPassword.value = 'Mot de passe trop faible'
} else {
    errorPassword.value = ''
}
 }
})

watch(Conpassword, (val) => {
 if (!submiTed.value) {
   if (val !== password.value) {
    errorConPassword.value = 'Confirmer votre mot de passe'
}  else {
    errorConPassword.value = ''
}
 }
})

watch(checked, (val) => {
  if (!submiTed.value) {
    if(!val) {
    errorChecked.value = 'Acceptez nos conditions et règle'
   } else {
    errorChecked.value = ''
   }
  }
})

function handleRegister() {
  submiTed.value = true

  if (!name.value.trim()) {
    errorName.value = 'Nom requis'
  }  else {
    errorName.value = ''
  }

    if (errorEmail.value === !errorEmail.value.trim()) {
    errorEmail.value = 'Email requis'
  } else if(!isValidEmail(email.value)) {
    errorEmail.value = 'Email in valide'
  } else{
    errorEmail.value = ''
  }

    if (errorPassword.value === !errorPassword.value.trim()) {
    errorPassword.value = 'Mot de passe requis'
  } else if(!isStrongPassword(password.value)) {
    errorPassword.value = 'Mot de passe faible'
  } else{
    errorPassword.value = ''
  }

  if (!checked.value) {
    errorChecked.value = 'Acceptez nos condition et règle'
  } else  {
errorChecked.value = ''
  }

  if (Conpassword.value.trim() !== password.value.trim()) {
    errorConPassword.value = 'Confirmer votre mot de passe'
  } else{
    errorConPassword.value = ''
  }

  if (!checked.value) {
    errorChecked.value = 'Acceptez nos condition et règle'
  } else  {
errorChecked.value = ''
  }

   if (!errorEmail.value && !errorPassword.value && !errorChecked.value && !errorConPassword.value && !errorName.value) {
       const success = useAuthStore().register({name: name.value , email: email.value, password: password.value})

console.log(email.value)
   if(success) {
          Swal.fire({
  toast: true,
  position: 'top-end',
  icon: 'success',
  title: 'Inscription réussie',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: {
    timerProgressBar: 'myProgessbarSus',
  }
})

setTimeout(() => {
  router.push('/login')
}, 3000);

  } else {
    Swal.fire({
  toast: true,
  position: 'top-end',
  icon: 'error',
  title: 'Email déja utilisé',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: {
    timerProgressBar: 'myProgessbarErr',
  }
  })

}
  } else {
    Swal.fire({
  toast: true,
  position: 'top-end',
  icon: 'error',
  title: 'Validé tout les champs',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: {
    timerProgressBar: 'myProgessbarErr',
  }
  })
  }
  }




</script>
<template>
<div class="hidden lg:flex flex-col justify-center item-center h-[110vh] md:w-1/2 bg-primary">
    <p class="text-background text-center text-h2 font-extrabold">Bienvenu sur G-mony</p>
    <p class="text-background text-center text-h3 font-semibold">
      L'outil simple et puissant pour suivre, planifier et optimiser vos finances
    </p>
  </div>

  <form
    @submit.prevent="handleRegister"
    class="md:mx-18 md:w-1/2 mx-1 text-text p-6 py-14 shadow-soft lg:shadow-none"
  >
    <div class="my-4 mb-10">
      <h1 class="font-semibold text-2xl">Inscription</h1>
    </div>

    <div class="relative flex flex-col mb-2">
      <label for="" class="font-semibold text-small mb-2">Nom</label>
      <input
        v-model="name"
        type="text"
        :class=" [errorName ? 'border-red-500': (name  && !errorName ? 'border-green-500': '')]"
        class="pl-7 focus:ring-0 text-micro border-2 bg-gray-200 border-blue-600 p-3 rounded-md"
      />
      <i class="fas fa-envelope absolute bottom-4 left-2"></i>
    </div>
    <p v-if="errorName" class="text-danger text-small">{{ errorName }}</p>

    <div class="relative flex flex-col mb-2">
      <label for="" class="font-semibold text-small mb-2">Email</label>
      <input
        v-model="email"
        type="email"
        :class=" [errorEmail ? 'border-red-500': (email  && !errorEmail ? 'border-green-500': '')]"
        class="pl-7 focus:ring-0 text-micro border-2 bg-gray-200 border-blue-600 p-3 rounded-md"
      />
      <i class="fas fa-envelope absolute bottom-4 left-2"></i>
    </div>
    <p v-if="errorEmail" class="text-danger text-small">{{ errorEmail }}</p>
    <div class="relative flex flex-col mb-3">
      <label for="" class="font-semibold text-small mb-2">Mot de passe</label>
      <input
        v-model="password"
        :class="[errorPassword ? 'border-red-500': (password  && !errorPassword ? 'border-green-500': '')]"
        :type="isPassword ? 'text' : 'password'"
        class="pl-7 focus:ring-0 text-micro border-2 bg-gray-200 border-blue-600 p-3 rounded-md"
      />
      <i class="fas fa-lock absolute bottom-4 left-2"></i>
      <i
        :class="isPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
        class="absolute bottom-4 cursor-pointer right-2"
        @click="togglePassword"
      ></i>
      <!-- Bloc de critères stylés pour le mot de passe -->
      <ul v-if="password" class="mt-2 text-xs rounded-lg bg-red-50 p-3 border border-red-200 shadow space-y-1">
        <li :class="{'text-green-600': /[A-Z]/.test(password), 'text-red-500': !/[A-Z]/.test(password)}">
          <i :class="{'fas fa-check-circle': /[A-Z]/.test(password), 'fas fa-times-circle': !/[A-Z]/.test(password)}"></i>
          Au moins une lettre majuscule
        </li>
        <li :class="{'text-green-600': /[a-z]/.test(password), 'text-red-500': !/[a-z]/.test(password)}">
          <i :class="{'fas fa-check-circle': /[a-z]/.test(password), 'fas fa-times-circle': !/[a-z]/.test(password)}"></i>
          Au moins une lettre minuscule
        </li>
        <li :class="{'text-green-600': /\d/.test(password), 'text-red-500': !/\d/.test(password)}">
          <i :class="{'fas fa-check-circle': /\d/.test(password), 'fas fa-times-circle': !/\d/.test(password)}"></i>
          Au moins un chiffre
        </li>
        <li :class="{'text-green-600': /[@$!#%^&*?]/.test(password), 'text-red-500': !/[@$!#%^&*?]/.test(password)}">
          <i :class="{'fas fa-check-circle': /[@$!#%^&*?]/.test(password), 'fas fa-times-circle': !/[@$!#%^&*?]/.test(password)}"></i>
          Au moins un symbole (@$!#%^&*?)
        </li>
        <li :class="{'text-green-600': password.length >= 8, 'text-red-500': password.length < 8}">
          <i :class="{'fas fa-check-circle': password.length >= 8, 'fas fa-times-circle': password.length < 8}"></i>
          Minimum 8 caractères
        </li>
      </ul>
    </div>
    <p v-if="errorPassword" class="text-danger text-small mb-3">{{ errorPassword }}</p>

    <div class="relative flex flex-col mb-3">
      <label for="" class="font-semibold text-small mb-2">Confirmation Mot de passe</label>
      <input
        v-model="Conpassword"
        :class="[errorConPassword ? 'border-red-500': (Conpassword  && !errorConPassword ? 'border-green-500': '')]"
        :type="isConPassword ? 'text' : 'password'"
        class="pl-7 focus:ring-0 text-micro border-2 bg-gray-200 border-blue-600 p-3 rounded-md"
      />
      <i class="fas fa-lock absolute bottom-4 left-2"></i>
      <i
        :class="isConPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
        class="absolute bottom-4 cursor-pointer right-2"
        @click="toggleConPassword"
      ></i>
    </div>
    <p v-if="errorConPassword" class="text-danger text-small mb-3">{{ errorConPassword }}</p>

    <div class="flex flex-row items-center">
      <input v-model="checked" type="checkbox" class=" cursor-pointer focus:ring-0"  />
      <span class="text-small px-2">Acceptez nos conditions et règle</span>
    </div>
    <p v-if="errorChecked" class="text-danger text-small mb-3">{{ errorChecked }}</p>

    <button class="bg-primary w-full p-3 rounded-md text-background mt-4 cursor-pointer">
      S'inscrire
    </button>

    <p class="text-small mt-4">
      Si vous avez de compte
      <RouterLink class="text-primary" to="/login">Connectez vous</RouterLink>
    </p>
  </form>


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
