<script setup>
defineOptions({ name: 'AppAnuncio' })
import { useFavoritosStore } from '@/stores/favoritos'
import { computed, ref } from 'vue'


const props = defineProps({
  imovelId: {
    type: Number,
    required: true
  }
})

// Estado do Modal e Carrossel
const mostrarInfo = ref(false)
const currentSlide = ref(0) // Índice do slide atual (0: primeira imagem, 1: segunda, etc.)

// Dados de Contato
const contato = ref({
  nome: '',
  email: '',
  mensagem: '',
  sucesso: false
})

// Lógica de Favoritos
const favoritosStore = useFavoritosStore()
// Simulação de dados do imóvel com uma lista de imagens para o carrossel
const imovel = computed(() => {
  const data = favoritosStore.getImovel(props.imovelId) || {}
  // Adiciona mais imagens de exemplo (se necessário) e a URL da imagem principal
  if (data && !data.imagens) {
    data.imagens = [
      data.imagem || '@/assets/img/image.png',
      'https://via.placeholder.com/1000x500/A0AEC0/FFFFFF?text=Imagem+2', // Exemplo de Imagem 2
      'https://via.placeholder.com/1000x500/4299E1/FFFFFF?text=Imagem+3', // Exemplo de Imagem 3
      'sketchfab' // Marcador especial para o iframe
    ]
  }
  return data
})

const isFavorito = computed(() => favoritosStore.isFavorito(props.imovelId))

// Links de Contato (Lógica não modificada, mas implementada)
const whatsappLink = computed(() => {
  if (!imovel.value.anunciante || !imovel.value.anunciante.whatsapp) return ""
  return `https://api.whatsapp.com/send?phone=55${imovel.value.anunciante.whatsapp}&text=Olá,%20estou%20interessado%20no%20imóvel%20${imovel.value.titulo}`
})

const emailLink = computed(() => {
  if (!imovel.value.anunciante || !imovel.value.anunciante.email) return ""
  return `mailto:${imovel.value.anunciante.email}?subject=Interesse%20no%20imóvel%20${imovel.value.titulo}&body=Olá,%0D%0AEstou%20interessado%20no%20imóvel%20${imovel.value.titulo}.%0D%0A${contato.value.mensagem}`
})


// Funções do Modal
function abrir() {
  mostrarInfo.value = true;
  currentSlide.value = 0; // Reinicia o carrossel ao abrir
  // Adiciona a classe ao body para evitar scroll
  document.body.style.overflow = 'hidden';
}

function fechar() {
  mostrarInfo.value = false;
  document.body.style.overflow = ''; // Restaura o scroll
}

// Funções do Carrossel
function nextSlide() {
  const maxSlides = imovel.value.imagens.length
  currentSlide.value = (currentSlide.value + 1) % maxSlides
}

function prevSlide() {
  const maxSlides = imovel.value.imagens.length
  currentSlide.value = (currentSlide.value - 1 + maxSlides) % maxSlides
}

// Funções de Ação
function toggleFavorito(e) {
  e.stopPropagation() // Impede que o click abra o modal
  favoritosStore.toggleFavorito(props.imovelId)
}

