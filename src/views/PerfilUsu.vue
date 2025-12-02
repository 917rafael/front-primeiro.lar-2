<script setup>
import { ref, onMounted } from 'vue'
import api from "../services/api.js";

// Estados reativas
const usuario = ref({
  id: null,
  name: '',
  email: '',
  foto: null,
  telefone: '',
  endereco: '',
  dataNascimento: '',
  bio: ''
})

const editando = ref(false)
const erro = ref('')
const sucesso = ref('')
const carregando = ref(true)
const alterandoSenha = ref(false)
const senhas = ref({
  atual: '',
  nova: '',
  confirmar: ''
})

const fotoPreview = ref('')
const arquivoFoto = ref(null)

// Carregar dados do perfil
onMounted(async () => {
  await carregarPerfil()
})

async function carregarPerfil() {
  try {
    carregando.value = true
    const response = await api.get('usuarios/perfil')
    usuario.value = { ...response.data }
    
    if (usuario.value.foto) {
      fotoPreview.value = usuario.value.foto
    }
  } catch {
    // Tentar carregar do localStorage primeiro
    const dadosSalvos = carregarDoLocalStorage()
    
    if (dadosSalvos) {
      usuario.value = { ...dadosSalvos }
      if (usuario.value.foto) {
        fotoPreview.value = usuario.value.foto
      }
      console.log('Dados carregados do localStorage')
    } else {
      // Se não há dados salvos, usar dados padrão
      usuario.value = {
        id: 1,
        name: 'João Silva',
        email: 'joao.silva@email.com',
        foto: null,
        telefone: '(11) 99999-9999',
        endereco: 'São Paulo, SP',
        dataNascimento: '1990-05-15',
        bio: 'Apaixonado por tecnologia e inovação.'
      }
      erro.value = 'Erro ao carregar dados do perfil (usando dados padrão)'
    }
  } finally {
    carregando.value = false
  }
}

function carregarDoLocalStorage() {
  try {
    const dadosSalvos = localStorage.getItem('perfilUsuario')
    if (dadosSalvos) {
      return JSON.parse(dadosSalvos)
    }
    return null
  } catch {
    console.error('Erro ao carregar do localStorage')
    return null
  }
}

function iniciarEdicao() {
  editando.value = true
  erro.value = ''
  sucesso.value = ''
}

function cancelarEdicao() {
  editando.value = false
  alterandoSenha.value = false
  erro.value = ''
  sucesso.value = ''
  carregarPerfil()
}

