<script>
import { ref } from 'vue';
import Anuncio from '../components/Anuncio.vue';
import Filtro from '../components/filtro.vue';
import HeaderVenda from '../components/HeaderVenda.vue';

export default {
  components: {
    Anuncio,
    Filtro,
  HeaderVenda,
  },
  setup() {
    const filtroAberto = ref(true);
    const toggleFiltro = () => {
      filtroAberto.value = !filtroAberto.value;
    };
    return { filtroAberto, toggleFiltro };
  }
};
</script>

<template>
  <HeaderVenda />
  <Filtro :filtro-aberto="filtroAberto" :toggle-filtro="toggleFiltro" />
  <div :class="['container-anuncio', { 'filtro-aberto': filtroAberto }]">
    <div class="alinha-direita">
      <Anuncio/>
      <Anuncio/>
      <Anuncio/>
      <Anuncio/>
    </div>
  </div>
</template>

<style scoped>

.container-anuncio {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: #f4f4f4;
  padding: 5rem;
  transition: filter 0.3s, opacity 0.3s;
}

.container-anuncio.filtro-aberto {
  /* Em telas pequenas, esconde os cards visualmente */
  z-index: 0;
}

@media (max-width: 900px) {
  .container-anuncio.filtro-aberto {
    filter: blur(2px);
    opacity: 0.2;
    pointer-events: none;
    user-select: none;
  }
}

.alinha-direita {
  width: 100%;
  max-width: 800px;
  margin-right: 10%;
}



</style>