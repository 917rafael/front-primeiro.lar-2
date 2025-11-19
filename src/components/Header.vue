<script setup>

import { ref, defineProps } from 'vue';
const menuOpen = ref(false);
function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}
const props = defineProps({ scrolled: Boolean });

// Simulação de autenticação e foto do usuário
const usuarioLogado = ref(true); // Troque para false para testar sem login
const fotoUsuario = ref('https://randomuser.me/api/portraits/men/32.jpg'); // URL da foto do usuário

</script>


<template>
  <header :class="['header-transparente', { 'header-preto': scrolled }]">
    <div class="header-content">
      <div class="logo">
        <!-- <img src="/src/assets/logo.svg" alt="Logo" /> -->
        <span>MeuSite</span>
      </div>
      <button class="menu-toggle" @click="toggleMenu" aria-label="Abrir menu">
        <span :class="{ 'open': menuOpen }"></span>
        <span :class="{ 'open': menuOpen }"></span>
        <span :class="{ 'open': menuOpen }"></span>
      </button>
      <nav :class="['nav-menu', { 'open': menuOpen }]">
        <a href="#" class="nav-link">Início</a>
        <a href="#" class="nav-link">Sobre</a>
        <a href="#" class="nav-link">Serviços</a>
        <a href="#" class="nav-link">Contato</a>
        <div v-if="usuarioLogado" class="usuario-header">
          <img :src="fotoUsuario" alt="Foto do usuário" class="usuario-foto" />
        </div>
        <button v-else class="nav-link entrar-btn">Entrar</button>
      </nav>
    </div>
  </header>
</template>

<style scoped>
/* Foto do usuário no header */
.usuario-header {
  display: flex;
  align-items: center;
  margin-left: 1rem;
}
.usuario-foto {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #0077ff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.entrar-btn {
  background: #0077ff;
  color: #fff;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.entrar-btn:hover {
  background: #005bb5;
}
.header-transparente {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(16px);
  border-bottom: 1.5px solid #e0e0e0;
  z-index: 100;
  transition: background 0.3s;
  box-shadow: 0 2px 16px rgba(0,0,0,0.04);
}
.header-preto {
  background: #111 !important;
  backdrop-filter: none !important;
  border-bottom: 1.5px solid #222 !important;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 2rem;
  position: relative;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-weight: bold;
  font-size: 1.5rem;
  color: #222;
  letter-spacing: 1px;
  text-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 38px;
  height: 38px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 200;
}
.menu-toggle span {
  display: block;
  height: 4px;
  width: 100%;
  background: #222;
  border-radius: 2px;
  transition: 0.3s;
}
.menu-toggle span.open:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}
.menu-toggle span.open:nth-child(2) {
  opacity: 0;
}
.menu-toggle span.open:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

.nav-menu {
  display: flex;
  gap: 2.2rem;
  align-items: center;
  transition: right 0.3s, opacity 0.3s;
}

.nav-link {
  color: #ffffff;
  text-decoration: none;
  font-size: 1.08rem;
  font-weight: 500;
  position: relative;
  transition: color 0.2s;
  padding: 0.3rem 0.7rem;
  border-radius: 6px;
}
.nav-link::after {
  content: '';
  display: block;
  width: 0;
  height: 2px;
  background: #0077ff;
  transition: width 0.3s;
  position: absolute;
  left: 0;
  bottom: -4px;
  border-radius: 2px;
}
.nav-link:hover {
  color: #0077ff;
  background: rgba(0,119,255,0.07);
}
.nav-link:hover::after {
  width: 100%;
}

@media (max-width: 900px) {
  .header-content {
    padding: 0.7rem 1rem;
  }
  .logo {
    font-size: 1.1rem;
  }
}

@media (max-width: 700px) {
  .menu-toggle {
    display: flex;
  }
  .nav-menu {
    position: absolute;
    top: 60px;
    right: -100vw;
    flex-direction: column;
    background: rgba(255,255,255,0.97);
    width: 80vw;
    max-width: 320px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.10);
    border-radius: 12px;
    padding: 1.5rem 1.2rem;
    gap: 1.2rem;
    opacity: 0;
    pointer-events: none;
    z-index: 150;
    transition: right 0.3s, opacity 0.3s;
  }
  .nav-menu.open {
    right: 0;
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
