<script>
import Anuncio from '@/components/Anuncio.vue';

export default {
  components: {
    Anuncio,
  },
};
</script>

<template>
  <div class="container-anuncio">
    <div class="alinha-direita">
      <Anuncio />
      <Anuncio />
      <Anuncio />
      <Anuncio />
    </div>
  </div>
</template>

<style scoped>
.container-anuncio {
  display: flex;
  justify-content: flex-end; /* alinha tudo para a direita */
  align-items: center;       /* centraliza verticalmente */
  height: 100%;
  width: 100%;
  background-color: #f4f4f4;
  padding: 5rem;
}

.alinha-direita {
  width: 100%;
  max-width: 800px;
  margin-right: 5%;
}
</style>
