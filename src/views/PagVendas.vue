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
    <HeaderVenda class="column"/>
  </div>
  <div class="container-anuncio">
    <!-- <Filtro class="filtro-side" /> -->
    <div class="alinha-direita">
      <Anuncio :imovel-id="1"/>
      <Anuncio :imovel-id="2"/>
      <Anuncio :imovel-id="3"/>
      <Anuncio :imovel-id="4"/>
    </div>
  </div>
</template>

<style scoped>
.container-anuncio {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  margin-left: 0;
  background-color: #f4f4f4;
  padding: clamp(1rem, 4vw, 3rem);
  gap: 1rem;
}

.filtro-side {
  position: static;
  top: auto;
  max-width: 100%;
  flex: 1 1 auto;
}

/* lista de anúncios em grid fluido */
.alinha-direita {
  width: 100%;
  max-width: 1200px;
  margin-right: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

/* remover efeitos de blur em mobile caso existam */
@media (max-width: 900px) {
  .container-anuncio {
    filter: none;
    opacity: 1;
    pointer-events: auto;
    user-select: auto;
  }

  .alinha-direita {
    grid-template-columns: 1fr;
  }

  :deep(.property-card-wrapper) {
    margin-left: 0;
  }
}

/* Força 1 card por linha acima de 900px */
@media (min-width: 901px) {
  .alinha-direita { grid-template-columns: 1fr; }
}
</style>
