<script>
import HeaderVenda from '@/components/HeaderVenda.vue';
import FooterComponent from '@/components/Footer.vue';
import { useFavoritosStore } from '@/stores/favoritos';

export default {
  components: {
    HeaderVenda,
    FooterComponent
  },
  name: "PaginaFavorito",
  setup() {
    const favoritosStore = useFavoritosStore()
    return { favoritosStore }
  },
  data() {
    return {
      filtroTipo: 'todos',
      ordenacao: 'relevancia',
      mostrarDetalhes: false,
      imovelSelecionado: null
    };
  },
  methods: {
    removerFavorito(id) {
      this.favoritosStore.removerFavorito(id);
    },
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
  computed: {
    favoritos() {
      return this.favoritosStore.imoveisFavoritos;
    },
    favoritosFiltrados() {
      let filtrados = this.favoritos;

      if (this.filtroTipo !== 'todos') {
        filtrados = filtrados.filter(fav => fav.tipo && fav.tipo.toLowerCase() === this.filtroTipo);
      }

      // Ordenação
      if (this.ordenacao === 'preco-crescente') {
        filtrados.sort((a, b) => {
          const precoA = parseFloat(a.preco.replace(/[^\d,]/g, '').replace(',', '.'));
          const precoB = parseFloat(b.preco.replace(/[^\d,]/g, '').replace(',', '.'));
          return precoA - precoB;
        });
      } else if (this.ordenacao === 'preco-decrescente') {
        filtrados.sort((a, b) => {
          const precoA = parseFloat(a.preco.replace(/[^\d,]/g, '').replace(',', '.'));
          const precoB = parseFloat(b.preco.replace(/[^\d,]/g, '').replace(',', '.'));
          return precoB - precoA;
        });
      }

      return filtrados;
    }
  }
};
</script>

<template>
  <HeaderVenda />
  <div class="favoritos-container">
    <!-- Hero Section -->
    <section class="favoritos-hero">
      <div class="container">
        <div class="hero-content">
          <h1>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="#ff6a3d"/>
            </svg>
            Meus Favoritos
          </h1>
          <p>Gerencie seus imóveis salvos e encontre sua próxima oportunidade</p>
        </div>
      </div>
    </section>

    <!-- Filtros e Controles -->
    <section class="favoritos-controles">
      <div class="container">
        <div class="controles-wrapper">
          <div class="filtros">
            <div class="filtro-grupo">
              <label>Tipo:</label>
              <select v-model="filtroTipo" class="filtro-select">
                <option value="todos">Todos</option>
                <option value="venda">Venda</option>
                <option value="aluguel">Aluguel</option>
              </select>
            </div>
            <div class="filtro-grupo">
              <label>Ordenar por:</label>
              <select v-model="ordenacao" class="filtro-select">
                <option value="relevancia">Relevância</option>
                <option value="preco-crescente">Menor preço</option>
                <option value="preco-decrescente">Maior preço</option>
              </select>
            </div>
          </div>
          <div class="contador">
            <span>{{ favoritosFiltrados.length }} imóvel{{ favoritosFiltrados.length !== 1 ? 'eis' : '' }} {{ favoritosFiltrados.length !== 1 ? 'encontrados' : 'encontrado' }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Lista de Favoritos -->
    <section class="favoritos-lista">
      <div class="container">
        <div v-if="favoritosFiltrados.length === 0" class="favoritos-vazio">
          <div class="vazio-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="#d1d5db" stroke-width="2" fill="none"/>
            </svg>
          </div>
          <h3>Nenhum favorito encontrado</h3>
          <p>Você ainda não possui imóveis salvos nos favoritos.</p>
          <router-link to="/vendas" class="btn-explorar">
            Explorar Imóveis
          </router-link>
        </div>

        <div v-else class="favoritos-grid">
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
        </div>
      </div>
    </section>
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

  <FooterComponent />
</template>

<style scoped>
.favoritos-container {
  font-family: 'Inter', 'Montserrat', 'Segoe UI', Arial, sans-serif;
  background: linear-gradient(120deg, #f6f7fb 0%, #fbeede 100%);
  min-height: 100vh;
  padding-top: 80px;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Hero Section */
.favoritos-hero {
  padding: 60px 0;
  background: linear-gradient(135deg, #fff 0%, #f8fafc 100%);
  border-bottom: 1px solid #e2e8f0;
}

.hero-content {
  text-align: center;
}

.hero-content h1 {
  font-size: 3rem;
  font-weight: 900;
  color: #1f2937;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  font-family: 'Montserrat', 'Inter', sans-serif;
  letter-spacing: -1px;
}

.hero-content p {
  font-size: 1.25rem;
  color: #6b7280;
  font-weight: 400;
}

/* Controles */
.favoritos-controles {
  padding: 32px 0;
  background: white;
  border-bottom: 1px solid #e5e7eb;
}

.controles-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
}

.filtros {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.filtro-grupo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filtro-grupo label {
  font-weight: 600;
  color: #374151;
  font-size: 0.95rem;
}

.filtro-select {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 0.95rem;
  color: #374151;
  cursor: pointer;
  transition: border-color 0.2s;
}

.filtro-select:focus {
  outline: none;
  border-color: #ff6a3d;
}

.contador {
  color: #6b7280;
  font-weight: 500;
}

/* Lista de Favoritos */
.favoritos-lista {
  padding: 40px 0 80px;
}

.favoritos-vazio {
  text-align: center;
  padding: 80px 20px;
}

.vazio-icon {
  margin-bottom: 24px;
}

.favoritos-vazio h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #374151;
  margin-bottom: 12px;
}

.favoritos-vazio p {
  font-size: 1.1rem;
  color: #6b7280;
  margin-bottom: 32px;
}

.btn-explorar {
  background: linear-gradient(90deg, #ff6a3d 0%, #ffb347 100%);
  color: white;
  text-decoration: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(255, 106, 61, 0.3);
}

.btn-explorar:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 106, 61, 0.4);
}

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

.btn-remover-favorito {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.95);
  border: none;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(4px);
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.btn-remover-favorito:hover {
  background: rgba(239, 68, 68, 0.9);
}

.btn-remover-favorito:hover svg path {
  fill: white;
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

  .hero-content h1 {
    font-size: 2.5rem;
    flex-direction: column;
    gap: 12px;
  }

  .controles-wrapper {
    flex-direction: column;
    align-items: stretch;
  }

  .filtros {
    justify-content: center;
  }

  .favoritos-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .card-acoes {
    flex-direction: column;
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

.info-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  backdrop-filter: blur(4px);
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

.modern-modal-panel {
  background: #fff;
  max-width: 96vw;
  min-width: 340px;
  height: 100vh;
  border-radius: 24px 0 0 24px;
  box-shadow: -8px 0 32px rgba(0,0,0,0.10);
  padding: 2.8rem 2.2rem 2.2rem 2.2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  animation: modalFadeIn 0.3s ease-out;
  overflow-y: auto;
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

.modern-modal-panel {
  background: white;
  border-radius: 20px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  width: 95%;
  max-width: 1200px;
  max-height: 85vh;
  overflow-y: auto;
  position: relative;
  margin: 0;
}

@media (max-width: 768px) {
  .modern-modal-panel {
    width: 90%;
    max-width: none;
    margin: 20px;
  }

  .info-content-row {
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }

  .info-img {
    width: 100%;
    height: 250px;
  }

  .info-colunas {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .modal-header-with-heart {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .modal-header-with-heart h2 {
    margin-right: 0;
  }

  .favorite-btn-modal {
    align-self: flex-end;
    width: 45px;
    height: 45px;
  }
}
</style>
