<template>
  <div class="bg-gray-50 w-full text-gray-800 pb-20 mt-16">
    <!-- Header -->
    <div class="bg-white shadow-sm py-12 px-4 sm:px-6 text-center">
      <h1 class="text-3xl sm:text-4xl font-bold text-gray-900">
        À propos de <span class="text-indigo-600">G-MONY</span>
      </h1>
      <p class="mt-4 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
        G-MONY est une application de gestion financière simple, élégante et puissante, conçue pour vous aider à mieux suivre vos revenus et dépenses.
      </p>
    </div>

    <!-- Mission -->
    <section class="py-16 px-4 sm:px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      <img
        src="/public/image.png"
        alt="Gestion financière"
        class="rounded-xl shadow-lg w-full object-cover"
      />

      <div>
        <h2 class="text-2xl font-bold text-gray-800 mb-4">💼 Notre mission</h2>
        <p class="text-gray-600 leading-relaxed text-base">
          Notre objectif est de permettre à chacun de reprendre le contrôle de ses finances grâce à une interface claire, des filtres puissants, et des statistiques en temps réel. G-MONY s’adresse à tous : étudiants, entrepreneurs, familles ou particuliers.
        </p>
        <p class="text-gray-600 mt-4">
          En quelques clics, vous enregistrez vos revenus et dépenses, vous visualisez vos finances et vous prenez des décisions éclairées.
        </p>
      </div>
    </section>

    <!-- Avantages -->
    <section class="bg-white py-16 px-4 sm:px-6">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-10">✨ Pourquoi choisir G-mony ?</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard title="📱 Interface moderne" text="Une expérience fluide avec Vue.js 3 + Tailwind CSS." />
          <FeatureCard title="💰 Suivi en temps réel" text="Revenus, dépenses et solde toujours à jour." />
          <FeatureCard title="🎯 Statistiques visuelles" text="Analyse graphique avec Chart.js intégré." />
          <FeatureCard title="🔐 Sécurité locale" text="Données stockées uniquement sur votre appareil." />
          <FeatureCard title="📊 Filtres puissants" text="Trouvez vite ce que vous cherchez par date, type, etc." />

        </div>
      </div>
    </section>

    <!-- Créateur -->
    <section class="py-20 px-4 sm:px-6 w-full mx-auto">
      <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">👨‍💻 Créé par un passionné</h2>
      <div class="bg-white rounded-xl shadow-md p-6 text-center">

        <h3 class="text-xl font-semibold text-gray-900">Daniel AGBIDINOUKOUN</h3>
        <p class="text-gray-600 mt-2">
          Développeur passionné basé à Cotonou 🇧🇯, j’ai conçu G-MONY pour aider chacun à mieux gérer ses finances personnelles.
        </p>

        <!-- Boutons -->
        <div class="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="mailto:danielagbidinoukoun0@gmail.com"
            class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow text-sm transition"
          >
            ✉️ Me contacter
          </a>
          <a
            href="https://wa.me/2290142085916"
            target="_blank"
            class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow text-sm transition"
          >
            💬 WhatsApp
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>

import FeatureCard from '../components/FeatureCard.vue'

</script>
