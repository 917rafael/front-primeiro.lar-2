<script>
import { useFavoritosStore } from '@/stores/favoritos'

export default {
  name: 'AnuncioCard',
  props: {
    imovelId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      mostrarInfo: false
    }
  },
  setup() {
    const favoritosStore = useFavoritosStore()
    return { favoritosStore }
  },
  computed: {
    imovel() {
      return this.favoritosStore.getImovel(this.imovelId) || {}
    },
    isFavorito() {
      return this.favoritosStore.isFavorito(this.imovelId)
    }
  },
  methods: {
    abrir() {
      this.mostrarInfo = true;
    },
    fechar() {
      this.mostrarInfo = false;
    },
    fecharFora(e) {
      if (e.target.classList.contains('info-overlay')) {
        this.fechar();
      }
    },
    toggleFavorito(e) {
      e.stopPropagation() // Impede que o click abra o modal
      this.favoritosStore.toggleFavorito(this.imovelId)
    }
  }
}
</script>

<template>
  <div class="property-card-wrapper">
    <div class="property-card modern-card" @click="abrir" v-if="!mostrarInfo">
      <div class="image-section modern-image">
        <img :src="imovel.imagem || '@/assets/img/image.png'" :alt="imovel.titulo || 'Foto do imóvel'" />
      </div>
      <div class="details-section modern-details">
        <p class="address modern-address">
          <strong>{{ imovel.titulo || 'Título do imóvel' }}</strong><br />
          {{ imovel.endereco || 'Endereço não informado' }}
        </p>
        <div class="info modern-info">
          <span>{{ imovel.area || '0m²' }}</span>
          <span>· {{ imovel.quartos || 0 }} quartos</span>
          <span>· {{ imovel.banheiros || 0 }} banheiros</span>
          <span>· {{ imovel.vagas || 0 }} vagas</span>
        </div>
        <div class="price modern-price">
          <strong>{{ imovel.preco || 'Preço não informado' }}</strong>
          <p v-if="imovel.condominio">Condomínio {{ imovel.condominio }}</p>
        </div>
        <button class="modern-action-btn">Ver detalhes</button>
        <button 
          class="favorite-btn" 
          :class="{ 'favorite-active': isFavorito }"
          @click="toggleFavorito"
          :title="isFavorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
      </div>
    </div>
    <div v-if="mostrarInfo" class="info-overlay modern-overlay" @click="fecharFora">
      <div class="modern-modal-panel" @click.stop>
        <button class="fechar-info modern-close" @click="fechar">×</button>
        <div class="info-content-row modern-modal-content">
          <img class="info-img modern-modal-img" :src="imovel.imagem || '@/assets/img/image.png'" :alt="imovel.titulo" />
          <div class="info-direita modern-modal-info">
            <div class="modal-header-with-heart">
              <h2>{{ imovel.titulo || 'Título do imóvel' }}</h2>
              <button 
                class="favorite-btn-modal" 
                :class="{ 'favorite-active': isFavorito }"
                @click="toggleFavorito"
                :title="isFavorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </button>
            </div>
            <div class="info-colunas modern-modal-cols">
              <div class="coluna-esq modern-modal-col">
                <p><strong>Endereço:</strong> {{ imovel.endereco || 'Não informado' }}</p>
                <p><strong>Área:</strong> {{ imovel.area || '0m²' }}</p>
                <p><strong>Quartos:</strong> {{ imovel.quartos || 0 }}</p>
                <p><strong>Banheiros:</strong> {{ imovel.banheiros || 0 }}</p>
                <p><strong>Vagas:</strong> {{ imovel.vagas || 0 }}</p>
                <p><strong>Preço:</strong> {{ imovel.preco || 'Não informado' }}</p>
                <p v-if="imovel.condominio"><strong>Condomínio:</strong> {{ imovel.condominio }}</p>
              </div>
              <div class="coluna-dir modern-modal-col">
                <p><strong>Tipo:</strong> {{ imovel.tipo || 'Não informado' }}</p>
                <p v-if="imovel.caracteristicas && imovel.caracteristicas.length">
                  <strong>Características:</strong> {{ imovel.caracteristicas.join(', ') }}
                </p>
                <p><strong>Estado de conservação:</strong> Excelente</p>
                <p><strong>Documentação:</strong> OK</p>
                <p><strong>Proximidades:</strong> Escola, supermercado, parque, farmácia</p>
              </div>
            </div>
          </div>
        </div>
        <div class="descricao-row modern-modal-desc">
          <strong>Descrição:</strong> {{ imovel.descricao || 'Descrição não disponível.' }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.property-card-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-left: 4vw; /* Adiciona espaçamento à esquerda para deslocar à direita */
  overflow: visible;
}

