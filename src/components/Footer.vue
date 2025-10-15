<template>
  <footer class="footer">
    <section class="payment-methods">
      <h3>FORMAS DE PAGAMENTOS</h3>
      <div class="payment-groups">
        <div class="group">
          <h4>Cartões do Grupo</h4>
          <div class="icons">
            <img src="@/assets/cards/casas-bahia.jpg" alt="Casas Bahia" title="Casas Bahia" />
            <img src="@/assets/cards/pontofrio.jpeg" alt="Pontofrio" title="Pontofrio" />
            <img src="@/assets/cards/extra.png" alt="Extra" title="Extra" />
          </div>
        </div>
        <div class="group">
          <h4>Outras formas</h4>
          <div class="icons">
            <img src="@/assets/cards/banqi.png" alt="BanQi" title="BanQi" />
            <img src="@/assets/cards/pix.png" alt="Pix" title="Pix" class="pix-icon" />
          </div>
        </div>
        <div class="group">
          <h4>Crédito</h4>
          <div class="icons">
            <img src="@/assets/cards/visa.png" alt="Visa" title="Visa" />
            <img src="@/assets/cards/mastercard.png" alt="Mastercard" title="Mastercard" />
            <img src="@/assets/cards/elo.png" alt="Elo" title="Elo" />
            <img src="@/assets/cards/hipercard.png" alt="Hipercard" title="Hipercard" />
          </div>
        </div>
      </div>
    </section>

    <section class="social-and-app">
      <div class="social-media">
        <h3>Redes Sociais</h3>
        <div class="social-icons">
          <img src="@/assets/cards/facebook.png" alt="Facebook" title="Facebook" />
          <img src="@/assets/cards/instagram.jpeg" alt="Instagram" title="Instagram" />
          <img src="@/assets/cards/X.png" alt="Twitter" title="Twitter" />
          <img src="@/assets/cards/youtube.png" alt="YouTube" title="YouTube" />
        </div>
      </div>
      <div class="app-download">
        <h3>Baixe o App</h3>
        <div class="app-buttons">
          <img src="@/assets/cards/googleplay.png" alt="Google Play" title="Google Play" />
          <img src="@/assets/cards/appstore.png" alt="App Store" title="Apple Store" />
        </div>
      </div>
    </section>
  <section>
      <div class="contact">
        <p>4003-1234 | 0800-1234 | (11) 1234-5678</p>
      </div>
    </section>

  </footer>
</template>

<script setup>
// Footer with payment methods, social media, app download, and trust badges
</script>

<style scoped>
.footer img {
  width: 50px;
  height: 50px;
  object-fit: contain;
  cursor: pointer;
}

.footer {
  background-color: #f7f7f7;
  padding: 2rem;
  font-family: Arial, sans-serif;
  color: #333;
}

.payment-methods h3,
.social-and-app h3 {
  color: #000000;
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

.pix-icon {
  border: 1px solid #ccc;
  border-radius: 4px;
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

.social-icons img {
  height: 32px;
  cursor: pointer;
}

.app-buttons img {
  width: 122px;
  height: 100px;
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

.trust-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #ddd;
}

.contact {
  margin-left: auto;
}

.contact p {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
}

.social-and-app h3 {
  color: #000000;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

</style>
