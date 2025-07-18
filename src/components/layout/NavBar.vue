<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';


const handleLogout = () => {
  useAuthStore().logout();
  router.push('/login')
}

const mobileOpen = ref(false);

const navLinks = [
  { name: 'Accueil', href: '/' },
  { name: 'À propos', href: '/about' },
  { name: 'Statistique', href: '/stats' },
  { name: 'Dashboard', href: '/dashbord' },
  { name: 'Transactions', href: '/transaction' },
];
</script>

<template>
  <header
    class="fixed top-0 inset-x-0 z-50 shadow-soft bg-white  backdrop-blur-md transition duration-300"
  >
    <nav class="max-w-7xl mx-auto px-4 small:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="">
          <p class="ml-2 text-primary font-bold text-h3"> G-mony </p>
        </div>

        <!-- Navigation links -->
        <div class="hidden md:flex items-center space-x-6">
          <ul class="flex items-center">
            <li v-if="useAuthStore().isLoggedIn">
              <RouterLink
            v-for="link in navLinks"
            :key="link.name"
            :to="link.href"
            class="text-small font-medium mr-5 focus:text-primary text-text hover:text-primary transition"
          >
            {{ link.name }}
          </RouterLink>
          </li>
          <li v-if="useAuthStore().isLoggedIn">
            <button @click="handleLogout" class="bg-primary w-full cursor-pointer text-background p-2 rounded-sm">Deconnexion</button>
          </li>
            <li v-else>
              <RouterLink to="/login">
            <button class="bg-primary cursor-pointer text-background p-2 rounded-sm">Se connecter</button>
          </RouterLink>
            </li>
          </ul>


        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <RouterLink to="/login"  v-if="!useAuthStore().isLoggedIn">
            <button class="bg-primary cursor-pointer text-background p-2 rounded-sm">Se connecter</button>
          </RouterLink>
          <button v-if="useAuthStore().isLoggedIn"
            @click="mobileOpen = !mobileOpen"
            class="text-primary focus:outline-none"
          >
          <i v-if="!mobileOpen" class="fas fa-bars text-base"></i>
            <i v-else class="fas fa-times text-base"></i>

          </button>
        </div>
      </div>
    </nav>

    <!-- Mobile menu with Vue transition -->
    <transition name="slide-fade">
      <div
         v-if="mobileOpen"
        class="md:hidden px-4 pt-2 pb-4 space-y-1 bg-white shadow-md"
      >
        <ul class="flex flex-col ">
          <li v-if="useAuthStore().isLoggedIn">
            <RouterLink
          v-for="link in navLinks"
          :key="link.name"
          :to="link.href"
          class="block text-small ml-2 mb-4 font-medium text-text focus:text-primary hover:text-primary transition  duration-300 all"
        >
          {{ link.name }}
        </RouterLink>


          </li>
          <li v-if="useAuthStore().isLoggedIn">
            <button @click="handleLogout" class="bg-primary w-full cursor-pointer text-background p-2 rounded-sm"> <i class="fas fa-sign-out-alt"></i> Deconnexion</button>
          </li>
          <li class="" v-else>
<RouterLink to="/login">
            <button class="cursor-pointer  bg-primary text-center w-full mt-2 text-background p-2 rounded-sm"> <i class="fas fa-sign-in-alt"></i>Se connecter</button>
          </RouterLink>
          </li>
        </ul>


      </div>
    </transition>
  </header>
</template>



<style scoped>
/* Fade in animation for the navbar */
header {
  animation: fadeIn 0.4s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Vue slide-fade transition */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.slide-fade-enter-to,
.slide-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
