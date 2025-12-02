<script setup>
import { ref, computed } from 'vue';
import { useFavoritosStore } from '@/stores/favoritos';

defineOptions({
  name: "AnuncioDescricao"
});

// Props (Recebendo o objeto imóvel)
const props = defineProps({
  imovel: {
    type: Object,
    required: true,
    default: () => ({
      id: null,
      titulo: '',
      endereco: '',
      imagem: '',
      imagens: [],
      tipo: '',
      categoria: '',
      preco: '',
      area: '',
      quartos: 0,
      banheiros: 0,
      vagas: 0,
      caracteristicas: [],
      descricao: ''
    })
  }
});

// Store
const favoritosStore = useFavoritosStore();

// Estado
const mostrarDetalhes = ref(false);
const currentSlide = ref(0);
const imagemPadrao = '/src/assets/img/image.png';


const isFavorito = computed(() => favoritosStore.isFavorito(props.imovelId))

// Métodos / Funções
function verDetalhes() {
  mostrarDetalhes.value = true;
  currentSlide.value = 0;
}

function fecharDetalhes() {
  mostrarDetalhes.value = false;
  currentSlide.value = 0;
}

function fecharFora(e) {
  if (e.target === e.currentTarget) {
    fecharDetalhes();
  }
}


function toggleFavorito(e) {
  e.stopPropagation() // Impede que o click abra o modal
  console.log(`Clicou no favorito do imóvel ${props.imovelId}`)
  favoritosStore.toggleFavorito(props.imovelId)
}

