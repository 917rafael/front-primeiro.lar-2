<script>
import Anuncio from '../components/Anuncio.vue';
import Filtro from '../components/filtro.vue'
import CardInfoImovel from '../components/CardInfoImovel.vue';


export default {
  components: {
    Anuncio,
    Filtro,
    CardInfoImovel,
  },
  data() {
    return {
      mostrarInfoImovel: false,
    };
  },
  methods: {
    abrirInfoImovel() {
      this.mostrarInfoImovel = true;
    },
    fecharInfoImovel() {
      this.mostrarInfoImovel = false;
    }
  }
};
</script>

<template>
  <Filtro />
  <div class="container-anuncio">
    <div class="alinha-direita">
      <Anuncio @abrir-info-imovel="abrirInfoImovel" />
      <Anuncio @abrir-info-imovel="abrirInfoImovel" />
      <Anuncio @abrir-info-imovel="abrirInfoImovel" />
      <Anuncio @abrir-info-imovel="abrirInfoImovel" />
    </div>
    <div v-if="mostrarInfoImovel" class="modal-imovel-overlay">
      <CardInfoImovel />
      <button class="fechar-modal" @click="fecharInfoImovel">×</button>
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
  margin-right: 2%;
}

.modal-imovel-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.fechar-modal {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
}
</style>