<script setup>
import MainLayout from "./layouts/MainLayout.vue";
import AuthLayout from "./layouts/AuthLayout.vue";
import AnimationPage from "./components/Animation/AnimationPage.vue"
import  InstallPrompt from "./components/InstallPrompt.vue";
import { useRoute } from "vue-router";

const route = useRoute()
</script>

<template>

<AnimationPage>
<component :is="route.meta.layout === 'auth'? AuthLayout: MainLayout">

 <router-view />

</component>


</AnimationPage>

<InstallPrompt />

</template>

<style scoped>
#__vue-devtools-container__ {
  display: none;
}
</style>
