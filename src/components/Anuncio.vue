<script setup>
import { defineOptions, defineProps } from 'vue'
import { computed, ref } from 'vue'
import { useFavoritosStore } from '@/stores/favoritos'

defineOptions({
  name: 'AppAnuncio'
})

// Props
const props = defineProps({
  imovelId: {
    type: Number,
    required: true
  }
})

// Estado do Modal e Carrossel
const mostrarInfo = ref(false)
const currentSlide = ref(0)

// Dados de Contato
const contato = ref({
  nome: '',
  email: '',
  mensagem: '',
  sucesso: false
})

// Store de Favoritos
const favoritosStore = useFavoritosStore()

// Dados e imagens do imóvel
const imovel = computed(() => {
  const data = favoritosStore.getImovel(props.imovelId) || {}

  if (data && !data.imagens) {
    data.imagens = [
      data.imagem || '@/assets/img/image.png',
      'https://via.placeholder.com/1000x500/A0AEC0/FFFFFF?text=Imagem+2',
      'https://via.placeholder.com/1000x500/4299E1/FFFFFF?text=Imagem+3',
      'sketchfab' // marcador para iframe 3D
    ]
  }

  return data
})

// Favorito
const isFavorito = computed(() => favoritosStore.isFavorito(props.imovelId))

// Links de contato
const whatsappLink = computed(() => {
  if (!imovel.value.anunciante?.whatsapp) return ""
  return `https://api.whatsapp.com/send?phone=55${imovel.value.anunciante.whatsapp}&text=Olá,%20estou%20interessado%20no%20imóvel%20${imovel.value.titulo}`
})

const emailLink = computed(() => {
  if (!imovel.value.anunciante?.email) return ""
  return `mailto:${imovel.value.anunciante.email}?subject=Interesse%20no%20imóvel%20${imovel.value.titulo}&body=Olá,%0D%0AEstou%20interessado%20no%20imóvel%20${imovel.value.titulo}.%0D%0A${contato.value.mensagem}`
})

// --- Funções do Modal ---
function abrir() {
  mostrarInfo.value = true
  currentSlide.value = 0
  document.body.style.overflow = 'hidden'
}

function fechar() {
  mostrarInfo.value = false
  document.body.style.overflow = ''
}

// --- Carrossel ---
function nextSlide() {
  const total = imovel.value.imagens.length
  currentSlide.value = (currentSlide.value + 1) % total
}

function prevSlide() {
  const total = imovel.value.imagens.length
  currentSlide.value = (currentSlide.value - 1 + total) % total
}

// --- Favoritos ---
function toggleFavorito(e) {
  e.stopPropagation()
  favoritosStore.toggleFavorito(props.imovelId)
}

// --- Enviar Contato ---
function enviarContato() {
  contato.value.sucesso = true
  setTimeout(() => {
    contato.value.sucesso = false
    fechar()
  }, 3000)
}
</script>

