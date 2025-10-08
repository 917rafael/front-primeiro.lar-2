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

    <form class="login-form" @submit.prevent="login">
      <div class="login-header">
        <img src="/src/assets/img/image.png" alt="Logo" class="login-logo" />
        <h2>Bem-vindo de volta!</h2>
        <p class="login-subtitle">Acesse sua conta para continuar</p>
      </div>
      <div v-if="erro" class="alert erro">{{ erro }}</div>
      <div v-if="sucesso" class="alert sucesso">{{ sucesso }}</div>
      <div class="form-group floating-label">
        <span class="input-icon">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="#ff5e62" stroke-width="1.5" d="M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5v11A2.5 2.5 0 0 1 19.5 20h-15A2.5 2.5 0 0 1 2 17.5v-11Zm1.6.6 7.4 6.2a2 2 0 0 0 2.6 0l7.4-6.2"/></svg>
        </span>
        <input id="email" v-model="email" type="email" required placeholder=" " />
        <label for="email">E-mail</label>
      </div>
      <div class="form-group floating-label">
        <span class="input-icon">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect width="14" height="10" x="5" y="11" stroke="#ff5e62" stroke-width="1.5" rx="2"/><path stroke="#ff5e62" stroke-width="1.5" d="M8 11V7a4 4 0 1 1 8 0v4"/></svg>
        </span>
        <input id="senha" v-model="senha" type="password" required placeholder=" " />
        <label for="senha">Senha</label>
      </div>
      <div class="login-options">
        <label class="remember-me">
          <input type="checkbox" /> Lembrar de mim
        </label>
        <a href="#" class="forgot-password">Esqueceu a senha?</a>
      </div>
      <button type="submit" class="login-btn-pro">Entrar</button>
      <div class="divider"><span>ou</span></div>
      <button type="button" class="google-login-pro">
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" class="google-icon" />
        Entrar com Google
      </button>
      <div class="link-cadastro">
        <span>Não tem uma conta?</span>
        <a href="/cadastro">Cadastre-se</a>
      </div>
    </form>

</template>

<style scoped>



.login-form {
  border-top-left-radius: 1.2rem;
  border-bottom-left-radius: 20px;
  background: #fff;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  max-width: 600px;
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
  flex-direction: row;
  align-items: center;
  gap: 0.7rem;
  width: 100%;
  max-width: 320px;
  margin: 0 auto 0.7rem auto;
  position: relative;
  background: #f4f8fb;
  border-radius: 0.7rem;
  box-shadow: 0 2px 8px 0 rgba(255, 94, 98, 0.07);
  border: 1.5px solid #f8d3d3;
  transition: border 0.2s, box-shadow 0.2s;
}

.form-group:focus-within {
  border: 1.5px solid #ff5e62;
  box-shadow: 0 0 0 3px #ff5e6233, 0 2px 8px 0 rgba(255, 94, 98, 0.09);
}

.input-icon {
  display: flex;
  align-items: center;
  margin-left: 0.8rem;
  color: #ff5e62;
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
  transition: 0.2s cubic-bezier(.4,0,.2,1);
  z-index: 2;
}

.floating-label input:focus + label,
.floating-label input:not(:placeholder-shown) + label {
  top: 0.3rem;
  left: 2.3rem;
  font-size: 0.82rem;
  color: #ff5e62;
  background: #fff;
  padding: 0 0.2rem;
  border-radius: 0.3rem;
}

.floating-label input::placeholder {
  color: transparent;
  opacity: 0;
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

/* Botão de login mais bonito */
.login-btn-pro {
  background: linear-gradient(90deg, #ff9966 0%, #ff5e62 100%);
  color: #fff;
  font-weight: 700;
  padding: 0.65rem 1.7rem;
  border: none;
  border-radius: 0.7rem 1.5rem 0.7rem 1.5rem;
  font-size: 1.08rem;
  cursor: pointer;
  box-shadow: 0 4px 16px 0 rgba(255, 94, 98, 0.10);
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  letter-spacing: 0.04em;
  margin-top: 0.7rem;
  margin-bottom: 0.2rem;
  min-width: 120px;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-btn-pro:hover {
  background: linear-gradient(90deg, #ff5e62 0%, #ff9966 100%);
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 8px 24px 0 rgba(255, 94, 98, 0.16);
}

/* Botão Google mais bonito */
.google-login-pro {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  background: #fff;
  color: #444;
  border: 1.5px solid #eee;
  border-radius: 2rem;
  font-weight: 700;
  font-size: 1.08rem;
  padding: 0.65rem 1.7rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  box-shadow: 0 2px 12px 0 rgba(66, 133, 244, 0.08);
  transition: background 0.2s, border 0.2s, box-shadow 0.2s, transform 0.15s;
}

.google-login-pro:hover {
  background: #f5faff;
  border: 1.5px solid #b3d0fa;
  box-shadow: 0 6px 18px 0 rgba(66, 133, 244, 0.13);
  transform: translateY(-2px) scale(1.03);
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


</style>