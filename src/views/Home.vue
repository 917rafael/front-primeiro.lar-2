<script setup>
import Header from '@/components/Header.vue';
</script>
<template>
  <Header />
  <div class="img-destaque">
    <img src="@/assets/img/image.png" alt="Imagem em destaque" />
  </div>
</template>

<style scoped>
.img-destaque {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 90vh;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  overflow: hidden;
}
.img-destaque img {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  border-radius: 0;
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
  image-rendering: auto;
  image-rendering: crisp-edges;
  image-rendering: -webkit-optimize-contrast;
}

@media (max-width: 700px) {
  .img-destaque img {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  }
}
</style>