function entrarEmContato(imovel) {
  const mensagem = `Olá! Tenho interesse no imóvel: ${imovel.titulo} - ${imovel.endereco}`;
  const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(mensagem)}`;
  window.open(whatsappUrl, '_blank');
}

function handleImageError(event) {
  event.target.src = imagemPadrao;
}
</script>

<template>
  <div class="favorito-card">
    <div class="card-imagem">
      <img 
        :src="imovel.imagem || imagemPadrao" 
        :alt="imovel.titulo || 'Foto do imóvel'" 
        @error="handleImageError" 
      />
      <div class="card-badges">
        <span class="badge" :class="`badge-${imovel.tipo?.toLowerCase() || 'default'}`">
          {{ imovel.tipo }}
        </span>
        <span class="badge badge-categoria">{{ imovel.categoria }}</span>
      </div>
      
      <button class="favorite-btn" :class="{ 'favorite-active': isFavorito }" @click="toggleFavorito"
          :title="isFavorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
    </div>

    <div class="card-content">
      <div class="card-header">
        <h3 class="card-titulo">{{ imovel.titulo }}</h3>
        <p class="card-endereco">{{ imovel.endereco }}</p>
      </div>

      <div class="card-preco">
        <span class="preco">{{ imovel.preco }}</span>
      </div>

      <div class="card-detalhes">
        <div class="detalhe">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#6b7280" stroke-width="2" fill="none" />
          </svg>
          <span>{{ imovel.area }}</span>
        </div>
        <div class="detalhe">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="#6b7280" stroke-width="2" fill="none" />
            <line x1="8" y1="21" x2="16" y2="21" stroke="#6b7280" stroke-width="2" />
            <line x1="12" y1="17" x2="12" y2="21" stroke="#6b7280" stroke-width="2" />
          </svg>
          <span>{{ imovel.quartos }} qto{{ imovel.quartos !== 1 ? 's' : '' }}</span>
        </div>
        <div class="detalhe">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="3" stroke="#6b7280" stroke-width="2" fill="none" />
            <path
              d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
              stroke="#6b7280" stroke-width="2" fill="none" />
          </svg>
          <span>{{ imovel.banheiros }} bnh{{ imovel.banheiros !== 1 ? 's' : '' }}</span>
        </div>
        <div class="detalhe">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2m0 8h8M5 15v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2M5 15V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6"
              stroke="#6b7280" stroke-width="2" fill="none" />
          </svg>
          <span>{{ imovel.vagas }} vaga{{ imovel.vagas !== 1 ? 's' : '' }}</span>
        </div>
      </div>

      <div class="card-caracteristicas" v-if="imovel.caracteristicas && imovel.caracteristicas.length">
        <span v-for="carac in imovel.caracteristicas.slice(0, 3)" :key="carac" class="caracteristica">
          {{ carac }}
        </span>
        <span v-if="imovel.caracteristicas.length > 3" class="caracteristica-mais">
          +{{ imovel.caracteristicas.length - 3 }}
        </span>
      </div>

      <div class="card-acoes">
        <button class="btn-contato" @click="entrarEmContato(imovel)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 12A10 10 0 1 1 12 2a10 10 0 0 1 10 10Z" fill="#25D366" />
            <path d="m9 12 2 2 4-4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          Entrar em Contato
        </button>
        <button class="btn-detalhes" @click="verDetalhes">
          Ver Detalhes
        </button>
      </div>
    </div>
  </div>

  <div v-if="mostrarDetalhes && imovel" class="info-overlay" @click="fecharFora">
    <div class="modern-modal-panel" @click.stop>
      <button class="fechar-info" @click="fecharDetalhes">×</button>
      <div class="sketchfab-embed-wrapper"> 
        <iframe title="CASA FRAILES - HASEN [Taller de Arquitectura]"
          frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true"
          allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport
          execution-while-not-rendered web-share
          src="https://sketchfab.com/models/ab698b84c9c2419fbf15364fe6a43053/embed"> 
        </iframe>
      </div>
    
      <div class="info-direita">
        <div class="modal-header-with-heart">
          <h2>{{ imovel.titulo || 'Título do imóvel' }}</h2>
          <button class="favorite-btn-modal" :class="{ 'favorite-active': isFavorito }" @click.stop="toggleFavorito"
              :title="isFavorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>
        </div>

        <div class="info-colunas">
          <div class="coluna-esq">
            <p><strong>Endereço:</strong> {{ imovel.endereco || 'Não informado' }}</p>
            <p><strong>Área:</strong> {{ imovel.area || '0m²' }}</p>
            <p><strong>Quartos:</strong> {{ imovel.quartos || 0 }}</p>
            <p><strong>Banheiros:</strong> {{ imovel.banheiros || 0 }}</p>
            <p><strong>Vagas:</strong> {{ imovel.vagas || 0 }}</p>
            <p><strong>Preço:</strong> {{ imovel.preco || 'Não informado' }}</p>
            <p v-if="imovel.condominio"><strong>Condomínio:</strong> {{ imovel.condominio }}</p>
          </div>
          <div class="coluna-dir">
            <p><strong>Tipo:</strong> {{ imovel.tipo || 'Não informado' }}</p>
            <p v-if="imovel.caracteristicas && imovel.caracteristicas.length">
              <strong>Características:</strong> {{ imovel.caracteristicas.join(', ') }}
            </p>
            <p><strong>Estado de conservação:</strong> Excelente</p>
            <p><strong>Documentação:</strong> OK</p>
            <p><strong>Proximidades:</strong> Escola, supermercado, parque, farmácia</p>
          </div>
        </div>

        <div class="descricao-row">
          <strong>Descrição:</strong>
          <p>{{ imovel.descricao || 'Descrição não disponível.' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* Card de Favorito */
.favorite-active svg {
  fill: #e30613 !important;
}

.favorito-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
}

.favorito-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
}

.card-imagem {
  position: relative;
  height: 240px;
  overflow: hidden;
}

.card-imagem img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.favorito-card:hover .card-imagem img {
  transform: scale(1.05);
}

.card-badges {
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  gap: 8px;
  z-index: 5;
}

.badge {
  background: rgba(255, 255, 255, 0.95);
  color: #374151;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  backdrop-filter: blur(4px);
}

.badge-venda {
  background: rgba(16, 185, 129, 0.9);
  color: white;
}

.badge-aluguel {
  background: rgba(59, 130, 246, 0.9);
  color: white;
}

.btn-remover-favorito {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid #e5e7eb;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #e30613;
  z-index: 5;
}

.btn-remover-favorito:hover {
  background: #e30613;
  color: white;
  transform: scale(1.1);
}

.card-content {
  padding: 24px;
}

.card-header {
  margin-bottom: 16px;
}

.card-titulo {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 8px;
  line-height: 1.3;
}

.card-endereco {
  color: #6b7280;
  font-size: 0.95rem;
  margin: 0;
}

.card-preco {
  margin-bottom: 20px;
}

.preco {
  font-size: 1.75rem;
  font-weight: 800;
  color: #ff6a3d;
  font-family: 'Montserrat', sans-serif;
}

.card-detalhes {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
}

.detalhe {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #6b7280;
  font-size: 0.9rem;
  font-weight: 500;
}

.card-caracteristicas {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}

.caracteristica,
.caracteristica-mais {
  background: #f3f4f6;
  color: #374151;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.caracteristica-mais {
  background: #ff6a3d;
  color: white;
}

.card-acoes {
  display: flex;
  gap: 12px;
}

.btn-contato {
  background: #25D366;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.btn-contato:hover {
  background: #128C7E;
  transform: translateY(-1px);
}

.btn-detalhes {
  background: transparent;
  color: #ff6a3d;
  border: 2px solid #ff6a3d;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
}

.btn-detalhes:hover {
  background: #ff6a3d;
  color: white;
  transform: translateY(-1px);
}

/* Modal */
.info-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  overflow-y: auto;
}

.modern-modal-panel {
  background: white;
  border-radius: 20px;
  max-width: 1200px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: modalFadeIn 0.3s ease;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

.fechar-info {
  position: absolute;
  top: 20px;
  right: 20px;
  background: #e30613;
  border: none;
  font-size: 32px;
  color: white;
  cursor: pointer;
  z-index: 1001;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(227, 6, 19, 0.3);
  transition: all 0.3s ease;
  line-height: 1;
}

.fechar-info:hover {
  background: #333;
  transform: rotate(90deg);
}

.modal-content-wrapper {
  padding: 30px;
}

/* Carrossel */
.carousel-container {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  border-radius: 16px;
  background: #f3f4f6;
  margin-bottom: 30px;
}

.carousel-track {
  display: flex;
  height: 100%;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.carousel-slide {
  min-width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #000;
}

.sketchfab-slide-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.sketchfab-embed-wrapper {
  width: 100%;
  height: 100%;
}

.sketchfab-embed-wrapper iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0;
  cursor: pointer;
  z-index: 10;
  font-size: 32px;
  line-height: 1;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.carousel-control:hover {
  transform: translateY(-50%) scale(1.15);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.carousel-control.prev {
  left: 20px;
}

.carousel-control.next {
  right: 20px;
}

.carousel-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
}

.carousel-indicators span {
  width: 12px;
  height: 12px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.8);
}

.carousel-indicators span:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: scale(1.2);
}

.carousel-indicators span.active {
  background: #667eea;
  border-color: #667eea;
  transform: scale(1.3);
}

/* Informações */
.info-direita {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.modal-header-with-heart {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #e5e7eb;
}

.modal-header-with-heart h2 {
  font-size: 2rem;
  color: #1f2937;
  margin: 0;
  font-weight: 700;
  flex: 1;
  margin-right: 20px;
}

.favorite-btn-modal {
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid #e5e7eb;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #6b7280;
  flex-shrink: 0;
}

.favorite-btn-modal:hover {
  background: #fef2f2;
  border-color: #fca5a5;
  color: #ef4444;
  transform: scale(1.1);
}

.info-colunas {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.coluna-esq p,
.coluna-dir p {
  margin: 12px 0;
  color: #4b5563;
  line-height: 1.6;
  font-size: 0.95rem;
}

.coluna-esq strong,
.coluna-dir strong {
  color: #1f2937;
  font-weight: 600;
  margin-right: 8px;
}

.descricao-row {
  padding-top: 20px;
  border-top: 2px solid #e5e7eb;
}

.descricao-row strong {
  color: #1f2937;
  font-weight: 600;
  font-size: 1.1rem;
  display: block;
  margin-bottom: 12px;
}

.descricao-row p {
  color: #4b5563;
  line-height: 1.8;
  margin: 0;
  font-size: 0.95rem;
}

/* Responsividade */
@media (max-width: 768px) {
  .modal-content-wrapper {
    padding: 20px;
  }

}


/* Ajuste do modal para melhor responsividade */
.modern-modal-panel {
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 1100px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  padding: 0;
  display: flex;
  flex-direction: column;
}

/* Wrapper do Sketchfab agora é responsivo em 16:9 */
.sketchfab-embed-wrapper {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 */
  background: #000;
  border-bottom: 2px solid #e5e7eb;
}

.sketchfab-embed-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

/* Área direita agora se adapta melhor */
.info-direita {
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
}

/* Ajustes para mobile */
@media (max-width: 768px) {
  .modern-modal-panel {
    max-height: 95vh;
    border-radius: 14px;
  }

  .info-direita {
    padding: 18px;
  }

  .modal-header-with-heart h2 {
    font-size: 1.5rem;
  }
}

</style>