async function salvarPerfil() {
  erro.value = ''
  sucesso.value = ''

  if (!usuario.value.name || !usuario.value.email) {
    erro.value = 'Nome e e-mail são obrigatórios.'
    return
  }

  try {
    const dadosFormulario = new FormData()
    
    dadosFormulario.append('name', usuario.value.name)
    dadosFormulario.append('email', usuario.value.email)
    dadosFormulario.append('telefone', usuario.value.telefone)
    dadosFormulario.append('endereco', usuario.value.endereco)
    dadosFormulario.append('dataNascimento', usuario.value.dataNascimento)
    dadosFormulario.append('bio', usuario.value.bio)

    if (arquivoFoto.value) {
      dadosFormulario.append('foto', arquivoFoto.value)
    }

    const response = await api.put(`usuarios/${usuario.value.id}`, dadosFormulario, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if (response.status === 200) {
      sucesso.value = 'Perfil atualizado com sucesso!'
      editando.value = false
      arquivoFoto.value = null
      
      // Salvar no localStorage para persistir os dados
      salvarNoLocalStorage()
      
      setTimeout(() => {
        sucesso.value = ''
      }, 3000)
    }
  } 
    catch (error) {
    console.log('API não disponível, salvando dados localmente')
    }
    if (arquivoFoto.value && fotoPreview.value) {
      usuario.value.foto = fotoPreview.value
    }
    // Salvar no localStorage
    salvarNoLocalStorage()
    
    sucesso.value = 'Perfil atualizado com sucesso (dados salvos localmente)!'
    editando.value = false
    arquivoFoto.value = null
    
    setTimeout(() => {
      sucesso.value = ''
    }, 3000)
  }


function salvarNoLocalStorage() {
  try {
    const dadosUsuario = {
      id: usuario.value.id,
      name: usuario.value.name,
      email: usuario.value.email,
      telefone: usuario.value.telefone,
      endereco: usuario.value.endereco,
      dataNascimento: usuario.value.dataNascimento,
      bio: usuario.value.bio,
      foto: usuario.value.foto || fotoPreview.value
    }
    
    localStorage.setItem('perfilUsuario', JSON.stringify(dadosUsuario))
  } catch {
    console.error('Erro ao salvar no localStorage')
  }
}

function selecionarFoto(event) {
  const arquivo = event.target.files[0]
  
  if (arquivo) {
    if (!arquivo.type.startsWith('image/')) {
      erro.value = 'Por favor, selecione apenas arquivos de imagem.'
      return
    }
    
    if (arquivo.size > 5 * 1024 * 1024) {
      erro.value = 'A imagem deve ter no máximo 5MB.'
      return
    }
    
    arquivoFoto.value = arquivo
    
    const reader = new FileReader()
    reader.onload = (e) => {
      fotoPreview.value = e.target.result
    }
    reader.readAsDataURL(arquivo)
  }
}

async function alterarSenha() {
  erro.value = ''
  sucesso.value = ''

  if (!senhas.value.atual || !senhas.value.nova || !senhas.value.confirmar) {
    erro.value = 'Preencha todos os campos de senha.'
    return
  }

  if (senhas.value.nova !== senhas.value.confirmar) {
    erro.value = 'As senhas não coincidem.'
    return
  }

  if (senhas.value.nova.length < 6) {
    erro.value = 'A nova senha deve ter pelo menos 6 caracteres.'
    return
  }

  try {
    const response = await api.put(`usuarios/${usuario.value.id}/senha`, {
      senhaAtual: senhas.value.atual,
      novaSenha: senhas.value.nova
    })

    if (response.status === 200) {
      sucesso.value = 'Senha alterada com sucesso!'
      alterandoSenha.value = false
      senhas.value = { atual: '', nova: '', confirmar: '' }
      
      setTimeout(() => {
        sucesso.value = ''
      }, 3000)
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      erro.value = 'Senha atual incorreta.'
    } else {
      erro.value = 'Erro ao alterar senha. Tente novamente.'
    }
  }
}

function removerFoto() {
  fotoPreview.value = ''
  arquivoFoto.value = null
  usuario.value.foto = null
}

</script>

<template>
  <div class="perfil-container">
    <div class="perfil-header">
      <h1>Meu Perfil</h1>
      <p class="perfil-subtitle">Gerencie suas informações pessoais</p>
    </div>

    <div v-if="carregando" class="loading">
      <div class="loading-spinner"></div>
      <p>Carregando perfil...</p>
    </div>

    <div v-else class="perfil-content">
      <div v-if="erro" class="alert erro">{{ erro }}</div>
      <div v-if="sucesso" class="alert sucesso">{{ sucesso }}</div>

      <!-- Seção da Foto -->
      <div class="foto-section">
        <div class="foto-container">
          <div class="foto-preview">
            <img 
              v-if="fotoPreview" 
              :src="fotoPreview" 
              alt="Foto do perfil" 
              class="foto-usuario"
            />
            <div v-else class="foto-placeholder">
              <svg width="60" height="60" fill="#ccc" viewBox="0 0 24 24">
                <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.418 0-8 2.015-8 4.5V21h16v-2.5c0-2.485-3.582-4.5-8-4.5Z"/>
              </svg>
            </div>
          </div>
          
          <div v-if="editando" class="foto-actions">
            <input 
              type="file" 
              id="foto-input" 
              @change="selecionarFoto"
              accept="image/*"
              class="hidden-input"
            />
            <label for="foto-input" class="btn-secondary">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2a5 5 0 0 1 5 5v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1V7a5 5 0 0 1 5-5zM8 9H6v10h12V9h-2v1a1 1 0 0 1-2 0V9h-4v1a1 1 0 0 1-2 0V9zm4-5a3 3 0 0 0-3 3v2h6V7a3 3 0 0 0-3-3z"/>
              </svg>
              Alterar Foto
            </label>
            <button v-if="fotoPreview" @click="removerFoto" class="btn-danger-small">
              Remover
            </button>
          </div>
        </div>
        
        <div class="foto-info">
          <h2>{{ usuario.name || 'Usuário' }}</h2>
          <p class="user-email">{{ usuario.email }}</p>
          <p v-if="usuario.bio" class="user-bio">{{ usuario.bio }}</p>
        </div>
      </div>

      <!-- Formulário de Perfil -->
      <div class="perfil-form">
        <div class="form-actions-header">
          <h3>Informações Pessoais</h3>
          <div v-if="!editando" class="actions">
            <button @click="iniciarEdicao" class="btn-primary">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
              </svg>
              Editar Perfil
            </button>
          </div>
        </div>

        <div class="form-grid">
          <div class="form-group">
            <label for="nome">Nome Completo</label>
            <input 
              id="nome"
              v-model="usuario.name"
              type="text"
              :disabled="!editando"
              :class="{ 'disabled': !editando }"
            />
          </div>

          <div class="form-group">
            <label for="email">E-mail</label>
            <input 
              id="email"
              v-model="usuario.email"
              type="email"
              :disabled="!editando"
              :class="{ 'disabled': !editando }"
            />
          </div>

          <div class="form-group">
            <label for="telefone">Telefone</label>
            <input 
              id="telefone"
              v-model="usuario.telefone"
              type="tel"
              :disabled="!editando"
              :class="{ 'disabled': !editando }"
              placeholder="(11) 99999-9999"
            />
          </div>

          <div class="form-group">
            <label for="dataNascimento">Data de Nascimento</label>
            <input 
              id="dataNascimento"
              v-model="usuario.dataNascimento"
              type="date"
              :disabled="!editando"
              :class="{ 'disabled': !editando }"
            />
          </div>

          <div class="form-group full-width">
            <label for="endereco">Endereço</label>
            <input 
              id="endereco"
              v-model="usuario.endereco"
              type="text"
              :disabled="!editando"
              :class="{ 'disabled': !editando }"
              placeholder="Cidade, Estado"
            />
          </div>

          <div class="form-group full-width">
            <label for="bio">Biografia</label>
            <textarea 
              id="bio"
              v-model="usuario.bio"
              :disabled="!editando"
              :class="{ 'disabled': !editando }"
              rows="3"
              placeholder="Conte um pouco sobre você..."
            ></textarea>
          </div>
        </div>

        <div v-if="editando" class="form-actions">
          <button @click="salvarPerfil" class="btn-primary">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            Salvar Alterações
          </button>
          <button @click="cancelarEdicao" class="btn-secondary">
            Cancelar
          </button>
        </div>
      </div>

      <!-- Seção de Alteração de Senha -->
      <div class="senha-section">
        <div class="form-actions-header">
          <h3>Segurança</h3>
          <div v-if="!alterandoSenha">
            <button @click="alterandoSenha = true" class="btn-secondary">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <rect width="14" height="10" x="5" y="11" stroke="currentColor" stroke-width="1.5" rx="2" fill="none"/>
                <path stroke="currentColor" stroke-width="1.5" d="M8 11V7a4 4 0 1 1 8 0v4" fill="none"/>
              </svg>
              Alterar Senha
            </button>
          </div>
        </div>

        <div v-if="alterandoSenha" class="senha-form">
          <div class="form-group">
            <label for="senhaAtual">Senha Atual</label>
            <input 
              id="senhaAtual"
              v-model="senhas.atual"
              type="password"
              placeholder="Digite sua senha atual"
            />
          </div>

          <div class="form-group">
            <label for="novaSenha">Nova Senha</label>
            <input 
              id="novaSenha"
              v-model="senhas.nova"
              type="password"
              placeholder="Digite a nova senha"
            />
          </div>

          <div class="form-group">
            <label for="confirmarSenha">Confirmar Nova Senha</label>
            <input 
              id="confirmarSenha"
              v-model="senhas.confirmar"
              type="password"
              placeholder="Confirme a nova senha"
            />
          </div>

          <div class="form-actions">
            <button @click="alterarSenha" class="btn-primary">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              Alterar Senha
            </button>
            <button @click="alterandoSenha = false; senhas = { atual: '', nova: '', confirmar: '' }" class="btn-secondary">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.perfil-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: #f8fafc;
  min-height: 100vh;
}