function enviarContato() {
  // Lógica para enviar o contato (pode ser uma chamada de API ou outro método)
  contato.value.sucesso = true;
  setTimeout(() => {
    contato.value.sucesso = false;
    fechar();
  }, 3000);
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
        <button class="favorite-btn" :class="{ 'favorite-active': isFavorito }" @click="toggleFavorito"
          :title="isFavorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      </div>
    </div>

    <div v-else class="modal-overlay" @click.self="fechar">
      <div class="modal-content">
        <button @click="fechar" class="modal-close-btn">×</button>

        <div class="modal-main-grid">
          <div class="carousel-container">
            <div class="carousel-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">

              <div v-for="(src, index) in imovel.imagens" :key="index" class="carousel-slide">
                <div v-if="src === 'sketchfab'" class="sketchfab-slide-wrapper">
                  <div class="sketchfab-embed-wrapper">
                    <iframe title="CASA FRAILES - HASEN [Taller de Arquitectura]" frameborder="0" allowfullscreen
                      mozallowfullscreen="true" webkitallowfullscreen="true"
                      allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking
                      execution-while-out-of-viewport execution-while-not-rendered web-share
                      src="https://sketchfab.com/models/ab698b84c9c2419fbf15364fe6a43053/embed">
                    </iframe>
                  </div>
                </div>
                <img v-else :src="src" :alt="imovel.titulo || 'Foto do imóvel'" class="info-img modern-modal-img" />
              </div>
            </div>

            <button v-if="imovel.imagens && imovel.imagens.length > 1" class="carousel-control prev" @click.stop="prevSlide">
              &lt;
            </button>
            <button v-if="imovel.imagens && imovel.imagens.length > 1" class="carousel-control next" @click.stop="nextSlide">
              &gt;
            </button>

            <div class="carousel-indicators">
              <span v-for="(slide, index) in imovel.imagens" :key="index"
                :class="{ active: index === currentSlide }" @click.stop="currentSlide = index">
              </span>
            </div>
          </div>

          <div class="info-direita modern-modal-info">
            <div class="anuncio-modal-content">
              <div class="anuncio-modal-info">
                <div class="modal-header-with-heart">
                  <h2>{{ imovel.titulo || 'Título do imóvel' }}</h2>
                  <button class="favorite-btn-modal" :class="{ 'favorite-active': isFavorito }"
                    @click.stop="toggleFavorito"
                    :title="isFavorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'">
                    <svg width="28" height="28" viewBox="0 0 24 24" :fill="isFavorito ? '#e30613' : 'none'"
                      :stroke="isFavorito ? '#e30613' : '#999'" stroke-width="2">
                      <path fill="currentColor"
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>
                <div class="anuncio-modal-cols">
                  <div class="anuncio-modal-col">
                    <p><strong>Endereço:</strong> {{ imovel.endereco || 'Não informado' }}</p>
                    <p><strong>Área:</strong> {{ imovel.area || '0m²' }}</p>
                    <p><strong>Quartos:</strong> {{ imovel.quartos || 0 }}</p>
                    <p><strong>Banheiros:</strong> {{ imovel.banheiros || 0 }}</p>
                    <p><strong>Vagas:</strong> {{ imovel.vagas || 0 }}</p>
                    <p><strong>Preço:</strong> {{ imovel.preco || 'Não informado' }}</p>
                    <p v-if="imovel.condominio"><strong>Condomínio:</strong> {{ imovel.condominio }}</p>
                  </div>
                  <div class="anuncio-modal-col">
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
               <div>
                    <h3>Contato com o anunciante</h3>
                    <form @submit.prevent="enviarContato">
                        <div>
                        <input type="text" v-model="contato.nome" placeholder="Seu nome" required />
                        <input type="email" v-model="contato.email" placeholder="Seu e-mail" required />
                        </div>
                        <textarea v-model="contato.mensagem" placeholder="Mensagem" rows="3" required></textarea>
                        <button type="submit" class="contact-btn">Enviar mensagem</button>
                        <div v-if="contato.sucesso" class="contact-success">Mensagem enviada com sucesso!</div>
                    </form>
                    <div>
                        <a :href="whatsappLink" target="_blank">
                        <img src="@/assets/img/whatsapp.png" alt="WhatsApp" /> WhatsApp
                        </a>
                        <a :href="emailLink" target="_blank" class="contact-email">
                        <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M2 4v16h20V4H2zm2 2h16v2.236l-8 5.333-8-5.333V6zm0 4.236l8 5.333 8-5.333V18H4V10.236z" />
                        </svg> E-mail
                        </a>
                    </div>
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


.modal-overlay {
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
  backdrop-filter: blur(5px);
  /* Removido o margin-top */
}

.modal-content {
  background: white;
  border-radius: 20px;
  max-width: 1200px; /* Aumentado a largura máxima para acomodar melhor o grid */
  width: 100%;
  max-height: 95vh;
  overflow-y: auto;
  position: relative;
  animation: modalSlideIn 0.3s ease;
  padding-top: 0; /* Remove padding superior desnecessário */
}

/* Ajuste no botão de fechar para o novo container */
.modal-close-btn {
  position: absolute;
  top: 20px; /* Ajustado para melhor posicionamento */
  right: 20px; /* Ajustado para melhor posicionamento */
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.95);
  border: none;
  border-radius: 50%;
  font-size: 28px;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.modal-close-btn:hover {
  background: #e53e3e;
  color: white;
  transform: rotate(90deg);
}

/* Novo Grid Principal para Imagem e Info */
.modal-main-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 450px; /* Garante altura mínima para o grid */
}

