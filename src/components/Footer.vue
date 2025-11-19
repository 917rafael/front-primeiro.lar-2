<script>
export default {
  name: "AppFooter"
};
</script>
<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-row">
        <div class="footer-col brand-col">
          <div class="footer-brand">
            <img src="../assets/img/logo.png" alt="Logo" class="footer-logo" />
            <span class="footer-title">Primeira Lar Imobiliária</span>
          </div>
          <p class="footer-desc">Seu novo lar está aqui! Especialistas em compra, venda e locação de imóveis residenciais e comerciais.</p>
        </div>
        <div class="footer-col contact-col">
          <h4>Contato</h4>
          <ul>
            <li>Telefone: <a href="tel:+5511999999999">(11) 99999-9999</a></li>
            <li>Email: <a href="mailto:contato@primeiralar.com">contato@primeiralar.com</a></li>
            <li>Endereço: Av. Central, 1234 - São Paulo/SP</li>
            <li>Atendimento: Seg a Sex, 8h às 18h</li>
          </ul>
        </div>
        <div class="footer-col links-col">
          <h4>Links Úteis</h4>
          <ul>
            <li><a href="#">Sobre Nós</a></li>
            <li><a href="#">Política de Privacidade</a></li>
            <li><a href="#">Fale Conosco</a></li>
            <li><a href="#">Serviço</a></li>
          </ul>
        </div>
        <div class="footer-col social-col">
          <h4>Redes Sociais</h4>
          <div class="footer-social">
            <a href="#" aria-label="Instagram" class="social-icon"><img src="/src/assets/cards/instagram.jpeg" alt="Instagram" /></a>
            <a href="#" aria-label="Facebook" class="social-icon"><img src="/src/assets/cards/facebook.png" alt="Facebook" /></a>
            <a href="#" aria-label="WhatsApp" class="social-icon"><img src="/src/assets/cards/what.jpg" alt="WhatsApp" /></a>
          </div>
        </div>
      </div>
      <div class="footer-copy">
        &copy; 2025 Primeira Lar Imobiliária. Todos os direitos reservados.
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: linear-gradient(90deg, #0d1b2a 0%, #1b263b 100%);
  color: #fff;
  padding: 2.5rem 0 1.2rem 0;
  font-size: 1rem;
  width: 100%;
  box-shadow: 0 -2px 16px rgba(0,0,0,0.08);
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.2rem;
}

.footer-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2.2rem 2.5rem;
  width: 100%;
  margin-bottom: 1.2rem;
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  min-width: 0;
}

.brand-col {
  max-width: 320px;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.footer-logo {
  width: 38px;
  height: 38px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
}

.footer-title {
  color: #f7c873;
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: 1px;
}

.footer-desc {
  color: #bfc9da;
  font-size: 0.98rem;
  margin-top: 0.5rem;
}

.footer-col h4 {
  color: #f7c873;
  font-size: 1.08rem;
  margin-bottom: 0.2rem;
  font-weight: 700;
}

.footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.footer-col ul li {
  color: #e0e0e0;
  font-size: 0.98rem;
}
.footer-col a {
  color: #f7c873;
  text-decoration: none;
  transition: color 0.2s;
}
.footer-col a:hover {
  color: #fff;
  text-decoration: underline;
}

.footer-social {
  display: flex;
  gap: 1.1rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.social-icon img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  background: #fff;
  object-fit: cover;
  transition: transform 0.2s, box-shadow 0.2s;
}
.social-icon img:hover {
  transform: scale(1.08);
  box-shadow: 0 4px 16px #f7c87344;
}

.footer-copy {
  margin-top: 0.5rem;
  font-size: 0.95rem;
  color: #bfc9da;
  text-align: center;
}

@media (max-width: 900px) {
  .footer-row {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 1.2rem;
  }
  .footer-col {
    align-items: center;
    text-align: center;
    max-width: 100%;
  }
  .brand-col {
    max-width: 100%;
    align-items: center;
    text-align: center;
  }
  .footer-social {
    justify-content: center;
  }
}

@media (max-width: 600px) {
  .footer {
    padding: 1.2rem 0 0.7rem 0;
    font-size: 0.95rem;
  }
  .footer-container {
    padding: 0 0.5rem;
  }
  .footer-row {
    gap: 1rem;
  }
  .footer-brand {
    font-size: 1.1rem;
  }
  .footer-logo {
    width: 30px;
    height: 30px;
  }
  .footer-title {
    font-size: 1.1rem;
  }
  .footer-social {
    gap: 0.7rem;
  }
  .social-icon img {
    width: 26px;
    height: 26px;
  }
}
</style>