.perfil-header {
  text-align: center;
  margin-bottom: 2rem;
}

.perfil-header h1 {
  color: #2575fc;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.perfil-subtitle {
  color: #64748b;
  font-size: 1.1rem;
}

.loading {
  text-align: center;
  padding: 3rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #2575fc;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.perfil-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.alert {
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  font-weight: 500;
}

.alert.erro {
  background: #fee2e2;
  color: #dc2626;
  border: 1px solid #fca5a5;
}

.alert.sucesso {
  background: #dcfce7;
  color: #16a34a;
  border: 1px solid #86efac;
}

.foto-section {
  display: flex;
  align-items: center;
  gap: 2rem;
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.foto-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.foto-preview {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid #e2e8f0;
}

.foto-usuario {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.foto-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
}

.foto-actions {
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  align-items: center;
}

.foto-info h2 {
  color: #1e293b;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.user-email {
  color: #64748b;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.user-bio {
  color: #475569;
  font-style: italic;
  line-height: 1.5;
}

.perfil-form, .senha-section {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.form-actions-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e2e8f0;
}

.form-actions-header h3 {
  color: #1e293b;
  font-size: 1.5rem;
  font-weight: 600;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group.full-width {
  grid-column: span 2;
}

.form-group label {
  color: #374151;
  font-weight: 500;
  font-size: 0.95rem;
}

.form-group input,
.form-group textarea {
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s;
  background: white;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #2575fc;
  box-shadow: 0 0 0 3px rgba(37, 117, 252, 0.1);
}

.form-group input.disabled,
.form-group textarea.disabled {
  background: #f9fafb;
  color: #6b7280;
  cursor: not-allowed;
}

.senha-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.btn-primary, .btn-secondary, .btn-danger-small {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
}

.btn-primary {
  background: linear-gradient(90deg, #2575fc 0%, #6a11cb 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(37, 117, 252, 0.3);
}

.btn-secondary {
  background: #f8fafc;
  color: #475569;
  border: 2px solid #e2e8f0;
}

.btn-secondary:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
}

.btn-danger-small {
  background: #fee2e2;
  color: #dc2626;
  border: 1px solid #fca5a5;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.btn-danger-small:hover {
  background: #fecaca;
}

.hidden-input {
  display: none;
}

@media (max-width: 768px) {
  .perfil-container {
    padding: 1rem;
  }
  
  .perfil-header h1 {
    font-size: 2rem;
  }
  
  .foto-section {
    flex-direction: column;
    text-align: center;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .form-group.full-width {
    grid-column: span 1;
  }
  
  .form-actions-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .form-actions {
    flex-direction: column;
  }
}
</style>