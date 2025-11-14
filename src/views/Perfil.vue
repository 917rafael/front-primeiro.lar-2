<script>
import HeaderVenda from '@/components/HeaderVenda.vue';
import FooterComponent from '@/components/Footer.vue';

export default {
  components: {
    HeaderVenda,
    FooterComponent
  },
  name: "PerfilUsuario",
  data() {
    return {
      editandoPerfil: false,
      editandoEndereco: false,
      usuario: {
        nome: 'João Silva',
        email: 'joao.silva@email.com',
        telefone: '(11) 99999-9999',
        cpf: '123.456.789-00',
        dataNascimento: '15/03/1985',
        endereco: {
          cep: '01234-567',
          rua: 'Rua das Flores, 123',
          bairro: 'Centro',
          cidade: 'São Paulo',
          estado: 'SP'
        },
        preferencias: {
          tipoImovel: 'Casa',
          faixaPreco: 'R$ 300.000 - R$ 600.000',
          localizacao: 'São Paulo - SP'
        },
        fotoPerfil: '/src/assets/img/image.png'
      },
      usuarioEditado: {},
      imoveisAnunciados: [
        {
          id: 1,
          titulo: 'Casa Moderna Vila Madalena',
          endereco: 'Rua Harmonia, 456 - Vila Madalena, São Paulo/SP',
          preco: 'R$ 750.000',
          imagem: '/src/assets/img/image.png',
          status: 'Ativo',
          dataAnuncio: '15/10/2024'
        },
        {
          id: 2,
          titulo: 'Apartamento Centro',
          endereco: 'Av. São João, 123 - Centro, São Paulo/SP',
          preco: 'R$ 450.000',
          imagem: '/src/assets/img/image.png',
          status: 'Vendido',
          dataAnuncio: '02/09/2024'
        }
      ],
      imoveisAdquiridos: [
        {
          id: 1,
          titulo: 'Apartamento Jardins',
          endereco: 'Rua Augusta, 789 - Jardins, São Paulo/SP',
          preco: 'R$ 850.000',
          imagem: '/src/assets/img/image.png',
          dataAquisicao: '20/08/2024'
        }
      ]
    };
  },
  methods: {
    iniciarEdicao() {
      this.editandoPerfil = true;
      this.usuarioEditado = { ...this.usuario };
    },
    cancelarEdicao() {
      this.editandoPerfil = false;
      this.usuarioEditado = {};
    },
    salvarPerfil() {
      this.usuario = { ...this.usuarioEditado };
      this.editandoPerfil = false;
      this.usuarioEditado = {};
      // Aqui você salvaria no backend
      alert('Perfil atualizado com sucesso!');
    },
    iniciarEdicaoEndereco() {
      this.editandoEndereco = true;
      this.usuarioEditado = { ...this.usuario };
    },
    cancelarEdicaoEndereco() {
      this.editandoEndereco = false;
      this.usuarioEditado = {};
    },
    salvarEndereco() {
      this.usuario = { ...this.usuarioEditado };
      this.editandoEndereco = false;
      this.usuarioEditado = {};
      // Aqui você salvaria no backend
      alert('Endereço atualizado com sucesso!');
    },
    alterarFoto() {
      // Lógica para alterar foto de perfil
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (this.editandoPerfil) {
              this.usuarioEditado.fotoPerfil = e.target.result;
            } else {
              this.usuario.fotoPerfil = e.target.result;
            }
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    }
  }
};
</script>

