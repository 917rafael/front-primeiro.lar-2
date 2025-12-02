<script>
import { ref } from 'vue';
import AnuncioDescricao from '../components/DescricaoCard.vue';
import Filtro from '../components/filtro.vue';
import HeaderVenda from '@/components/HeaderVenda.vue';

export default {
  components: {
    AnuncioDescricao,
    Filtro,
    HeaderVenda
  },
   data() {
    return {
      imoveis: [
        {
          id: 1,
          titulo: 'Apartamento Moderno',
          endereco: 'Rua das Flores, 123',
          imagem: '/img/apto1.jpg',
          tipo: 'Venda',
          categoria: 'Apartamento',
          preco: 'R$ 450.000',
          area: '85m²',
          quartos: 3,
          banheiros: 2,
          vagas: 2,
          caracteristicas: ['Piscina', 'Academia', 'Sacada'],
          descricao: 'Lindo apartamento...'
        }
      ]
    };
  },
  methods: {
    handleToggleFavorito(id) {
      // Lógica para adicionar/remover favorito
      console.log('Toggle favorito:', id);
    }
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
    <div class="btn-toggle-mobile-filtro-global-wrapper">
      <button
        v-if="!filtroAberto"
        class="btn-toggle-mobile-filtro-global"
        @click="toggleFiltro"
      >
        Mostrar Filtro
      </button>
    </div>
    <Filtro
      class="filtro-side"
      :filtroAberto="filtroAberto"
      :toggleFiltro="toggleFiltro"
      v-show="filtroAberto"
    />
    <div class="alinha-direita">
    <AnuncioDescricao 
      v-for="imovel in imoveis" 
      :key="imovel.id"
      :imovel="imovel"
      @toggle-favorito="handleToggleFavorito"
    />      
    </div>
  </div>
</template>

<style scoped>
.container-anuncio {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100vw;
  min-width: 0;
  margin: 0;
  background-color: #f4f4f4;
  padding: 2vw 0 2vw 0;
  gap: 2rem;
  box-sizing: border-box;
}

.filtro-side {
  width: 100%;
  max-width: 100%;
  position: static;
  margin: 0;
  flex: none;
  z-index: auto;
}

.alinha-direita {
  width: 100%;
  max-width: 600px;
  margin: 0 12vw 0 auto; /* espaço à direita, alinha à direita */
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  align-self: flex-end;
}

.btn-toggle-mobile-filtro-global-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}

.btn-toggle-mobile-filtro-global {
  display: none;
  width: 100%;
  max-width: 340px;
  margin: 0 0 1rem 0;
  padding: 12px 0;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,123,255,0.10);
  transition: background 0.2s;
}
.btn-toggle-mobile-filtro-global:hover {
  background: #0056d2;
}

@media (max-width: 900px) {
  .alinha-direita {
    max-width: 100%;
    margin: 0;
    gap: 1rem;
    align-self: stretch;
  }
  .btn-toggle-mobile-filtro-global {
    display: block;
    margin-top: 80px;
  }
}
</style>