<template>
  <div class="property-card-wrapper">
    <div class="property-card modern-card" @click="abrir" v-if="!mostrarInfo">
      <div class="image-section modern-image">
        <img
          :src="imovel.imagem || '@/assets/img/image.png'"
          :alt="imovel.titulo || 'Foto do imóvel'"
        />
      </div>
      <div class="details-section modern-details">
        <p class="address modern-address">
          <strong>{{ imovel.titulo || 'Título do imóvel' }}</strong
          ><br />
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
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </button>
      </div>
    </div>
    <div v-else class="modal-overlay" @click.self="fechar">
      <div class="modal-content">
        <button @click="fechar" class="modal-close-btn">×</button>
        <div class="modal-main-grid">
          <div class="carousel-container">
            <div
              class="carousel-track"
              :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
            >
              <div v-for="(src, index) in imovel.imagens" :key="index" class="carousel-slide">
                <div v-if="src === 'sketchfab'" class="sketchfab-slide-wrapper">
                  <div class="sketchfab-embed-wrapper">
                    <iframe
                      title="CASA FRAILES - HASEN [Taller de Arquitectura]"
                      frameborder="0"
                      allowfullscreen
                      mozallowfullscreen="true"
                      webkitallowfullscreen="true"
                      allow="autoplay; fullscreen; xr-spatial-tracking"
                      xr-spatial-tracking
                      execution-while-out-of-viewport
                      execution-while-not-rendered
                      web-share
                      src="https://sketchfab.com/models/ab698b84c9c2419fbf15364fe6a43053/embed"
                    >
                    </iframe>
                  </div>
                </div>
                <img
                  v-else
                  :src="src"
                  :alt="imovel.titulo || 'Foto do imóvel'"
                  class="info-img modern-modal-img"
                />
              </div>
            </div>
            <button
              v-if="imovel.imagens && imovel.imagens.length > 1"
              class="carousel-control prev"
              @click.stop="prevSlide"
            >
              &lt;
            </button>
            <button
              v-if="imovel.imagens && imovel.imagens.length > 1"
              class="carousel-control next"
              @click.stop="nextSlide"
            >
              &gt;
            </button>
            <div class="carousel-indicators">
              <span
                v-for="(slide, index) in imovel.imagens"
                :key="index"
                :class="{ active: index === currentSlide }"
                @click.stop="currentSlide = index"
              >
              </span>
            </div>
          </div>
          <div class="info-direita modern-modal-info">
            <div class="anuncio-modal-content">
              <div class="anuncio-modal-info">
                <div class="modal-header-with-heart">
                  <h2>{{ imovel.titulo || 'Título do imóvel' }}</h2>
                  <button
                    class="favorite-btn-modal"
                    :class="{ 'favorite-active': isFavorito }"
                    @click.stop="toggleFavorito"
                    :title="isFavorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'"
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      :fill="isFavorito ? '#e30613' : 'none'"
                      :stroke="isFavorito ? '#e30613' : '#999'"
                      stroke-width="2"
                    >
                      <path
                        fill="currentColor"
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      />
                    </svg>
                  </button>
                </div>
                <div class="descricao-row modern-modal-desc">
                  <strong>Descrição:</strong>
                  {{ imovel.descricao || 'Descrição não disponível.' }}
                </div>
                <div class="anuncio-modal-cols">
                  <div class="anuncio-modal-col">
                    <p><strong>Endereço:</strong> {{ imovel.endereco || 'Não informado' }}</p>
                    <p><strong>Área:</strong> {{ imovel.area || '0m²' }}</p>
                    <p><strong>Quartos:</strong> {{ imovel.quartos || 0 }}</p>
                    <p><strong>Banheiros:</strong> {{ imovel.banheiros || 0 }}</p>
                    <p><strong>Vagas:</strong> {{ imovel.vagas || 0 }}</p>
                    <p><strong>Preço:</strong> {{ imovel.preco || 'Não informado' }}</p>
                    <p v-if="imovel.condominio">
                      <strong>Condomínio:</strong> {{ imovel.condominio }}
                    </p>
                  </div>
                  <div class="anuncio-modal-col">
                    <p><strong>Tipo:</strong> {{ imovel.tipo || 'Não informado' }}</p>
                    <p v-if="imovel.caracteristicas && imovel.caracteristicas.length">
                      <strong>Características:</strong>
                      {{ imovel.caracteristicas.join(', ') }}
                    </p>
                    <p><strong>Estado de conservação:</strong> Excelente</p>
                    <p><strong>Documentação:</strong> OK</p>
                    <p><strong>Proximidades:</strong> Escola, supermercado, parque, farmácia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="contact-section-full-width">
          <div>
            <h3>Contato com o anunciante</h3>
            <form @submit.prevent="enviarContato">
              <div>
                <input type="text" v-model="contato.nome" placeholder="Seu nome" required />
                <input type="email" v-model="contato.email" placeholder="Seu e-mail" required />
              </div>
              <textarea
                v-model="contato.mensagem"
                placeholder="Mensagem"
                rows="3"
                required
              ></textarea>
              <button type="submit" class="contact-btn">Enviar mensagem</button>
              <div v-if="contato.sucesso" class="contact-success">
                Mensagem enviada com sucesso!
              </div>
            </form>
            <div>
              <a :href="whatsappLink" target="_blank">
                <img src="@/assets/img/whatsapp.png" alt="WhatsApp" /> WhatsApp
              </a>
              <a :href="emailLink" target="_blank" class="contact-email">
                <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M2 4v16h20V4H2zm2 2h16v2.236l-8 5.333-8-5.333V6zm0 4.236l8 5.333 8-5.333V18H4V10.236z"
                  />
                </svg>
                E-mail
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* Variáveis de Cores (Atualizadas para um estilo mais bonito) */
:root {
  --primary-color: #6366f1; /* Índigo moderno para botões principais */
  --secondary-color: #10b981; /* Verde esmeralda para botões de contato */
  --accent-color: #f59e0b; /* Âmbar para destaques */
  --text-color-dark: #1f2937; /* Texto principal mais escuro para contraste */
  --text-color-light: #6b7280; /* Texto secundário */
  --bg-color-light: #f8fafc; /* Fundo claro mais suave */
  --border-color: #d1d5db; /* Cor da borda mais sutil */
  --danger-color: #dc2626; /* Vermelho mais vibrante para favorito */
  --success-color: #059669; /* Verde para sucesso */
  --card-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --gradient-primary: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  --gradient-secondary: linear-gradient(135deg, #10b981 0%, #34d399 100%);
  --gradient-accent: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
} /* --- ESTILO DO CARD (FECHADO) --- */
.property-card-wrapper {
  padding: 10px;
}
.property-card {
  /* Reseta estilos anteriores e aplica o novo design */
  cursor: pointer;
  display: flex;
  flex-direction: column; /* Padrão em telas pequenas */
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--card-shadow);
  transition: all 0.4s ease;
  border: 1px solid var(--border-color);
  max-width: 400px; /* Limite para o card na listagem */
  margin: 0 auto;
  position: relative;
}
.property-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--gradient-primary);
  border-radius: 16px 16px 0 0;
}
.property-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.15),
    0 10px 20px -8px rgba(0, 0, 0, 0.1);
} /* Imagem */
.image-section {
  width: 100%;
  height: 200px; /* Altura fixa para consistência */
  overflow: hidden;
}
.image-section img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Garante que a imagem cubra a área sem distorção */
  transition: transform 0.3s ease;
}
.property-card:hover .image-section img {
  transform: scale(1.05);
} /* Detalhes */
.details-section {
  padding: 15px 20px;
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.address {
  margin-bottom: 10px;
  font-size: 16px;
  color: var(--text-color-dark);
}
.address strong {
  font-size: 18px;
  display: block;
  margin-bottom: 4px;
  color: var(--primary-color);
}
.info {
  display: flex;
  gap: 15px;
  font-size: 14px;
  color: var(--text-color-light);
  margin-bottom: 15px;
  flex-wrap: wrap;
}
.info span {
  display: inline-flex;
  align-items: center;
}
.price {
  margin-top: auto; /* Empurra o preço para baixo */
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
.price strong {
  font-size: 24px;
  color: var(--text-color-dark);
  font-weight: 700;
}
.price p {
  font-size: 14px;
  color: var(--text-color-light);
  margin: 0;
}
.modern-action-btn {
  background: var(--gradient-primary);
  color: white;
  border: none;
  padding: 12px 18px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  width: 100%;
  margin-bottom: 10px;
  box-shadow: 0 4px 6px rgba(99, 102, 241, 0.2);
}
.modern-action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(99, 102, 241, 0.3);
} /* Botão Favorito no Card */
.favorite-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  z-index: 10;
  transition:
    background-color 0.2s,
    border-color 0.2s,
    transform 0.2s;
}
.favorite-btn:hover {
  transform: scale(1.1);
  border-color: var(--danger-color);
}
.favorite-btn svg {
  fill: #ccc;
  width: 20px;
  height: 20px;
  transition: fill 0.2s;
}
.favorite-btn.favorite-active {
  background-color: var(--danger-color);
  border-color: var(--danger-color);
}
.favorite-btn.favorite-active svg {
  fill: white;
  stroke: white;
} /* Responsividade para telas maiores (Card) */
@media (min-width: 768px) {
  .property-card {
    flex-direction: row;
    max-width: 800px;
  }
  .image-section {
    width: 40%;
    height: auto; /* Adapta a altura ao conteúdo lateral */
  }
  .details-section {
    width: 60%;
  }
  .price {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
} /* --- ESTILO DO MODAL (ABERTO) --- */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow-y: auto; /* Permite scroll no overlay */
}
.modal-content {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  position: relative;
  width: 95%;
  max-width: 1200px;
  max-height: 95vh;
  margin: 20px auto;
  overflow-y: auto; /* Permite scroll no conteúdo do modal */
  border: 1px solid var(--border-color);
}
.modal-close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: var(--bg-color-light);
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  z-index: 1050;
  color: var(--text-color-dark);
  transition: background-color 0.2s;
}
.modal-close-btn:hover {
  background-color: var(--border-color);
} /* GRID SUPERIOR: CARROSSEL + INFORMAÇÕES */
.modal-main-grid {
  display: grid;
  grid-template-columns: 1fr; /* Padrão: Imagem em cima, info embaixo */
  gap: 20px;
  padding: 20px;
} /* DESCRIÇÃO (AGORA DENTRO DO INFO-DIREITA) */
.descricao-row {
  padding-bottom: 15px;
  font-size: 16px;
  color: var(--text-color-dark);
  line-height: 1.6;
}
.descricao-row strong {
  display: block;
  margin-bottom: 8px;
  color: var(--primary-color);
} /* --- CARROSSEL --- */
.carousel-container {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: var(--bg-color-light);
  min-height: 300px;
}
.carousel-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
}
.carousel-slide {
  min-width: 100%;
  box-sizing: border-box;
}
.info-img {
  width: 100%;
  height: auto;
  display: block;
  min-height: 300px;
  max-height: 500px;
  object-fit: cover;
}
.sketchfab-slide-wrapper {
  width: 100%;
  padding-top: 50%; /* 2:1 Aspect Ratio (exemplo) */
  position: relative;
}
.sketchfab-embed-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.sketchfab-embed-wrapper iframe {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 8px;
}
.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: var(--gradient-primary);
  color: white;
  border: none;
  padding: 12px;
  cursor: pointer;
  z-index: 50;
  font-size: 20px;
  line-height: 1;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(99, 102, 241, 0.2);
}
.carousel-control:hover {
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 6px 12px rgba(99, 102, 241, 0.3);
}
.prev {
  left: 10px;
}
.next {
  right: 10px;
}
.carousel-indicators {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}
.carousel-indicators span {
  width: 10px;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.carousel-indicators span.active {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
} /* --- INFORMAÇÕES E ESPECIFICAÇÕES NO MODAL --- */
.info-direita {
  padding: 0;
}
.anuncio-modal-content {
  display: flex;
  flex-direction: column;
  gap: 15px; /* Reduzido o gap já que a descrição está mais próxima */
}
.modal-header-with-heart {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--border-color);
  padding-bottom: 10px;
  margin-bottom: 10px;
}
.modal-header-with-heart h2 {
  margin: 0;
  color: var(--text-color-dark);
  font-size: 28px;
} /* Botão Favorito no Modal */
.favorite-btn-modal {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}
.favorite-btn-modal svg {
  transition:
    fill 0.2s,
    stroke 0.2s;
}
.favorite-btn-modal:hover svg {
  transform: scale(1.1);
}
.anuncio-modal-cols {
  display: flex;
  flex-wrap: wrap; /* Quebra em telas pequenas */
  gap: 20px;
}
.anuncio-modal-col {
  flex: 1 1 250px; /* Garante que as colunas ocupem espaço igual ou quebrem */
}
.anuncio-modal-col p {
  margin: 8px 0;
  font-size: 15px;
  color: var(--text-color-dark);
}
.anuncio-modal-col strong {
  color: var(--primary-color);
  font-weight: 600;
} /* --- SEÇÃO DE CONTATO (FULL WIDTH INFERIOR) --- */
.contact-section-full-width {
  width: 100%;
  padding: 20px 20px 30px 20px;
  border-top: 1px solid var(--border-color);
  background-color: var(--bg-color-light);
  border-radius: 0 0 12px 12px;
}
.contact-section-full-width h3 {
  color: var(--text-color-dark);
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 15px;
} /* Formulário e Inputs */
.contact-section-full-width form > div {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}
input[type='text'],
input[type='email'],
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 16px;
  box-sizing: border-box;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  resize: vertical;
}
input[type='text']:focus,
input[type='email']:focus,
textarea:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  outline: none;
}
.contact-section-full-width form > div input {
  flex: 1;
  min-width: 150px;
}
.contact-btn {
  background: var(--gradient-secondary);
  color: white;
  border: none;
  padding: 14px 22px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 10px;
  box-shadow: 0 4px 6px rgba(16, 185, 129, 0.2);
}
.contact-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(16, 185, 129, 0.3);
}
.contact-success {
  margin-top: 10px;
  padding: 12px;
  background: var(--gradient-secondary);
  color: white;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(16, 185, 129, 0.2);
} /* Links de WhatsApp e Email */
.contact-section-full-width > div:last-child {
  display: flex;
  gap: 15px;
  margin-top: 15px;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.contact-section-full-width > div:last-child a {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-weight: 600;
  padding: 8px 15px;
  border-radius: 8px;
  transition: background-color 0.2s;
}
.contact-section-full-width > div:last-child a:first-child {
  /* WhatsApp */
  background-color: #25d366;
  color: white;
}
.contact-section-full-width > div:last-child a:first-child:hover {
  background-color: #128c7e;
}
.contact-section-full-width > div:last-child a:last-child {
  /* Email */
  background-color: #f3f4f6;
  color: var(--primary-color);
}
.contact-section-full-width > div:last-child a:last-child:hover {
  background-color: #e5e7eb;
}
.contact-section-full-width > div:last-child img,
.contact-section-full-width > div:last-child svg {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}
.contact-section-full-width > div:last-child svg {
  fill: currentColor;
} /* --- RESPONSIVIDADE DO MODAL (Telas Maiores) --- */
@media (min-width: 1024px) {
  .modal-main-grid {
    grid-template-columns: 2fr 1.5fr; /* Carrossel maior que info */
    padding: 30px;
  }
  .descricao-row {
    padding-bottom: 15px;
  }
  .info-img {
    max-height: 600px;
  }
  .sketchfab-slide-wrapper {
    padding-top: 56.25%; /* 16:9 Aspect Ratio */
  }
  .modal-content {
    max-height: 90vh;
  }
  .contact-section-full-width {
    padding: 20px 30px 30px 30px;
  } /* Limita a largura do conteúdo de contato em telas grandes para melhor leitura */
  .contact-section-full-width > div {
    max-width: 800px;
    margin: 0 auto;
  }
} /* Responsividade adicional para telas médias */
@media (min-width: 768px) and (max-width: 1023px) {
  .modal-main-grid {
    grid-template-columns: 1fr 1fr; /* Duas colunas iguais */
    padding: 25px;
  }
  .contact-section-full-width {
    padding: 20px 25px 30px 25px;
  }
}
@media (max-width: 767px) {
  /* Ajustes para telas muito pequenas */
  .anuncio-modal-cols {
    flex-direction: column;
  }
  .contact-section-full-width form > div {
    flex-direction: column;
  }
}
</style>
