<template>
  <div class="bg-indigo-50 p-6 rounded-xl shadow hover:shadow-md transition">
    <h3 class="text-xl font-semibold text-indigo-700 mb-2">{{ title }}</h3>
    <p class="text-gray-600">{{ text }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  text: String,
})
</script>
