<script>

export default {
  
  name: "PaginaFavorito",
  
  data() {
    return {
      mostrarDetalhes: false,
      imovelSelecionado: null
    };
  },
  methods: {
    
    verDetalhes(id) {
      const imovel = this.favoritosStore.getImovel(id);
      if (imovel) {
        this.imovelSelecionado = imovel;
        this.mostrarDetalhes = true;
      }
    },
    fecharDetalhes() {
      this.mostrarDetalhes = false;
      this.imovelSelecionado = null;
    },
    fecharDetalhesClique(e) {
      if (e.target === e.currentTarget) {
        this.fecharDetalhes();
      }
    },
    fecharFora(e) {
      if (e.target === e.currentTarget) {
        this.fecharDetalhes();
      }
    },
    toggleFavorito(id) {
      this.favoritosStore.toggleFavorito(id);
    },
    entrarEmContato(imovel) {
      // Abrir WhatsApp ou modal de contato
      const mensagem = `Olá! Tenho interesse no imóvel: ${imovel.titulo} - ${imovel.endereco}`;
      const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(mensagem)}`;
      window.open(whatsappUrl, '_blank');
    }
  },
  }
;
</script>

<template>
          <div v-for="imovel in favoritosFiltrados" :key="imovel.id" class="favorito-card">
            <div class="card-imagem">
              <img :src="imovel.imagem" :alt="imovel.titulo" />
              <div class="card-badges">
                <span class="badge" :class="`badge-${imovel.tipo.toLowerCase()}`">{{ imovel.tipo }}</span>
                <span class="badge badge-categoria">{{ imovel.categoria }}</span>
              </div>
              <button class="btn-remover-favorito" @click="toggleFavorito(imovel.id)" title="Remover dos favoritos">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
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
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#6b7280" stroke-width="2" fill="none"/>
                  </svg>
                  <span>{{ imovel.area }}</span>
                </div>
                <div class="detalhe">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="#6b7280" stroke-width="2" fill="none"/>
                    <line x1="8" y1="21" x2="16" y2="21" stroke="#6b7280" stroke-width="2"/>
                    <line x1="12" y1="17" x2="12" y2="21" stroke="#6b7280" stroke-width="2"/>
                  </svg>
                  <span>{{ imovel.quartos }} qto{{ imovel.quartos !== 1 ? 's' : '' }}</span>
                </div>
                <div class="detalhe">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="3" stroke="#6b7280" stroke-width="2" fill="none"/>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="#6b7280" stroke-width="2" fill="none"/>
                  </svg>
                  <span>{{ imovel.banheiros }} bnh{{ imovel.banheiros !== 1 ? 's' : '' }}</span>
                </div>
                <div class="detalhe">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2m0 8h8M5 15v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2M5 15V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6" stroke="#6b7280" stroke-width="2" fill="none"/>
                  </svg>
                  <span>{{ imovel.vagas }} vaga{{ imovel.vagas !== 1 ? 's' : '' }}</span>
                </div>
              </div>
              
              <div class="card-caracteristicas">
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
                    <path d="M22 12A10 10 0 1 1 12 2a10 10 0 0 1 10 10Z" fill="#25D366"/>
                    <path d="m9 12 2 2 4-4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Entrar em Contato
                </button>
                <button class="btn-detalhes" @click="verDetalhes(imovel.id)">
                  Ver Detalhes
                </button>
              </div>
            </div>
          </div>

  <!-- Modal de Detalhes -->
  <div v-if="mostrarDetalhes && imovelSelecionado" class="info-overlay modern-overlay" @click="fecharFora">
    <div class="modern-modal-panel" @click.stop>
      <button class="fechar-info modern-close" @click="fecharDetalhes">×</button>
      <div class="info-content-row modern-modal-content">
        <img class="info-img modern-modal-img" :src="imovelSelecionado.imagem || '@/assets/img/image.png'" :alt="imovelSelecionado.titulo" />
        <div class="info-direita modern-modal-info">
          <div class="modal-header-with-heart">
            <h2>{{ imovelSelecionado.titulo || 'Título do imóvel' }}</h2>
            <button 
              class="favorite-btn-modal" 
              :class="{ 'favorite-active': favoritosStore.isFavorito(imovelSelecionado.id) }"
              @click="toggleFavorito(imovelSelecionado.id)"
              :title="favoritosStore.isFavorito(imovelSelecionado.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
          </div>
          <div class="info-colunas modern-modal-cols">
            <div class="coluna-esq modern-modal-col">
              <p><strong>Endereço:</strong> {{ imovelSelecionado.endereco || 'Não informado' }}</p>
              <p><strong>Área:</strong> {{ imovelSelecionado.area || '0m²' }}</p>
              <p><strong>Quartos:</strong> {{ imovelSelecionado.quartos || 0 }}</p>
              <p><strong>Banheiros:</strong> {{ imovelSelecionado.banheiros || 0 }}</p>
              <p><strong>Vagas:</strong> {{ imovelSelecionado.vagas || 0 }}</p>
              <p><strong>Preço:</strong> {{ imovelSelecionado.preco || 'Não informado' }}</p>
              <p v-if="imovelSelecionado.condominio"><strong>Condomínio:</strong> {{ imovelSelecionado.condominio }}</p>
            </div>
            <div class="coluna-dir modern-modal-col">
              <p><strong>Tipo:</strong> {{ imovelSelecionado.tipo || 'Não informado' }}</p>
              <p v-if="imovelSelecionado.caracteristicas && imovelSelecionado.caracteristicas.length">
                <strong>Características:</strong> {{ imovelSelecionado.caracteristicas.join(', ') }}
              </p>
              <p><strong>Estado de conservação:</strong> Excelente</p>
              <p><strong>Documentação:</strong> OK</p>
              <p><strong>Proximidades:</strong> Escola, supermercado, parque, farmácia</p>
            </div>
          </div>
        </div>
      </div>
      <div class="descricao-row modern-modal-desc">
        <strong>Descrição:</strong> {{ imovelSelecionado.descricao || 'Descrição não disponível.' }}
      </div>
    </div>
  </div>


</template>

<style scoped>

/* Grid de Favoritos */
.favoritos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 32px;
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
}

.badge {
  background: rgba(255, 255, 255, 0.95);
  color: #374151;
  padding: 4px 8px;
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

.caracteristica, .caracteristica-mais {
  background: #f3f4f6;
  color: #374151;
  padding: 4px 8px;
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

/* Responsividade */
@media (max-width: 768px) {
   .favoritos-container {
    padding-top: 60px;
  }
  
  .favoritos-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
}

@media (max-width: 600px) {
  .modern-modal-panel {
    padding: 0.7rem 0.2rem;
  }
  .info-content-row {
    gap: 0.7rem;
  }
  .info-img {
    height: 38vw;
  }
}

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
  background: #333;
}


@keyframes modalFadeIn {
  from { 
    opacity: 0;
    transform: scale(0.9);
  }
  to { 
    opacity: 1;
    transform: scale(1);
  }
}

.info-content-row {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 30px;
  width: 100%;
  padding: 30px;
}

.info-img {
  width: 400px;
  height: 300px;
  border-radius: 12px;
  object-fit: cover;
  flex-shrink: 0;
}

.info-direita {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.modal-header-with-heart {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.modal-header-with-heart h2 {
  font-size: 1.8rem;
  color: #333;
  margin: 0;
  font-weight: 700;
  flex: 1;
  margin-right: 1rem;
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
  z-index: 10;
}

.favorite-btn-modal:hover {
  background: #fef2f2;
  border-color: #fca5a5;
  color: #ef4444;
  transform: scale(1.1);
}

.favorite-btn-modal.favorite-active {
  background: #fef2f2;
  border-color: #e30613;
  color: #e30613;
}

.favorite-btn-modal.favorite-active:hover {
  background: #e30613;
  color: white;
}

.info-colunas {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.coluna-esq p, .coluna-dir p {
  margin: 0.5rem 0;
  color: #555;
  line-height: 1.6;
}

.coluna-esq strong, .coluna-dir strong {
  color: #333;
  font-weight: 600;
}

.descricao-row {
  border-top: 1px solid #e5e7eb;
  padding: 20px 30px 30px;
  margin-top: 20px;
  color: #374151;
  line-height: 1.6;
}

.descricao-row strong {
  color: #333;
  font-weight: 600;
}

</style>
