<script>
import { ref } from 'vue';
import Anuncio from '../components/Anuncio.vue';
import Filtro from '../components/filtro.vue';
import HeaderVenda from '@/components/HeaderVenda.vue';



export default {
  components: {
    Anuncio,
    Filtro,
    HeaderVenda
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
  <div class="row">
  <HeaderVenda class="colunm"/>
  </div>
  <div class="container-anuncio">
    <Filtro />
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

.row {
  display: flex;
}

.column {
  flex: 50%;
}
</style>