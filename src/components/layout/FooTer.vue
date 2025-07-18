<template>
  <div>

      <footer class="bg-heading w-full text-background py-10 mt-10">
        <div class="min-w-full px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <!-- Présentation -->
          <div>
            <h2 class="text-2xl font-bold text-background mb-3">
              <i class="fas fa-wallet mr-2"></i>G-MONY
            </h2>
            <p class="text-sm leading-relaxed">
              G-MONY vous aide à garder le contrôle de vos finances personnelles. Gérez vos revenus, suivez vos dépenses et analysez vos statistiques simplement.
            </p>
          </div>

          <!-- Contact & Réseaux sociaux -->
          <div class="flex flex-col gap-3">
            <div>
              <p class="text-sm">
                <i class="fas fa-envelope text-background mr-2"></i>support@g-mony.com
              </p>
              <p class="text-sm mt-2">
                <i class="fas fa-phone text-background mr-2"></i>+229 01 42 08 59 16
              </p>
            </div>

            <div class="flex space-x-4 mt-4 text-lg">
              <a href="#" class="hover:text-gray-300"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="hover:text-gray-300"><i class="fab fa-instagram"></i></a>
              <a href="#" class="hover:text-gray-300"><i class="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>

        <div class="mt-10 border-t border-background pt-4 text-center text-xs text-background">
          &copy; {{ year }} G-MONY. Tous droits réservés.
        </div>
      </footer>

  </div>
</template>

<script setup>
const year = new Date().getFullYear();
</script>

<style scoped>

</style>
