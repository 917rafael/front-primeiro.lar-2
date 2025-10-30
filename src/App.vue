<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Footer from '@/components/Footer.vue'
import { useRoute } from 'vue-router'

const route = useRoute();
</script>

<template>
  <RouterView />
  <Footer v-if="!route.path.includes('vendas')" />
</template>

<style scoped>
</style>
