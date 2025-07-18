<script setup>
import Navbar from "../components/layout/NavBar.vue";
import Footer from "../components/layout/FooTer.vue";
</script>

<template>
<div class="bg-background min-h-screen flex flex-col justify-center items-center">
  <Navbar />
  <slot></slot>
  <Footer />
</div>
</template>
