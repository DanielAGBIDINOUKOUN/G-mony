<script setup>
defineProps({
  name: {
    type: String,
    default: 'fade-slide'
  },
  mode: {
    type: String,
    default: 'out-in'
  }
})
</script>
<template>
  <transition :name="name" :mode="mode">
    <slot></slot>
  </transition>

</template>

<style scoped>
/* .fade-slide-enter-active, .fade-slide-leave-active{
  transition: opacity 4s ease, tansform 0.4 ease ;
}

.fade-slide-enter-form{
  opacity: 0;
  transform: translateY(12px)
}

.fade-slide-enter-to{
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-form{
  opacity: 1;
  transform: translateY(0)
}

.fade-slide-leave-to{
  opacity: 0;
  transform: translateY(-12px);
} */
  .fade-slide-enter-active, .fade-slide-leave-active {
    transition: all 0.5s ease;
  }
  .fade-slide-enter-from {
    opacity: 0;
    transform: translateY(-10px);
  }
  .fade-slide-enter-to {
    opacity: 1;
    transform: translateY(0);
  }
  .fade-slide-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
  .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
</style>
