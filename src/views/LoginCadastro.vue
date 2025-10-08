<script setup>
import { ref } from 'vue'
import LoginDoCliente from '../components/LoginECadastro/LoginDoCliente.vue'
import CadastroUsuario from '../components/LoginECadastro/CadastroUsuario.vue'

const cadastroAtivo = ref(true)
const animando = ref(false)

function handleCadastroSucesso() {
  animando.value = true
  setTimeout(() => {
    cadastroAtivo.value = false
    animando.value = false
  }, 700)
}
</script>
<template>
    <div class="login-cadastro-page">
     
        <transition name="slide-cadastro">
     
            <div v-if="cadastroAtivo" class="cadastro-side">
          <CadastroUsuario @cadastro-sucesso="handleCadastroSucesso" />
          <div class="img-area">
              <img src="/src/assets/img/image.png" alt="Imagem ilustrativa" class="img" />
          </div>
        </div>
    
    </transition>


      <transition name="slide-login">
        <div v-if="!cadastroAtivo" class="login-side">
            
            <div class="img-area-2">
                <img src="/src/assets/img/image.png" alt="Imagem ilustrativa" class="img" />
            </div>

            <LoginDoCliente />
        </div>
      </transition> 
    </div>
</template>

<style scoped>
.img-area{
    display: flex;
    align-items: stretch;
    justify-content: center;
    height: 100%;
    width: 100%;
    padding: 0 2rem 0 0;
    flex: 1 1 0%;
}
    
.img {
  max-width: 100%;
  max-height: 100%;
  box-shadow: 0 4px 24px 0 rgba(31,38,135,0.10);
  object-fit: cover;
}

.login-cadastro-page {
  position: relative;
  display: flex;
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.cadastro-side,
.login-side {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50vw;
  min-width: 320px;
  height: 100vh;
  display: flex;
  align-items: center;
}

.cadastro-side {
  left: 0;
  justify-content: center;
  align-items: center;
  background: none;
  z-index: 2;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  box-shadow: none;
  overflow: hidden;
}

.login-side {
  right: 0;
  justify-content: flex-end;
  background: #fff;
  z-index: 1;
}

.fade-in {
  animation: fadeIn 0.7s forwards;
}

.fade-out {
  animation: fadeOut 0.7s forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

@media (max-width: 900px) {
  .login-cadastro-page {
    flex-direction: column;
  }
  .cadastro-side, .login-side {
    justify-content: center;
    min-height: 50vh;
  }
}

.cadastro-imagem-area {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  height: 100vh;
  width: 100vw;
  padding: 0;
  flex: 1 1 0%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  pointer-events: none;
}

.cadastro-imagem-area img {
  width: 60vw;
  height: 100vh;
  object-fit: cover;
  border-radius: 0 1.2rem 1.2rem 0;
  box-shadow: 0 4px 24px 0 rgba(31,38,135,0.10);
  filter: brightness(0.7) blur(0.5px);
  transition: width 0.4s, filter 0.4s;
}

.cadastro-side > *:not(.cadastro-imagem-area) {
  position: relative;
  z-index: 2;
}

@media (max-width: 900px) {
  .cadastro-imagem-area img {
    width: 100vw;
    border-radius: 0;
  }
}

/* Nova animação para a transição de slide */
.slide-cadastro-enter-active,
.slide-cadastro-leave-active {
  transition: transform 0.7s cubic-bezier(.77,0,.18,1), opacity 0.7s, filter 0.7s;
  will-change: transform, opacity, filter;
}
.slide-cadastro-enter-from {
  transform: translateX(-100%) scale(0.98) skewY(-2deg);
  opacity: 0;
  filter: blur(8px) brightness(1.2);
}
.slide-cadastro-enter-to {
  transform: translateX(0) scale(1) skewY(0);
  opacity: 1;
  filter: blur(0) brightness(1);
}
.slide-cadastro-leave-from {
  transform: translateX(0) scale(1) skewY(0);
  opacity: 1;
  filter: blur(0) brightness(1);
}
.slide-cadastro-leave-to {
  transform: translateX(100%) scale(0.96) skewY(3deg);
  opacity: 0;
  filter: blur(12px) brightness(1.2);
}

/* Animação para a transição de login */
.slide-login-enter-active,
.slide-login-leave-active {
  transition: transform 0.7s cubic-bezier(.77,0,.18,1), opacity 0.7s, filter 0.7s;
  will-change: transform, opacity, filter;
}
.slide-login-enter-from {
  transform: translateX(-100%) scale(0.96) skewY(-3deg);
  opacity: 0;
  filter: blur(12px) brightness(1.2);
}
.slide-login-enter-to {
  transform: translateX(0) scale(1) skewY(0);
  opacity: 1;
  filter: blur(0) brightness(1);
}
.slide-login-leave-from {
  transform: translateX(0) scale(1) skewY(0);
  opacity: 1;
  filter: blur(0) brightness(1);
}
.slide-login-leave-to {
  transform: translateX(-100%) scale(0.98) skewY(-2deg);
  opacity: 0;
  filter: blur(8px) brightness(1.2);
}

</style>