/* Reposicionamento do `info-direita` */
.info-direita.modern-modal-info {
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #f7fafc;
  /* Garante que ocupe todo o espaço vertical */
}

/* Reposicionamento da seção de Contato */
.modal-contact-section {
  padding: 30px;
  background: #f7fafc;
  border-top: 1px solid #e2e8f0;
}

/* ==============================================
  CSS PARA O CARROSSEL (NOVO)
  ============================================== */

.carousel-container {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 450px;
  background-color: #e2e8f0;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
  height: 100%;
}

.carousel-slide {
  min-width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-slide img.modern-modal-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 450px;
}

/* Estilo para o Wrapper do Sketchfab no Carrossel */
.sketchfab-slide-wrapper {
  width: 100%;
  height: 100%;
  min-height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sketchfab-embed-wrapper {
  width: 100%;
  height: 100%;
  min-height: 450px;
}

.sketchfab-embed-wrapper iframe {
  width: 100%;
  height: 100%;
  border-radius: 0;
}

/* Controles do Carrossel (Setas) */
.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 5;
  font-size: 24px;
  line-height: 1;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: background 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-control:hover {
  background: rgba(0, 0, 0, 0.8);
}

.carousel-control.prev {
  left: 10px;
}

.carousel-control.next {
  right: 10px;
}

/* Indicadores do Carrossel (Pontos) */
.carousel-indicators {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 5;
}

.carousel-indicators span {
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
}

.carousel-indicators span.active {
  background: white;
  transform: scale(1.2);
}

/* ==============================================
  RESPONSIVIDADE AJUSTADA
  ============================================== */

@media (max-width: 992px) {
  .modal-main-grid {
    grid-template-columns: 1fr; /* Coluna única em telas menores/tablets */
  }

  /* Ajustes de bordas para coluna única */
  .carousel-container {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 0;
    min-height: 350px;
  }

  .carousel-slide img.modern-modal-img,
  .sketchfab-slide-wrapper {
    min-height: 350px;
  }

  .info-direita.modern-modal-info {
    padding: 30px 20px;
  }
}

@media (max-width: 768px) {
  .modal-close-btn {
    top: 10px;
    right: 10px;
  }

  .carousel-container {
    min-height: 300px;
  }

  .carousel-slide img.modern-modal-img,
  .sketchfab-slide-wrapper {
    min-height: 300px;
  }

  .anuncio-modal-cols {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  /* Aplica o estilo de responsividade de telefone ao botão de fechar */
  .teste > div > button {
    top: 40px;
    right: 12px;
    width: 38px;
    height: 38px;
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .modal-content {
    border-radius: 12px;
    max-height: 98vh;
  }

  .carousel-container {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    min-height: 250px;
  }

  .carousel-slide img.modern-modal-img,
  .sketchfab-slide-wrapper {
    min-height: 250px;
  }

  .info-direita.modern-modal-info {
    padding: 20px 16px;
  }

  .modal-contact-section {
    padding: 16px;
  }

  /* Ajusta o posicionamento do botão fechar para não conflitar com o header do modal */
  .modal-close-btn {
    top: 15px;
    right: 15px;
    width: 38px;
    height: 38px;
  }
}


/* ==============================================
   CARD DE ANÚNCIO - CONTAINER PRINCIPAL
   ============================================== */
.property-card-wrapper {
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
}

@media (max-width: 600px) {
  .property-card-wrapper {
    max-width: 100%;
  }
}

/* ==============================================
   CARD DE ANÚNCIO - VISUALIZAÇÃO RESUMIDA
   ============================================== */
.property-card.modern-card {
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 340px;
}

.property-card.modern-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

/* Imagem do Card */
.image-section.modern-image {
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.image-section.modern-image img {
  width: 100%;
  height: 260px;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.property-card.modern-card:hover .image-section.modern-image img {
  transform: scale(1.1);
}

/* Detalhes do Card */
.details-section.modern-details {
  padding: 2.8rem 2rem 2.2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  position: relative;
}

/* Endereço */
.address.modern-address {
  margin: 0;
  color: #1a1a1a;
  font-size: 16px;
  line-height: 1.5;
}

.address.modern-address strong {
  font-size: 18px;
  font-weight: 700;
  color: #2d3748;
  display: block;
  margin-bottom: 4px;
}

/* Informações (quartos, banheiros, etc) */
.info.modern-info {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 14px;
  color: #718096;
}

.info.modern-info span {
  white-space: nowrap;
}

/* Preço */
.price.modern-price {
  margin: 8px 0;
}

.price.modern-price strong {
  font-size: 24px;
  font-weight: 700;
  color: #2b6cb0;
  display: block;
}

.price.modern-price p {
  margin: 4px 0 0 0;
  font-size: 13px;
  color: #718096;
}

/* Botão Ver Detalhes */
.modern-action-btn {
  width: 100%;
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;
}

.modern-action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

/* Botão Favorito */
.favorite-btn {
  position: absolute;
  top: 44px;
  right: 16px;
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.95);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
  color: #cbd5e0;
}

.favorite-btn:hover {
  background: white;
  transform: scale(1.1);
}

.favorite-btn.favorite-active {
  color: #e53e3e;
  animation: heartBeat 0.5s ease;
}

@keyframes heartBeat {
  0%, 100% { transform: scale(1); }
  25% { transform: scale(1.2); }
  50% { transform: scale(1.1); }
}

/* ==============================================
   MODAL DE DETALHES - OVERLAY
   ============================================== */
.teste {
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
  backdrop-filter: blur(5px);
  margin-top: 20px;
}

.teste > div {
  background: white;
  border-radius: 20px;
  max-width: 1000px;
  width: 100%;
  max-height: 95vh;
  overflow-y: auto;
  position: relative;
  animation: modalSlideIn 0.3s ease;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Botão Fechar Modal */
.teste > div > button {
  position: absolute;
  top: 60px;
  right: 20px;
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.95);
  border: none;
  border-radius: 50%;
  font-size: 28px;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.teste > div > button:hover {
  background: #e53e3e;
  color: white;
  transform: rotate(90deg);
}

/* ==============================================
   MODAL - CONTEÚDO PRINCIPAL
   ============================================== */
.teste > div > div:first-of-type {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
}

/* Imagem do Modal */
.info-img.modern-modal-img {
  width: 100%;
  height: 100%;
  min-height: 400px;
  object-fit: cover;
}

/* Informações Laterais do Modal */
.info-direita.modern-modal-info {
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #f7fafc;
}

/* Header com Título e Coração */
.modal-header-with-heart {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 16px;
}

.modal-header-with-heart h2 {
  margin: 0;
  font-size: 26px;
  font-weight: 700;
  color: #2d3748;
  line-height: 1.3;
  flex: none;
}

/* Botão Favorito no Modal */
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
  margin-top: 0.5rem;
  align-self: flex-start;
  margin-left: 18px;
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
  color: #999;
  fill: currentColor;
  stroke: #999;
  transition: color 0.2s, fill 0.2s, stroke 0.2s;
}

.favorite-btn-modal.favorite-active svg {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  color: #e30613;
  fill: #e30613;
  stroke: #e30613;
}

.favorite-btn-modal svg {
  color: #999;
  fill: currentColor;
  stroke: #999;
  transition: color 0.2s, fill 0.2s, stroke 0.2s;
}

.favorite-btn-modal.favorite-active svg {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  color: #e30613;
  fill: #e30613;
  stroke: #e30613;
}

/* Conteúdo do Modal */
.anuncio-modal-content {
  flex: 1;
  overflow-y: auto;
}

.anuncio-modal-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Colunas de Informações */
.anuncio-modal-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.anuncio-modal-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.anuncio-modal-col p {
  margin: 0;
  font-size: 15px;
  color: #4a5568;
  line-height: 1.6;
}

.anuncio-modal-col strong {
  color: #2d3748;
  font-weight: 600;
}

/* ==============================================
   MODAL - DESCRIÇÃO
   ============================================== */
.descricao-row.modern-modal-desc {
  padding: 30px;
  background: white;
  border-top: 1px solid #e2e8f0;
  font-size: 15px;
  line-height: 1.8;
  color: #4a5568;
}

.descricao-row.modern-modal-desc strong {
  display: block;
  font-size: 20px;
  color: #2d3748;
  margin-bottom: 12px;
  font-weight: 700;
}

/* ==============================================
   MODAL - FORMULÁRIO DE CONTATO
   ============================================== */
.teste > div > div:last-child {
  padding: 30px;
  background: #f7fafc;
  border-top: 1px solid #e2e8f0;
}

.teste > div > div:last-child h3 {
  margin: 0 0 20px 0;
  font-size: 22px;
  font-weight: 700;
  color: #2d3748;
}

.teste > div > div:last-child form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.teste > div > div:last-child form > div {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.teste > div > div:last-child input,
.teste > div > div:last-child textarea {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 15px;
  font-family: inherit;
  transition: all 0.3s ease;
  background: white;
}

.teste > div > div:last-child input:focus,
.teste > div > div:last-child textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.teste > div > div:last-child textarea {
  resize: vertical;
  min-height: 100px;
}

/* Botão Enviar */
.contact-btn {
  padding: 14px 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.contact-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

/* Mensagem de Sucesso */
.contact-success {
  padding: 14px 20px;
  background: #c6f6d5;
  color: #22543d;
  border-radius: 10px;
  font-weight: 600;
  text-align: center;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Links de Contato */
.teste > div > div:last-child > div:last-child {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.teste > div > div:last-child a {
  flex: 1;
  min-width: 200px;
  padding: 14px 24px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  text-decoration: none;
  color: #2d3748;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
}

.teste > div > div:last-child a:hover {
  border-color: #25d366;
  background: #f0fdf4;
  transform: translateY(-2px);
}

.teste > div > div:last-child a.contact-email:hover {
  border-color: #667eea;
  background: #eef2ff;
}

.teste > div > div:last-child a img {
  width: 22px;
  height: 22px;
}

/* ==============================================
   RESPONSIVIDADE
   ============================================== */

/* Tablets */
@media (max-width: 768px) {
  .property-card-wrapper {
    max-width: 100%;
  }

  .image-section.modern-image {
    height: 200px;
  }

  .address.modern-address strong {
    font-size: 16px;
  }

  .price.modern-price strong {
    font-size: 20px;
  }

  /* Modal em tablets */
  .teste > div > div:first-of-type {
    grid-template-columns: 1fr;
  }

  .info-img.modern-modal-img {
    min-height: 300px;
  }

  .info-direita.modern-modal-info {
    padding: 30px 20px;
  }

  .modal-header-with-heart h2 {
    font-size: 22px;
  }

  .anuncio-modal-cols {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .descricao-row.modern-modal-desc {
    padding: 20px;
  }

  .teste > div > div:last-child {
    padding: 20px;
  }
}

/* Smartphones */
@media (max-width: 480px) {
  .property-card.modern-card {
    border-radius: 12px;
  }

  .image-section.modern-image {
    height: 180px;
  }

  .details-section.modern-details {
    padding: 16px;
  }

  .address.modern-address {
    font-size: 14px;
  }

  .address.modern-address strong {
    font-size: 15px;
  }

  .info.modern-info {
    font-size: 13px;
  }

  .price.modern-price strong {
    font-size: 18px;
  }

  .modern-action-btn {
    padding: 10px 20px;
    font-size: 14px;
  }

  .favorite-btn {
    width: 40px;
    height: 40px;
    top: 28px;
    right: 12px;
  }

  .favorite-btn svg {
    width: 20px;
    height: 20px;
  }

  /* Modal em smartphones */
  .teste {
    padding: 10px;
  }

  .teste > div {
    border-radius: 16px;
  }

  .teste > div > button {
    top: 40px;
    right: 12px;
    width: 38px;
    height: 38px;
    font-size: 24px;
  }

  .info-img.modern-modal-img {
    min-height: 240px;
  }

  .info-direita.modern-modal-info {
    padding: 20px 16px;
  }

  .modal-header-with-heart {
    gap: 6px;
    flex-direction: column;
    align-items: flex-start;
  }

  .modal-header-with-heart h2 {
    font-size: 20px;
  }

  .favorite-btn-modal {
    width: 44px;
    height: 44px;
    align-self: flex-end;
  }

  .anuncio-modal-col p {
    font-size: 14px;
  }

  .descricao-row.modern-modal-desc {
    padding: 16px;
    font-size: 14px;
  }

  .descricao-row.modern-modal-desc strong {
    font-size: 18px;
  }

  .teste > div > div:last-child {
    padding: 16px;
  }

  .teste > div > div:last-child h3 {
    font-size: 20px;
  }

  .teste > div > div:last-child form > div {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .teste > div > div:last-child input,
  .teste > div > div:last-child textarea {
    padding: 12px 14px;
    font-size: 14px;
  }

  .contact-btn {
    padding: 12px 24px;
    font-size: 15px;
  }

  .teste > div > div:last-child a {
    min-width: 100%;
    padding: 12px 20px;
    font-size: 14px;
  }
}

/* Telas muito pequenas */
@media (max-width: 360px) {
  .info.modern-info {
    font-size: 12px;
    flex-direction: column;
    gap: 4px;
  }

  .price.modern-price strong {
    font-size: 16px;
  }

  .modal-header-with-heart h2 {
    font-size: 18px;
  }

  .anuncio-modal-col p {
    font-size: 13px;
  }
}


/* ==============================================
   MODAL - FORMULÁRIO DE CONTATO
   ============================================== */
.teste > div > div:last-child {
  padding: 30px;
  background: #f7fafc;
  border-top: 1px solid #e2e8f0;
}

.teste > div > div:last-child h3 {
  margin: 0 0 20px 0;
  font-size: 22px;
  font-weight: 700;
  color: #2d3748;
}

.teste > div > div:last-child form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.teste > div > div:last-child form > div {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.teste > div > div:last-child input,
.teste > div > div:last-child textarea {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 15px;
  font-family: inherit;
  transition: all 0.3s ease;
  background: white;
}

.teste > div > div:last-child input:focus,
.teste > div > div:last-child textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.teste > div > div:last-child textarea {
  resize: vertical;
  min-height: 100px;
}

/* Botão Enviar */
.contact-btn {
  padding: 14px 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.contact-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

/* Mensagem de Sucesso */
.contact-success {
  padding: 14px 20px;
  background: #c6f6d5;
  color: #22543d;
  border-radius: 10px;
  font-weight: 600;
  text-align: center;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Links de Contato */
.teste > div > div:last-child > div:last-child {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.teste > div > div:last-child a {
  flex: 1;
  min-width: 200px;
  padding: 14px 24px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  text-decoration: none;
  color: #2d3748;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
}

.teste > div > div:last-child a:hover {
  border-color: #25d366;
  background: #f0fdf4;
  transform: translateY(-2px);
}

.teste > div > div:last-child a.contact-email:hover {
  border-color: #667eea;
  background: #eef2ff;
}

.teste > div > div:last-child a img {
  width: 22px;
  height: 22px;
}


/* ==============================================
   ACESSIBILIDADE E MELHORIAS
   ============================================== */

/* Foco para navegação por teclado */
.property-card.modern-card:focus-visible,
.modern-action-btn:focus-visible,
.favorite-btn:focus-visible,
.favorite-btn-modal:focus-visible,
.contact-btn:focus-visible {
  outline: 3px solid #667eea;
  outline-offset: 2px;
}

/* Smooth scroll no modal */
.teste > div {
  scroll-behavior: smooth;
}

/* Melhor legibilidade */
.anuncio-modal-col p,
.descricao-row.modern-modal-desc {
  text-align: justify;
  hyphens: auto;
}

/* Prevenção de quebra de layout */
* {
  box-sizing: border-box;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

@media (max-width: 900px) {
  .modern-card {
    min-height: 300px;
  }
  .modern-image img {
    height: 200px;
  }
  .modern-details {
    padding: 1.5rem 1rem 1.2rem 1rem;
  }
}
</style>