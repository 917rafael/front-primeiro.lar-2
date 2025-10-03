<script setup>
import { ref } from 'vue'

const nome = ref('')
const email = ref('')
const senha = ref('')
const confirmarSenha = ref('')
const erro = ref('')
const sucesso = ref('')

function cadastrar() {
  erro.value = ''
  sucesso.value = ''
  if (!nome.value || !email.value || !senha.value || !confirmarSenha.value) {
    erro.value = 'Preencha todos os campos.'
    return
  }
  if (senha.value !== confirmarSenha.value) {
    erro.value = 'As senhas não coincidem.'
    return
  }
  // Simulação de cadastro
  sucesso.value = 'Usuário cadastrado com sucesso!'
  nome.value = ''
  email.value = ''
  senha.value = ''
  confirmarSenha.value = ''
}
</script>

<template>
  <div class="cadastro-container">
    <form class="cadastro-form" @submit.prevent="cadastrar">
      <h2>Cadastro de Usuário</h2>
      <div v-if="erro" class="alert erro">{{ erro }}</div>
      <div v-if="sucesso" class="alert sucesso">{{ sucesso }}</div>
      <div class="form-group">
        <label for="nome">Nome</label>
        <input id="nome" v-model="nome" type="text" placeholder="Digite seu nome" required />
      </div>
      <div class="form-group">
        <label for="email">E-mail</label>
        <input id="email" v-model="email" type="email" placeholder="Digite seu e-mail" required />
      </div>
      <div class="form-group">
        <label for="senha">Senha</label>
        <input id="senha" v-model="senha" type="password" placeholder="Digite sua senha" required />
      </div>
      <div class="form-group">
        <label for="confirmarSenha">Confirmar Senha</label>
        <input id="confirmarSenha" v-model="confirmarSenha" type="password" placeholder="Confirme sua senha" required />
      </div>
      <button type="submit">Cadastrar</button>
    </form>
  </div>
</template>

<style scoped>
.cadastro-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(120deg, #6a11cb 0%, #2575fc 100%);
  padding: 2rem;
}

.cadastro-form {
  background: #fff;
  padding: 2.5rem 2rem;
  border-radius: 1.2rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.cadastro-form h2 {
  text-align: center;
  color: #2575fc;
  margin-bottom: 1rem;
  font-weight: 700;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.form-group label {
  font-weight: 500;
  color: #333;
}

.form-group input {
  padding: 0.7rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border 0.2s;
}

.form-group input:focus {
  border: 1.5px solid #2575fc;
  outline: none;
}

button[type="submit"] {
  background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);
  color: #fff;
  font-weight: 600;
  padding: 0.9rem;
  border: none;
  border-radius: 0.7rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
}

button[type="submit"]:hover {
  background: linear-gradient(90deg, #2575fc 0%, #6a11cb 100%);
}

.alert {
  padding: 0.7rem;
  border-radius: 0.5rem;
  text-align: center;
  font-size: 0.98rem;
}

.alert.erro {
  background: #ffe0e0;
  color: #d90429;
  border: 1px solid #d90429;
}

.alert.sucesso {
  background: #e0ffe6;
  color: #1b8a3d;
  border: 1px solid #1b8a3d;
}

@media (max-width: 500px) {
  .cadastro-form {
    padding: 1.2rem 0.5rem;
    max-width: 95vw;
  }
}
</style>