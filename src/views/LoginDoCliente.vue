<script setup>
import { ref } from 'vue'

const email = ref('')
const senha = ref('')
const erro = ref('')
const sucesso = ref('')

function login() {
  erro.value = ''
  sucesso.value = ''
  if (!email.value || !senha.value) {
    erro.value = 'Preencha todos os campos.'
    return
  }
  // Simulação de login
  if (email.value === 'cliente@email.com' && senha.value === '123456') {
    sucesso.value = 'Login realizado com sucesso!'
    email.value = ''
    senha.value = ''
  } else {
    erro.value = 'E-mail ou senha inválidos.'
  }
}
</script>

<template>
  <div class="login-container right-align">
    <form class="login-form" @submit.prevent="login">
      <div class="login-header">
        <img src="/src/assets/img/image.png" alt="Logo" class="login-logo" />
        <h2>Bem-vindo de volta!</h2>
        <p class="login-subtitle">Acesse sua conta para continuar</p>
      </div>
      <div v-if="erro" class="alert erro">{{ erro }}</div>
      <div v-if="sucesso" class="alert sucesso">{{ sucesso }}</div>
      <div class="form-group">
        <label for="email">E-mail</label>
        <input id="email" v-model="email" type="email" placeholder="Digite seu e-mail" required />
      </div>
      <div class="form-group">
        <label for="senha">Senha</label>
        <input id="senha" v-model="senha" type="password" placeholder="Digite sua senha" required />
      </div>
      <div class="login-options">
        <label class="remember-me">
          <input type="checkbox" /> Lembrar de mim
        </label>
        <a href="#" class="forgot-password">Esqueceu a senha?</a>
      </div>
      <button type="submit">Entrar</button>
      <div class="divider"><span>ou</span></div>
      <button type="button" class="google-login">
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" class="google-icon" />
        Entrar com Google
      </button>
      <div class="link-cadastro">
        <span>Não tem uma conta?</span>
        <a href="/cadastro">Cadastre-se</a>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* Dimensões e alinhamento da div login-container */
.login-container {
  min-height: 100vh; /* Faz a div ocupar 100% da altura da tela */
  max-height: 100vh; /* Garante que não passe de 100% da altura */
  height: 100vh;     /* Garante 100% para cima e para baixo */
  display: flex;
  align-items: center;
  width: 100%; /* Faz a div ocupar 100% da largura da tela */
  /*
    Para ajustar a espessura (largura) da div de login, altere a propriedade 'width' ou adicione 'max-width' aqui.
    Exemplo: width: 400px; ou max-width: 500px;
  */
}

.right-align {
  justify-content: flex-end;
}

.login-form {
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  max-width: 700px;
  min-height: 100vh;
  max-height: 100vh; 
  height: 100vh;     
  align-items: center;
  width: 150%;
}

.login-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  margin-bottom: 1rem;
}

.login-logo {
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-bottom: 0.2rem;
}

.login-subtitle {
  color: #888;
  font-size: 1rem;
  margin-top: -0.3rem;
  margin-bottom: 0.5rem;
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
  border: 1.5px solid #ff5e62;
  outline: none;
}

button[type="submit"] {
  background: linear-gradient(90deg, #ff9966 0%, #ff5e62 100%);
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
  background: linear-gradient(90deg, #ff5e62 0%, #ff9966 100%);
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

.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.97rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #555;
}

.forgot-password {
  color: #ff5e62;
  text-decoration: none;
  font-size: 0.97rem;
  transition: color 0.2s;
}

.forgot-password:hover {
  color: #ff9966;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1rem 0 0.5rem 0;
}

.divider span {
  background: #fff;
  padding: 0 1rem;
  color: #bbb;
  font-size: 0.95rem;
  position: relative;
  z-index: 1;
}

.divider:before, .divider:after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #eee;
  margin: 0 0.5rem;
}

.google-login {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  background: #fff;
  color: #444;
  border: 1px solid #eee;
  border-radius: 0.7rem;
  font-weight: 600;
  font-size: 1.05rem;
  padding: 0.7rem 0;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: background 0.2s, border 0.2s;
}

.google-login:hover {
  background: #f5f5f5;
  border: 1px solid #ccc;
}

.google-icon {
  width: 22px;
  height: 22px;
}

.link-cadastro {
  text-align: center;
  margin-top: 0.5rem;
  font-size: 0.98rem;
}

.link-cadastro a {
  color: #ff5e62;
  text-decoration: none;
  font-weight: 600;
  margin-left: 0.3rem;
  transition: color 0.2s;
}

.link-cadastro a:hover {
  color: #ff9966;
}

@media (max-width: 500px) {
  .login-container {
    justify-content: center;
  }
  .login-form {
    padding: 1.2rem 0.5rem;
    max-width: 95vw;
  }
}
</style>