.image-section {
  position: relative;
  flex: 1 1 300px;
  min-width: 300px;
  max-width: 40%;
  overflow: visible;
}

.image-section img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.details-section {
  flex: 1 1 60%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.address {
  font-size: 1rem;
  color: #222;
  margin-bottom: 0.8rem;
  line-height: 1.4;
}

.info {
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.price {
  font-size: 1.2rem;
  color: #111;
  font-weight: bold;
  margin-bottom: 1rem;
}

.price p {
  font-size: 0.95rem;
  color: #888;
  font-weight: normal;
  margin-top: 0.3rem;
}

.contact-button {
  background-color: #e30613;
  color: white;
  padding: 0.7rem 1.4rem;
  border: none;
  border-radius: 5px;
  font-size: 0.95rem;
  cursor: pointer;
  align-self: flex-start;
  transition: background-color 0.3s ease;
}

.contact-button:hover {
  background-color: #c10510;
}

/* Estilos para o botão de favoritos */
.favorite-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  border: none;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #999;
  z-index: 10;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(8px);
  z-index: 10;
}

.favorite-btn:hover {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
}

.favorite-btn.favorite-active {
  background: rgba(227, 6, 19, 0.95);
  color: white;
  transform: scale(1.05);
}

.favorite-btn.favorite-active:hover {
  background: rgba(227, 6, 19, 1);
  transform: scale(1.15);
}

.favorite-btn svg {
  transition: all 0.2s ease;
}

.favorite-btn:hover svg {
  transform: scale(1.1);
}

.favorite-btn.favorite-active svg {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

/* Botão de favoritos no modal */
.modal-header-with-heart {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
}

.favorite-btn-modal {
  background: rgba(240, 240, 240, 0.8);
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #999;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  flex-shrink: 0;
  margin-left: 1rem;
}

.favorite-btn-modal:hover {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.favorite-btn-modal.favorite-active {
  background: rgba(227, 6, 19, 0.95);
  color: white;
  transform: scale(1.05);
}

.favorite-btn-modal.favorite-active:hover {
  background: rgba(227, 6, 19, 1);
  transform: scale(1.15);
}

.favorite-btn-modal svg {
  transition: all 0.2s ease;
}

.favorite-btn-modal:hover svg {
  transform: scale(1.1);
}

.favorite-btn-modal.favorite-active svg {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

/* Responsividade */
@media (max-width: 768px) {
  .property-card {
    flex-direction: column;
  }

  .image-section, .details-section {
    max-width: 100%;
    flex: 1 1 100%;
  }

  .favorite-btn {
    width: 34px;
    height: 34px;
    top: 10px;
    right: 10px;
  }
  
  .favorite-btn svg {
    width: 20px;
    height: 20px;
  }
  
  .favorite-btn-modal {
    width: 44px;
    height: 44px;
  }
  
  .favorite-btn-modal svg {
    width: 24px;
    height: 24px;
  }
  
  .modal-header-with-heart {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .modal-header-with-heart h2 {
    margin: 0;
    order: 2;
  }
  
  .favorite-btn-modal {
    order: 1;
    align-self: flex-end;
    margin-left: 0;
  }
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 24px;
}

.modal {
  background: #fff;
  width: 760px;
  max-width: calc(100% - 48px);
  border-radius: 10px;
  padding: 22px 28px;
  position: relative;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
}

.modal-close {
  position: absolute;
  left: 16px;
  top: 12px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.modal-title { font-weight: 700; margin: 18px 0; }

.modal-body { display: flex; flex-direction: column; gap: 18px; }

.modal-card { display:flex; gap:12px; align-items:center; padding:10px; border-radius:8px; border:1px solid #f1f1f1; }
.modal-thumb { width:90px; height:64px; object-fit:cover; border-radius:6px; }
.modal-card-info { font-size: 0.95rem; color:#333; }
.modal-sub { color:#666; font-size:0.9rem; }
.modal-price { font-weight:800; margin-top:6px; }

.modal-actions { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-top:12px; }
.action-btn { background:#fff5f5; border:1px solid #fdecec; padding:18px; border-radius:12px; display:flex; gap:12px; align-items:center; justify-content:center; cursor:pointer; font-weight:700; color:#c12b2b; }
.action-ico { font-size:20px; }
.action-ico img {
  width: 28px;
  height: 28px;
  display: block;
}
.action-txt { font-size:1rem; }

@media (max-width:600px) {
  .modal { padding:16px; }
  .modal-actions { grid-template-columns:1fr; }
}

/* Estilizando a seção de mostrarInfo para torná-la mais atraente */
.info-overlay {
  position: fixed;
  top: 0;
  /* Removido left, width e border-radius para não forçar painel à esquerda */
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #f9f9f9, #eaeaea);
  z-index: 10000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  box-shadow: -8px 0 24px rgba(0, 0, 0, 0.12);
  padding: 0;
  transition: right 0.2s, width 0.2s;
  /* border-radius removido */
  overflow-y: auto;
}

/* Alterando o botão de fechar para o canto superior esquerdo e mudando a cor para preto */
.fechar-info {
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  left: auto;
  background: #e30613;
  border: none;
  font-size: 2.2rem;
  color: white;
  cursor: pointer;
  z-index: 20;
  border-radius: 50%;
  width: 2.8rem;
  height: 2.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: background 0.3s;
}

.fechar-info:hover {
  background: #333; /* Alterado para um tom mais claro de preto ao passar o mouse */
}

.info-content-row {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 2.5rem;
  width: 100%;
  margin-top: 1.5rem;
  background: linear-gradient(135deg, #fff 70%, #f7f7fa 100%);
  border-radius: 22px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.10), 0 2px 12px rgba(227,6,19,0.08);
  padding: 2.5rem 2rem;
  border: 1.5px solid #ececec;
  transition: box-shadow 0.2s, background 0.2s;
}
@media (max-width: 900px) {
  .info-content-row {
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;
    border-radius: 0;
    box-shadow: none;
    padding: 1.2rem 0.5rem;
    background: #fff;
    border: none;
  }
}

.info-img {
  width: 180px;
  max-width: 220px;
  border-radius: 16px;
  margin-bottom: 0;
  object-fit: cover;
  box-shadow: 0 4px 16px rgba(0,0,0,0.10);
  border: 2px solid #e30613;
}
.info-direita {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  flex: 1 1 60%;
  min-width: 220px;
  max-width: 100%;
  margin-left: 2rem;
  gap: 1.2rem;
}
.info-direita h2 {
  font-size: 2.1rem;
  font-weight: 900;
  color: #e30613;
  margin-bottom: 0.7rem;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 8px rgba(227,6,19,0.08);
}
.info-colunas {
  display: flex;
  flex-direction: row;
  gap: 2.2rem;
  width: 100%;
}
.coluna-esq, .coluna-dir {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  font-size: 1.08rem;
  color: #222;
}
@media (max-width: 900px) {
  .info-overlay {
    top: 0;
    left: 0;
    transform: none;
    width: 100vw;
    height: 100vh;
    padding: 1.2rem 0.5rem;
    border-radius: 0;
    min-height: 100vh;
    box-shadow: none;
    border: none;
    animation: none;
  }
  .info-content-row {
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;
    border-radius: 0;
    box-shadow: none;
    padding: 1.2rem 0.5rem;
  }
  .info-img {
    width: 90vw;
    max-width: 90vw;
    border-radius: 12px;
    margin-bottom: 1rem;
    border: 2px solid #e30613;
  }
  .info-direita {
    margin-left: 0;
    width: 100%;
    gap: 1rem;
  }
  .info-direita h2 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  .info-colunas {
    flex-direction: column;
    gap: 1rem;
  }
  .coluna-esq, .coluna-dir {
    font-size: 1.1rem;
    gap: 0.5rem;
  }
}
.info-direita {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  flex: 1 1 60%;
  min-width: 220px;
  max-width: 100%;
  margin-left: 2rem;
}

.info-img {
  width: 22vw;
  max-width: 320px;
  border-radius: 1vw;
  margin-bottom: 0;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.info-colunas {
  display: flex;
  flex-direction: row;
  gap: 3vw;
  width: 100%;
}

.coluna-esq, .coluna-dir {
  display: flex;
  flex-direction: column;
  gap: 0.7vw;
  font-size: 1.1vw;
}

.coluna-esq h2 {
  font-size: 2vw;
  margin-bottom: 0.7vw;
  color: #333;
}

.descricao-row {
  margin-top: 2vw;
  color: #444;
  font-size: 1.2vw;
  text-align: left;
  max-width: 60vw;
  padding-left: 2vw;
  background: #f7f7f7;
  border-radius: 1vw;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5vw;
}

@media (max-width: 900px) {
  .info-overlay {
    left: 0;
    width: 100vw;
    height: 100vh;
    padding: 2vw 1vw;
    border-radius: 0;
  }
  .info-content-row {
    flex-direction: column;
    align-items: center;
  }
  .info-img {
    width: 90vw;
    max-width: 90vw;
  }
  .info-colunas {
    flex-direction: column;
    gap: 2vw;
  }
  .coluna-esq, .coluna-dir {
    font-size: 2.5vw;
  }
  .coluna-esq h2 {
    font-size: 5vw;
  }
  .descricao-row {
    font-size: 2.5vw;
    max-width: 98vw;
    padding-left: 0;
  }
}

.modern-card {
  display: flex;
  flex-direction: row;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 6px 32px rgba(0,0,0,0.10);
  overflow: visible;
  margin: 2rem 0;
  max-width: 900px;
  width: 100%;
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
  border: 1.5px solid #f2f2f2;
  position: relative;
}
.modern-card:hover {
  box-shadow: 0 12px 40px rgba(227,6,19,0.10);
  transform: translateY(-4px) scale(1.01);
}
.modern-image {
  flex: 1 1 320px;
  min-width: 220px;
  max-width: 40%;
  background: #f7f7f7;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modern-image img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 0 0 0 18px;
}
.modern-details {
  flex: 1 1 60%;
  padding: 2.2rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.2rem;
}
.modern-address {
  font-size: 1.15rem;
  color: #222;
  margin-bottom: 0.7rem;
  font-weight: 600;
}
.modern-info {
  font-size: 1.05rem;
  color: #555;
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}
.modern-price {
  font-size: 1.3rem;
  color: #e30613;
  font-weight: bold;
  margin-bottom: 0.7rem;
}
.modern-price p {
  font-size: 1rem;
  color: #888;
  font-weight: normal;
  margin-top: 0.2rem;
}
.modern-action-btn {
  background: linear-gradient(90deg, #e30613 60%, #ff5a36 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1.7rem;
  font-size: 1.08rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(227,6,19,0.08);
  transition: background 0.2s, box-shadow 0.2s;
  align-self: flex-start;
}
.modern-action-btn:hover {
  background: linear-gradient(90deg, #c10510 60%, #e30613 100%);
  box-shadow: 0 4px 16px rgba(227,6,19,0.12);
}

/* Modal moderno */
.modern-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.18);
  z-index: 10000;
  display: flex;
  align-items: stretch;
  justify-content: flex-end;
  padding: 0;
  transition: background 0.2s;
}
@media (max-width: 900px) {
  .modern-overlay {
    align-items: stretch;
    justify-content: flex-end;
  }
}
.modern-modal-panel {
  background: #fff;
  max-width: 96vw;;
  min-width: 340px;
  height: 100vh;
  border-radius: 24px 0 0 24px;
  box-shadow: -8px 0 32px rgba(0,0,0,0.10);
  padding: 2.8rem 2.2rem 2.2rem 2.2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  animation: slideInRight 0.25s cubic-bezier(.4,1.4,.6,1) 1;
  overflow-y: auto;
}
@keyframes slideInRight {
  from { transform: translateX(100vw); }
  to { transform: translateX(0); }
}
.modern-close {
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  background: #e30613;
  border: none;
  font-size: 2.2rem;
  color: #fff;
  cursor: pointer;
  border-radius: 50%;
  width: 2.8rem;
  height: 2.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(227,6,19,0.10);
  transition: background 0.2s;
  z-index: 20;
}
.modern-close:hover {
  background: #c10510;
}
.modern-modal-content {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 2.2rem;
  width: 100%;
  margin-top: 1.2rem;
}
.modern-modal-img {
  width: 100%;
  max-width: 340px;
  height: 240px;
  border-radius: 16px;
  object-fit: cover;
  box-shadow: 0 4px 16px rgba(0,0,0,0.10);
  border: 2px solid #e30613;
  margin-bottom: 0;
}
@media (max-width: 900px) {
  .modern-modal-img {
    width: 100vw;
    max-width: 98vw;
    height: 38vw;
    margin-bottom: 1rem;
  }
}
.modern-modal-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 1 60%;
  min-width: 180px;
  max-width: 100%;
  gap: 1.1rem;
}
.modern-modal-info h2 {
  font-size: 1.7rem;
  font-weight: 900;
  color: #e30613;
  margin-bottom: 0.5rem;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 8px rgba(227,6,19,0.08);
}
.modern-modal-cols {
  display: flex;
  flex-direction: row;
  gap: 2.2rem;
  width: 100%;
}
.modern-modal-col {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 1.05rem;
  color: #222;
}
.modern-modal-desc {
  margin-top: 1.5rem;
  color: #444;
  font-size: 1.08rem;
  text-align: left;
  background: #f7f7f7;
  border-radius: 1vw;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  padding: 1.2rem 1rem;
}

/* Responsividade */
@media (max-width: 900px) {
  .modern-card {
    flex-direction: column;
    max-width: 98vw;
    margin: 1.2rem auto;
    overflow: visible;
  }
  .modern-image {
    max-width: 100%;
    min-width: 100%;
  }
  .modern-image img {
    height: 180px;
    border-radius: 18px 18px 0 0;
  }
  .modern-details {
    padding: 1.2rem 1rem 1.2rem 1rem;
    gap: 0.7rem;
  }
  .modern-modal-panel {
    width: 100vw;
    min-width: 0;
    border-radius: 0;
    padding: 1.2rem 0.5rem;
  }
  .modern-modal-content {
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;
  }
  .modern-modal-img {
    width: 90vw;
    max-width: 90vw;
    margin-bottom: 1rem;
  }
  .modern-modal-info {
    margin-left: 0;
    width: 100%;
    gap: 1rem;
  }
  .modern-modal-info h2 {
    font-size: 1.3rem;
    margin-bottom: 0.4rem;
  }
  .modern-modal-cols {
    flex-direction: column;
    gap: 1rem;
  }
  .modern-modal-col {
    font-size: 1rem;
    gap: 0.4rem;
  }
  .modern-modal-desc {
    font-size: 1rem;
    max-width: 98vw;
    padding-left: 0;
  }
}
@media (max-width: 600px) {
  .modern-modal-panel {
    padding: 0.7rem 0.2rem;
  }
  .modern-modal-content {
    gap: 0.7rem;
  }
  .modern-modal-img {
    height: 38vw;
  }
}
</style>
