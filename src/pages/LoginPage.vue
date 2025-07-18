<script setup>
import { useAuthStore } from '../stores/useAuthStore';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2'
const email = ref('')
const password = ref('')
const checked = ref('')
const errorEmail = ref('')
const errorPassword = ref('')
const errorChecked = ref('')
const submiTed = ref(false)
const router = useRouter()
// const auth = useAuthStore()

// function isValidEmail(value) {
//   return
//   /
//   \S+@\S+\.\S+/.test(value)

// }



  // if (!isValidEmail(email.value)) {
  //   errorEmail.value = 'Email invalide'
  // }

  // if(email.value.trim() === '') {
  //  errorEmail.value = 'Entrez votre email'
  // } else {
  //   errorEmail.value = ''
  // }

  // if(password.value.trim() === '' ) {
  //   errorPassword.value = 'Entrez votre mot de passe'
  // } if (password.value.trim().length < 7) {
  //   errorPassword.value = 'Mot de passe trop court'
  // } else {
  //   errorPassword.value = ''
  // }



  // if(checked.value.trim() === '') {
  //  errorChecked.value = 'Acceptez nos conditions et règle'
  // }

  function isValidEmail(value) {
  return /\S+@\S+\.\S+/.test(value)
}

function isStrongPassword(value) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%^&*?])[A-Za-z\d@$!#%^&*?]{8,}$/.test(value)
}

 // 🧠 Validation en direct
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

watch(checked, (val) => {
  if (!submiTed.value) {
    if(!val) {
    errorChecked.value = 'Acceptez nos conditions et règle'
   } else {
    errorChecked.value = ''
   }
  }
})

function handleLogin() {
  submiTed.value = true

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

  if (!errorEmail.value && !errorPassword.value && !errorChecked.value) {
      const succes = useAuthStore().login(email.value, password.value)
  console.log(email.value)
  if(succes) {

    setTimeout(() => {
      router.push('/')
}, 3000);
          Swal.fire({
  toast: true,
  position: 'top-end',
  icon: 'success',
  title: 'Connexion réussie',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: {
    timerProgressBar: 'myProgessbarSus',
  }
})
  }
   else {

    Swal.fire({
  toast: true,
  position: 'top-end',
  icon: 'error',
  title: 'Email ou mot de passe incorrect',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: {
    timerProgressBar: 'myProgessbarErr',
  }
})
  }

  console.log('connexion en cour')
  }

}
const isPassword = ref(false);
const togglePassword = () => {
  isPassword.value = !isPassword.value
}
</script>

<template>
  <div class="hidden lg:flex flex-col justify-center item-center min-h-screen md:w-1/2 bg-primary">
    <p class="text-background text-center text-h2 mb-2 font-extrabold">Ravie de vous revoir sur G-mony</p>
    <p class="text-background text-center text-h3 font-semibold">
      Connectez-vous pour suivre vos finances et rester sur la bonne voie
    </p>
  </div>

  <form
    @submit.prevent="handleLogin"
    class="md:mx-18 md:w-1/2 mx-1 text-text p-6 py-14 shadow-soft lg:shadow-none"
  >
    <div class="my-4 mb-10">
      <h1 class="font-semibold text-2xl ">Connexion</h1>

    </div>

    <div class="relative flex flex-col mb-2">
      <label for="" class="font-semibold text-small mb-2">Email</label>
      <input
        v-model="email"
        type="email"
        :class=" [errorEmail ? 'border-red-500': (email  && !errorEmail ? 'border-green-500': '')]"
        class="pl-7 focus:ring-0 text-micro border-2 border-blue-600 p-3 rounded-md"
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
        class="pl-7 focus:ring-0 text-micro border-2 border-blue-600 p-3 rounded-md"
      />
      <i class="fas fa-lock absolute bottom-4 left-2"></i>
      <i
        :class="isPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
        class="absolute bottom-4 cursor-pointer right-2"
        @click="togglePassword"
      ></i>
    </div>
    <p v-if="errorPassword" class="text-danger text-small mb-3">{{ errorPassword }}</p>
    <div class="flex flex-row items-center">
      <input v-model="checked" type="checkbox" class="focus:ring-0 cursor-pointer focus:ring-0"  />
      <span class="text-small px-2">Acceptez nos conditions et règle</span>
    </div>
    <p v-if="errorChecked" class="text-danger text-small mb-3">{{ errorChecked }}</p>

    <button class="bg-primary w-full p-3 rounded-md text-background mt-4 cursor-pointer">
      Se connectez
    </button>

    <p class="text-small mt-4">
      Si vous n'avez pas de compte
      <RouterLink class="text-primary" to="/register">inscrivez vous</RouterLink>
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