<template>
  <HeaderVenda />
  <div class="perfil-container">
    <!-- Hero Section -->
    <section class="perfil-hero">
      <div class="container">
        <div class="hero-content">
          <h1>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#ff6a3d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="12" cy="7" r="4" stroke="#ff6a3d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Meu Perfil
          </h1>
          <p>Gerencie suas informações pessoais e preferências</p>
        </div>
      </div>
    </section>

    <!-- Conteúdo Principal -->
    <section class="perfil-conteudo">
      <div class="container">
        <div class="perfil-grid">
          <!-- Card de Informações Pessoais -->
          <div class="perfil-card">
            <div class="card-header">
              <h2>Informações Pessoais</h2>
              <button 
                v-if="!editandoPerfil" 
                @click="iniciarEdicao" 
                class="btn-editar"
                title="Editar perfil"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Editar
              </button>
            </div>

            <div class="perfil-foto-section">
              <div class="foto-container">
                <img 
                  :src="editandoPerfil ? usuarioEditado.fotoPerfil : usuario.fotoPerfil" 
                  :alt="editandoPerfil ? usuarioEditado.nome : usuario.nome" 
                  class="foto-perfil"
                />
                <button 
                  v-if="editandoPerfil" 
                  @click="alterarFoto" 
                  class="btn-alterar-foto"
                  title="Alterar foto"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="12" cy="13" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            <div class="info-grid">
              <div class="info-campo">
                <label>Nome Completo:</label>
                <input 
                  v-if="editandoPerfil" 
                  v-model="usuarioEditado.nome" 
                  type="text" 
                  class="input-editar"
                />
                <span v-else class="info-valor">{{ usuario.nome }}</span>
              </div>

              <div class="info-campo">
                <label>E-mail:</label>
                <input 
                  v-if="editandoPerfil" 
                  v-model="usuarioEditado.email" 
                  type="email" 
                  class="input-editar"
                />
                <span v-else class="info-valor">{{ usuario.email }}</span>
              </div>

              <div class="info-campo">
                <label>Telefone:</label>
                <input 
                  v-if="editandoPerfil" 
                  v-model="usuarioEditado.telefone" 
                  type="tel" 
                  class="input-editar"
                />
                <span v-else class="info-valor">{{ usuario.telefone }}</span>
              </div>

              <div class="info-campo">
                <label>CPF:</label>
                <span class="info-valor">{{ usuario.cpf }}</span>
              </div>

              <div class="info-campo">
                <label>Data de Nascimento:</label>
                <input 
                  v-if="editandoPerfil" 
                  v-model="usuarioEditado.dataNascimento" 
                  type="text" 
                  class="input-editar"
                />
                <span v-else class="info-valor">{{ usuario.dataNascimento }}</span>
              </div>
            </div>

            <div v-if="editandoPerfil" class="acoes-edicao">
              <button @click="salvarPerfil" class="btn-salvar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="20,6 9,17 4,12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Salvar
              </button>
              <button @click="cancelarEdicao" class="btn-cancelar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Cancelar
              </button>
            </div>
          </div>

          <!-- Card de Endereço -->
          <div class="perfil-card">
            <div class="card-header">
              <h2>Endereço</h2>
              <button 
                v-if="!editandoEndereco" 
                @click="iniciarEdicaoEndereco" 
                class="btn-editar"
                title="Editar endereço"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Editar
              </button>
            </div>

            <div class="info-grid">
              <div class="info-campo">
                <label>CEP:</label>
                <input 
                  v-if="editandoEndereco" 
                  v-model="usuarioEditado.endereco.cep" 
                  type="text" 
                  class="input-editar"
                />
                <span v-else class="info-valor">{{ usuario.endereco.cep }}</span>
              </div>

              <div class="info-campo info-campo-completo">
                <label>Endereço:</label>
                <input 
                  v-if="editandoEndereco" 
                  v-model="usuarioEditado.endereco.rua" 
                  type="text" 
                  class="input-editar"
                />
                <span v-else class="info-valor">{{ usuario.endereco.rua }}</span>
              </div>

              <div class="info-campo">
                <label>Bairro:</label>
                <input 
                  v-if="editandoEndereco" 
                  v-model="usuarioEditado.endereco.bairro" 
                  type="text" 
                  class="input-editar"
                />
                <span v-else class="info-valor">{{ usuario.endereco.bairro }}</span>
              </div>

              <div class="info-campo">
                <label>Cidade:</label>
                <input 
                  v-if="editandoEndereco" 
                  v-model="usuarioEditado.endereco.cidade" 
                  type="text" 
                  class="input-editar"
                />
                <span v-else class="info-valor">{{ usuario.endereco.cidade }}</span>
              </div>

              <div class="info-campo">
                <label>Estado:</label>
                <input 
                  v-if="editandoEndereco" 
                  v-model="usuarioEditado.endereco.estado" 
                  type="text" 
                  class="input-editar"
                />
                <span v-else class="info-valor">{{ usuario.endereco.estado }}</span>
              </div>
            </div>

            <!-- Botões de ação para endereço -->
            <div v-if="editandoEndereco" class="acoes-edicao">
              <button @click="salvarEndereco" class="btn-salvar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="20,6 9,17 4,12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Salvar
              </button>
              <button @click="cancelarEdicaoEndereco" class="btn-cancelar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Cancelar
              </button>
            </div>
          </div>

          <!-- Card de Imóveis Anunciados -->
          <div class="perfil-card">
            <div class="card-header">
              <h2>Meus Imóveis Anunciados</h2>
              <router-link to="/anuncie" class="btn-adicionar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                  <path d="M12 8v8M8 12h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Anunciar Imóvel
              </router-link>
            </div>

            <div class="imoveis-lista">
              <div v-if="imoveisAnunciados.length === 0" class="lista-vazia">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#d1d5db" stroke-width="2" fill="none"/>
                </svg>
                <p>Você ainda não possui imóveis anunciados</p>
                <router-link to="/anuncie" class="btn-anunciar-primeiro">Anunciar Primeiro Imóvel</router-link>
              </div>

              <div v-else class="imoveis-grid">
                <div v-for="imovel in imoveisAnunciados" :key="imovel.id" class="imovel-card">
                  <img :src="imovel.imagem" :alt="imovel.titulo" class="imovel-imagem" />
                  <div class="imovel-info">
                    <h4>{{ imovel.titulo }}</h4>
                    <p class="imovel-endereco">{{ imovel.endereco }}</p>
                    <p class="imovel-preco">{{ imovel.preco }}</p>
                    <div class="imovel-status">
                      <span :class="`status-${imovel.status.toLowerCase()}`">{{ imovel.status }}</span>
                    </div>
                  </div>
                  <div class="imovel-acoes">
                    <button class="btn-acao" title="Editar">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </button>
                    <button class="btn-acao btn-remover" title="Remover">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <polyline points="3,6 5,6 21,6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Card de Imóveis Adquiridos -->
          <div class="perfil-card">
            <div class="card-header">
              <h2>Meus Imóveis Adquiridos</h2>
            </div>

            <div class="imoveis-lista">
              <div v-if="imoveisAdquiridos.length === 0" class="lista-vazia">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#d1d5db" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="12" cy="7" r="4" stroke="#d1d5db" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p>Você ainda não possui imóveis adquiridos</p>
              </div>

              <div v-else class="imoveis-grid">
                <div v-for="imovel in imoveisAdquiridos" :key="imovel.id" class="imovel-card">
                  <img :src="imovel.imagem" :alt="imovel.titulo" class="imovel-imagem" />
                  <div class="imovel-info">
                    <h4>{{ imovel.titulo }}</h4>
                    <p class="imovel-endereco">{{ imovel.endereco }}</p>
                    <p class="imovel-preco">{{ imovel.preco }}</p>
                    <div class="imovel-data">
                      <span>Adquirido em: {{ imovel.dataAquisicao }}</span>
                    </div>
                  </div>
                  <div class="imovel-acoes">
                    <button class="btn-acao" title="Ver Detalhes">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <FooterComponent />
