<script setup>
import { ref, defineEmits } from 'vue'
import api from "../../services/api";

const emit = defineEmits(['cadastro']);

const name = ref('')
const email = ref('')
const password = ref('')
const confirmarSenha = ref('')
const erro = ref('')
const sucesso = ref('')

async function cadastrar() {
  erro.value = ''
  sucesso.value = ''

  if (!name.value || !email.value || !password.value || !confirmarSenha.value) {
    erro.value = 'Preencha todos os campos.'
    return
  }

  if (password.value !== confirmarSenha.value) {
    erro.value = 'As senhas não coincidem.'
    return
  }

  try {
    const response = await api.post('usuarios/', {
      name: name.value,
      email: email.value,
      password: password.value
    });

    if (response.status === 201 || response.status === 200) {
      sucesso.value = 'Usuário cadastrado com sucesso!'
      name.value = ''
      email.value = ''
      password.value = ''
      confirmarSenha.value = ''
      setTimeout(() => {
        emit('cadastro-sucesso')
      }, 350)
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      erro.value = 'Dados inválidos ou usuário já existe.'
    } else {
      erro.value = 'Erro ao cadastrar usuário. Tente novamente.'
    }
  }
}

</script>

<template>

  <form class="cadastro-form" @submit.prevent="cadastrar">
    <div class="cadastro-header">
      <img src="/src/assets/img/logo.png" alt="Logo" class="cadastro-logo" />
      <h2>Crie sua conta</h2>
      <p class="cadastro-subtitle">Junte-se a nós! Preencha os dados abaixo para começar.</p>
    </div>
    <div v-if="erro" class="alert erro">{{ erro }}</div>
    <div v-if="sucesso" class="alert sucesso">{{ sucesso }}</div>
    <div class="form-group floating-label">
      <span class="input-icon">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <path stroke="#2575fc" stroke-width="1.5"
            d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.418 0-8 2.015-8 4.5V21h16v-2.5c0-2.485-3.582-4.5-8-4.5Z" />
        </svg>
      </span>
      <input id="nome" v-model="name" type="text" required placeholder=" " />
      <label for="nome">Nome</label>
    </div>
    <div class="form-group floating-label">
      <span class="input-icon">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <path stroke="#2575fc" stroke-width="1.5"
            d="M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5v11A2.5 2.5 0 0 1 19.5 20h-15A2.5 2.5 0 0 1 2 17.5v-11Zm1.6.6 7.4 6.2a2 2 0 0 0 2.6 0l7.4-6.2" />
        </svg>
      </span>
      <input id="email" v-model="email" type="email" required placeholder=" " />
      <label for="email">E-mail</label>
    </div>
    <div class="form-group floating-label">
      <span class="input-icon">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <rect width="14" height="10" x="5" y="11" stroke="#2575fc" stroke-width="1.5" rx="2" />
          <path stroke="#2575fc" stroke-width="1.5" d="M8 11V7a4 4 0 1 1 8 0v4" />
        </svg>
      </span>
      <input id="senha" v-model="password" type="password" required placeholder=" " />
      <label for="senha">Senha</label>
    </div>
    <div class="form-group floating-label">
      <span class="input-icon">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <rect width="14" height="10" x="5" y="11" stroke="#2575fc" stroke-width="1.5" rx="2" />
          <path stroke="#2575fc" stroke-width="1.5" d="M8 11V7a4 4 0 1 1 8 0v4" />
        </svg>
      </span>
      <input id="confirmarSenha" v-model="confirmarSenha" type="password" required placeholder=" " />
      <label for="confirmarSenha">Confirmar Senha</label>
    </div>
    <div class="divider"><span>ou</span></div>
    <button type="submit">Cadastrar</button>
    <div class="link-login">
      <span>Já tem uma conta?</span>
      <a @click="emit('cadastro')">Entrar</a>
    </div>
  </form>

</template>

<style scoped>
.cadastro-form {
  border-top-left-radius: 1.2rem;
  border-bottom-left-radius: 20px;
  background: #fff;
  padding: 2.5rem 2rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
  width: 150%;
  max-width: 600px;
  min-height: 100vh;
  max-height: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  align-items: center;
}

.cadastro-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  margin-bottom: 1rem;
}

.cadastro-logo {
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-bottom: 0.2rem;
}

.cadastro-subtitle {
  color: #888;
  font-size: 1rem;
  margin-top: -0.3rem;
  margin-bottom: 0.5rem;
}

.cadastro-form h2 {
  text-align: center;
  color: #2575fc;
  margin-bottom: 0.2rem;
  font-weight: 700;
}

.form-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.7rem;
  width: 100%;
  max-width: 320px;
  margin: 0 auto 0.7rem auto;
  position: relative;
  background: #f4f8fb;
  border-radius: 0.7rem;
  box-shadow: 0 2px 8px 0 rgba(31, 38, 135, 0.07);
  border: 1.5px solid #e3e8ee;
  transition: border 0.2s, box-shadow 0.2s;
}

.form-group:focus-within {
  border: 1.5px solid #2575fc;
  box-shadow: 0 0 0 3px #2575fc22, 0 2px 8px 0 rgba(31, 38, 135, 0.09);
}

.input-icon {
  display: flex;
  align-items: center;
  margin-left: 0.8rem;
  color: #2575fc;
}

.floating-label input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 1.1rem 0.7rem 1.1rem 0.2rem;
  font-size: 1rem;
  color: #222;
  outline: none;
  box-shadow: none;
  transition: background 0.2s;
  z-index: 1;
}

.floating-label label {
  position: absolute;
  left: 2.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: #b0b8c1;
  font-size: 1rem;
  pointer-events: none;
  background: transparent;
  transition: 0.2s cubic-bezier(.4, 0, .2, 1);
  z-index: 2;
}

.floating-label input:focus+label,
.floating-label input:not(:placeholder-shown)+label {
  top: 0.3rem;
  left: 2.3rem;
  font-size: 0.82rem;
  color: #2575fc;
  background: #fff;
  padding: 0 0.2rem;
  border-radius: 0.3rem;
}

.floating-label input::placeholder {
  color: transparent;
  opacity: 0;
}

button[type="submit"] {
  background: linear-gradient(90deg, #2575fc 0%, #6a11cb 100%);
  color: #fff;
  font-weight: 600;
  padding: 0.6rem 1.6rem;
  border: none;
  border-radius: 0.6rem;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 4px 16px 0 rgba(38, 50, 56, 0.10);
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  letter-spacing: 0.03em;
  margin-top: 0.7rem;
  margin-bottom: 0.2rem;
  min-width: 120px;
  width: auto;
}

button[type="submit"]:hover {
  background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 8px 24px 0 rgba(38, 50, 56, 0.16);
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 0.5rem 0 0.5rem 0;
  width: 100%;
}

.divider span {
  background: #fff;
  padding: 0 1rem;
  color: #bbb;
  font-size: 0.95rem;
  position: relative;
  z-index: 1;
}

.divider:before,
.divider:after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #eee;
  margin: 0 0.5rem;
}

.link-login {
  text-align: center;
  margin-top: 0.5rem;
  font-size: 0.98rem;
  width: 100%;
}

.link-login a {
  color: #2575fc;
  text-decoration: none;
  font-weight: 600;
  margin-left: 0.3rem;
  transition: color 0.2s;
}

.link-login a:hover {
  color: #6a11cb;
}

.alert {
  padding: 0.7rem;
  border-radius: 0.5rem;
  text-align: center;
  font-size: 0.98rem;
  width: 100%;
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
</style>
