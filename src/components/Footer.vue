<template>
  <footer class="footer">
    <section class="payment-methods">
      <h3>FORMAS DE PAGAMENTOS</h3>
      <div class="payment-groups">
        <div class="group">
          <h4>Cartões do Grupo</h4>
          <div class="icons">
            <img src="@/assets/cards/casas-bahia.jpg" alt="Casas Bahia" title="Casas Bahia" />
            <img src="@/assets/cards/pontofrio.svg" alt="Pontofrio" title="Pontofrio" />
            <img src="@/assets/cards/extra.svg" alt="Extra" title="Extra" />
          </div>
        </div>
        <div class="group">
          <h4>Outras formas</h4>
          <div class="icons">
            <img src="@/assets/cards/banqi.svg" alt="BanQi" title="BanQi" />
            <img src="@/assets/cards/pix.svg" alt="Pix" title="Pix" />
          </div>
        </div>
        <div class="group">
          <h4>Crédito</h4>
          <div class="icons">
            <img src="@/assets/cards/visa.svg" alt="Visa" title="Visa" />
            <img src="@/assets/cards/mastercard.svg" alt="Mastercard" title="Mastercard" />
            <img src="@/assets/cards/elo.svg" alt="Elo" title="Elo" />
            <img src="@/assets/cards/amex.svg" alt="American Express" title="American Express" />
            <img src="@/assets/cards/diners.svg" alt="Diners Club" title="Diners Club" />
            <img src="@/assets/cards/hipercard.svg" alt="Hipercard" title="Hipercard" />
            <img src="@/assets/cards/banescard.svg" alt="Banescard" title="Banescard" />
            <img src="@/assets/cards/jcb.svg" alt="JCB" title="JCB" />
          </div>
        </div>
      </div>
    </section>

    <section class="social-and-app">
      <div class="social-media">
        <h3>ACOMPANHE NAS REDES SOCIAIS</h3>
        <div class="social-icons">
          <img src="@/assets/social/facebook.svg" alt="Facebook" title="Facebook" />
          <img src="@/assets/social/twitter.svg" alt="Twitter" title="Twitter" />
          <img src="@/assets/social/instagram.svg" alt="Instagram" title="Instagram" />
          <img src="@/assets/social/youtube.svg" alt="YouTube" title="YouTube" />
        </div>
      </div>

      <div class="app-download">
        <h3>BAIXE O APP DAS CASAS BAHIA</h3>
        <div class="app-buttons">
          <img src="@/assets/apps/google-play.svg" alt="Google Play" title="Google Play" />
          <img src="@/assets/apps/app-store.svg" alt="App Store" title="App Store" />
        </div>
      </div>

      <div class="trust-badges">
        <img src="@/assets/trust/confio.svg" alt="Confio Loja Confiável" title="Confio Loja Confiável" />
        <img src="@/assets/trust/consumidor-govbr.svg" alt="Consumidor Gov.br" title="Consumidor Gov.br" />
      </div>
    </section>
  </footer>
</template>

<script setup>
// Footer with payment methods, social media, app download, and trust badges
</script>

<style scoped>
.footer {
  background-color: #f7f7f7;
  padding: 2rem;
  font-family: Arial, sans-serif;
  color: #333;
}

.payment-methods h3,
.social-and-app h3 {
  color: #b35400;
  font-weight: bold;
  margin-bottom: 1rem;
}

.payment-groups {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.group {
  flex: 1;
  margin-right: 1rem;
}

.group h4 {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.icons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.icons img {
  height: 32px;
  cursor: pointer;
}

.social-and-app {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.social-media,
.app-download {
  flex: 1;
}

.social-icons,
.app-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.social-icons img,
.app-buttons img {
  height: 32px;
  cursor: pointer;
}

.trust-badges {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-left: auto;
}

.trust-badges img {
  height: 64px;
}
</style>