</template>

<style scoped>
.perfil-container {
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
.perfil-hero {
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
}

.hero-content p {
  font-size: 1.2rem;
  color: #6b7280;
  font-weight: 500;
}

/* Conteúdo Principal */
.perfil-conteudo {
  padding: 60px 0;
}

.perfil-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 32px;
}

.perfil-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e7eb;
  overflow: hidden;
  transition: all 0.3s ease;
}

.perfil-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.card-header {
  padding: 24px 24px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.btn-editar {
  background: #ff6a3d;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-editar:hover {
  background: #e55a2b;
  transform: translateY(-1px);
}

/* Foto de Perfil */
.perfil-foto-section {
  padding: 24px;
  text-align: center;
}

.foto-container {
  position: relative;
  display: inline-block;
}

.foto-perfil {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #ff6a3d;
  box-shadow: 0 4px 16px rgba(255, 106, 61, 0.3);
}

.btn-alterar-foto {
  position: absolute;
  bottom: 0;
  right: 0;
  background: #ff6a3d;
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.btn-alterar-foto:hover {
  background: #e55a2b;
  transform: scale(1.1);
}

/* Grid de Informações */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  padding: 24px;
}

.info-campo {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-campo-completo {
  grid-column: 1 / -1;
}

.info-campo label {
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
}

.info-valor {
  color: #1f2937;
  font-size: 1rem;
  padding: 12px 0;
  border-bottom: 1px solid #e5e7eb;
}

.input-editar {
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.input-editar:focus {
  outline: none;
  border-color: #ff6a3d;
  box-shadow: 0 0 0 3px rgba(255, 106, 61, 0.1);
}

/* Ações de Edição */
.acoes-edicao {
  padding: 24px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.btn-salvar {
  background: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-salvar:hover {
  background: #059669;
  transform: translateY(-1px);
}

.btn-cancelar {
  background: #6b7280;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-cancelar:hover {
  background: #4b5563;
  transform: translateY(-1px);
}

/* Estatísticas */
.estatisticas-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  padding: 24px;
}

.estatistica-item {
  text-align: center;
  padding: 20px;
  background: linear-gradient(135deg, #ff6a3d 0%, #e55a2b 100%);
  border-radius: 12px;
  color: white;
}

.estatistica-numero {
  font-size: 2rem;
  font-weight: 900;
  margin-bottom: 8px;
}

.estatistica-label {
  font-size: 0.9rem;
  font-weight: 500;
  opacity: 0.9;
}

/* Estilos para Imóveis */
.btn-adicionar {
  background: #ff6a3d;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}

.btn-adicionar:hover {
  background: #e85a2b;
  transform: translateY(-1px);
}

.imoveis-lista {
  margin-top: 20px;
}

.lista-vazia {
  text-align: center;
  padding: 40px 20px;
  color: #6b7280;
}

.lista-vazia svg {
  margin-bottom: 16px;
}

.lista-vazia p {
  margin-bottom: 20px;
  font-size: 1.1rem;
}

.btn-anunciar-primeiro {
  background: #ff6a3d;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  display: inline-block;
}

.btn-anunciar-primeiro:hover {
  background: #e85a2b;
  transform: translateY(-1px);
}

.imoveis-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.imovel-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
  position: relative;
}

.imovel-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.imovel-imagem {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.imovel-info {
  padding: 16px;
}

.imovel-info h4 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 8px;
}

.imovel-endereco {
  color: #6b7280;
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.imovel-preco {
  font-size: 1.2rem;
  font-weight: 700;
  color: #ff6a3d;
  margin-bottom: 12px;
}

.imovel-status {
  margin-bottom: 12px;
}

.status-ativo {
  background: #dcfce7;
  color: #166534;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.status-vendido {
  background: #fee2e2;
  color: #991b1b;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.imovel-data {
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 12px;
}

.imovel-acoes {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  gap: 8px;
}

.btn-acao {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #6b7280;
  backdrop-filter: blur(4px);
}

.btn-acao:hover {
  background: #ff6a3d;
  color: white;
  transform: scale(1.1);
}

.btn-remover:hover {
  background: #ef4444;
}

/* Responsividade */
@media (max-width: 768px) {
  .perfil-container {
    padding-top: 60px;
  }
  
  .hero-content h1 {
    font-size: 2.5rem;
    flex-direction: column;
    gap: 12px;
  }
  
  .perfil-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .acoes-edicao {
    flex-direction: column;
  }
  
  .estatisticas-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .imoveis-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 15px;
  }
  
  .foto-perfil {
    width: 100px;
    height: 100px;
  }
  
  .btn-alterar-foto {
    width: 32px;
    height: 32px;
  }
}
</style>