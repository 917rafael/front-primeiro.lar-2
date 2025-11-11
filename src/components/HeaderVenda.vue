<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <header class="header-venda">
    <div class="header-venda-container">
      <div class="header-venda-left">
        <img src="../assets/img/logo.png" alt="Logo" class="header-venda-logo" @click="$router.push('/')" style="cursor:pointer;" />
        <span class="header-venda-title">Primeiro Lar</span>
      </div>
      <nav class="header-venda-nav">
        <a href="/vendas" class="nav-item active">
          <span class="nav-icon">
            <!-- Home/Imóveis SVG -->
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M3 10.5L12 4l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10.5z" stroke="#e30613" stroke-width="2"/></svg>
          </span>
          Imóveis
        </a>
        <a href="/anuncie" class="nav-item">
          <span class="nav-icon">
            <!-- Anuncie SVG -->
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" stroke="#222" stroke-width="2"/></svg>
          </span>
          Anuncie
        </a>
      </nav>
      <div class="header-venda-right">
        <button @click="router.push('/favoritos')" class="header-btn fav-btn" aria-label="Favoritos">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5A5.5 5.5 0 0 1 7.5 3c1.74 0 3.41 0.81 4.5 2.09A6.5 6.5 0 0 1 16.5 3 5.5 5.5 0 0 1 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="#e30613" stroke-width="2" fill="none"/></svg>
          Favoritos
        </button>
        <button @click="router.push('/LoginCadastro')" class="header-btn login-btn">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="#222" stroke-width="2"/><path d="M4 20v-1a8 8 0 0 1 16 0v1" stroke="#222" stroke-width="2"/></svg>
          Entrar
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header-venda {
  width: 100%;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  border-bottom: 1px solid #ececec;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1002;
  border-color: #222;
}
.header-venda-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 2rem;
  gap: 1.2rem;
}
.fav-btn:hover svg path {
  stroke: #fff !important;
  fill: #fff !important;
}

.header-venda-spacer {
  width: 100%;
  height: 70px; /* altura do header, ajuste conforme necessário */
  display: block;
}
.header-venda-left {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}
.header-venda-logo {
  width: 38px;
  height: 38px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
}
.header-venda-title {
  font-size: 1.45rem;
  font-weight: 800;
  color: #222;
  letter-spacing: 0.5px;
}
.header-venda-nav {
  display: flex;
  align-items: center;
  gap: 2.2rem;
  flex: 1;
  justify-content: center;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.08rem;
  color: #222;
  font-weight: 600;
  text-decoration: none;
  padding: 0.3rem 0.7rem;
  border-radius: 6px;
  transition: background 0.2s, color 0.2s;
}
.nav-item.active, .nav-item:hover {
  background: #f7f7f7;
}
.nav-item.active:hover {
  background: #b8000f;
  color: #fff;
  box-shadow: 0 4px 16px rgba(227,6,19,0.18);
}
.nav-item:hover {
  background: #e30613;
  color: #fff;
  box-shadow: 0 4px 16px rgba(227,6,19,0.13);
}
.header-venda-nav {
  gap: 1.2rem;
  margin-top: 0.5rem;
}
.header-venda-right {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-left: auto;
}

.header-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.08rem;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1.2rem;
  cursor: pointer;
  background: #f7f7f7;
  color: #222;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  transition: background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.2s;
}
.header-btn:hover {
  background: #e30613;
  color: #fff;
  box-shadow: 0 4px 16px rgba(227,6,19,0.13);
  transform: translateY(-2px);
}
.header-btn:hover svg {
  stroke: #fff !important;
  fill: #fff !important;
}

.fav-btn {
  background: linear-gradient(90deg, #fff 60%, #ffe5e9 100%);
  color: #e30613;
  border: 1.5px solid #e30613;
  box-shadow: 0 2px 8px rgba(227,6,19,0.07);
}
.fav-btn:hover {
  background: #e30613;
  color: #fff;
  box-shadow: 0 4px 16px rgba(227,6,19,0.13);
}
.fav-btn:hover svg {
  stroke: #fff !important;
  fill: #fff !important;
}.header-venda

.login-btn {
  background: linear-gradient(90deg, #fff 60%, #e3e3e3 100%);
  color: #222;
  border: 1.5px solid #222;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
}
.login-btn:hover {
  background: #222;
  color: #fff;
  box-shadow: 0 4px 16px rgba(0,0,0,0.13);
}
.login-btn:hover svg {
  stroke: #fff !important;
  fill: #fff !important;
}
@media (max-width: 600px) {
  .header-venda-title {
    font-size: 1.1rem;
  }
  .header-venda-logo {
    width: 28px;
    height: 28px;
  }
  .header-btn {
    font-size: 0.95rem;
    padding: 0.3rem 0.7rem;
  }
}
</style>
