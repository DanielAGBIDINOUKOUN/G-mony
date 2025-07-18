<template>
  <div class="min-h-screen flex items-center justify-center bg-background dark:bg-zinc-900 text-center p-6">
    <div class="max-w-xl">
      <h1 class="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 class="text-2xl font-semibold text-heading dark:text-white mb-2">Page non trouvée</h2>
      <p class="text-zinc-600 dark:text-zinc-300 mb-6">
        Oups ! La page que vous cherchez n'existe pas ou a été déplacée.
      </p>
      <RouterLink
        to="/"
        class="inline-block bg-primary text-white px-5 py-3 rounded-lg shadow hover:bg-blue-700 transition"
      >
        Retour à l'accueil
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
// Page 404 - NotFound.vue
</script>
