<script setup>
import Header from '@/components/Header.vue';
</script>
<template>
  <Header />
  <section class="banner">
    <div class="banner-content">
      <h1>Encontre o imóvel dos seus sonhos</h1>
      <p>Casas, apartamentos e terrenos com as melhores condições do mercado.</p>
      <button>Ver imóveis</button>
    </div>
  </section>

  <section class="search-section">
    <h2>Busque seu imóvel</h2>
    <form class="search-form">
      <input type="text" placeholder="Cidade, bairro ou código" />
      <select>
        <option>Tipo</option>
        <option>Casa</option>
        <option>Apartamento</option>
        <option>Terreno</option>
      </select>
      <button type="submit">Buscar</button>
    </form>
  </section>

  <section class="services-section">
    <h2>Nossos Serviços</h2>
    <div class="services-list">
      <div class="service-card">
        <span class="service-icon">🏠</span>
        <h3>Venda de Imóveis</h3>
        <p>Intermediação completa para compra e venda de casas, apartamentos e terrenos.</p>
      </div>
      <div class="service-card">
        <span class="service-icon">🔑</span>
        <h3>Locação</h3>
        <p>Encontre o imóvel ideal para alugar com segurança e praticidade.</p>
      </div>
      <div class="service-card">
        <span class="service-icon">📋</span>
        <h3>Avaliação</h3>
        <p>Avaliação profissional do seu imóvel para venda ou locação.</p>
      </div>
    </div>
  </section>

  <!--seção de imóveis em destaque-->
  <section class="featured-properties">
    <h2>Destaques</h2>
    <div class="properties-list">
      <!--Imóvel1-->
      <div class="property-card">
        <img src="@/assets/img/image.png" alt="Casa em destaque" />
        <h3>Casa moderna no centro</h3>
        <p>3 quartos • 2 banheiros • 120m²</p>
        <span>R$ 450.000</span>
      </div>

      <!--imovel2-->
      <div class="property-card">
        <img src="@/assets/img/image.png" alt="Apartamento em destaque" />
        <h3>Apartamento com vista</h3>
        <p>2 quartos • 1 suíte • 80m²</p>
        <span>R$ 320.000</span>
      </div>
      <!--imovel3-->
      <div class="property-card">
        <img src="@/assets/img/image.png" alt="Terreno em destaque" />
        <h3>Terreno amplo</h3>
        <p>500m² • Bairro residencial</p>
        <span>R$ 180.000</span>
      </div>
    </div>
  </section>

  <!-- Seção de parceiros -->
  <section class="partners-section">
    <h2>Parceiros</h2>
    <div class="partners-list">
      <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Google-flutter-logo.svg" alt="Parceiro 1" />
      <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="Parceiro 2" />
      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="Parceiro 3" />
    </div>
  </section>

  <!-- Seção sobre a imobiliária -->
  <section class="about-section">
    <h2>Sobre a Imobiliária</h2>
    <p>Atuamos há mais de 20 anos no mercado, conectando pessoas ao imóvel ideal. Nossa equipe é especializada e pronta para te ajudar em todas as etapas.</p>
  </section>

  <!-- Seção de perguntas frequentes (FAQ) -->
  <section class="faq-section">
    <h2>Perguntas Frequentes</h2>
    <div class="faq-list">
      <div class="faq-item">
        <h4>Como agendar uma visita?</h4>
        <p>Basta entrar em contato pelo WhatsApp ou pelo formulário do site e agendaremos para você.</p>
      </div>
      <div class="faq-item">
        <h4>Quais documentos preciso para comprar um imóvel?</h4>
        <p>Documentos pessoais, comprovante de renda e comprovante de residência. Nossa equipe orienta todo o processo.</p>
      </div>
      <div class="faq-item">
        <h4>Posso financiar meu imóvel?</h4>
        <p>Sim! Trabalhamos com os principais bancos para facilitar seu financiamento.</p>
      </div>
    </div>
  </section>

  <!-- Seção de depoimentos -->
  <section class="testimonials-section">
    <h2>Depoimentos</h2>
    <div class="testimonials-list">
      <blockquote>
        "Encontrei minha casa perfeita com a ajuda dessa imobiliária! Atendimento excelente."<br />
        <span>- João Silva</span>
      </blockquote>
      <blockquote>
        "Equipe muito atenciosa e imóveis de qualidade. Recomendo!"<br />
        <span>- Maria Oliveira</span>
      </blockquote>
    </div>
  </section>

  <!-- Botão flutuante de WhatsApp -->
  <a href="https://wa.me/5599999999999" class="whatsapp-float" target="_blank" title="Fale conosco no WhatsApp">
    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
  </a>

  <!-- Rodapé -->
  <footer class="footer">
    <p>&copy; 2025 Imobiliária Exemplo. Todos os direitos reservados.</p>
  </footer>
</template>

<style scoped>
/* Reset básico e fontes modernas */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
:root {
  --primary: #2563eb;
  --secondary: #00d2ff;
  --accent: #25d366;
  --bg-light: #f5f7fa;
  --bg-dark: #1e293b;
  --text-dark: #222;
  --text-light: #fff;
  --radius: 12px;
  --shadow: 0 4px 24px rgba(0,0,0,0.08);
}
body {
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  background: var(--bg-light);
  color: var(--text-dark);
}

/* Banner principal */
.banner {
  background: linear-gradient(120deg, var(--primary) 0%, var(--secondary) 100%);
  color: var(--text-light);
  min-height: 45vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  box-shadow: var(--shadow);
}
.banner-content {
  text-align: center;
  padding: 2rem 1rem;
}
.banner-content h1 {
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 0.7rem;
  letter-spacing: -1px;
}
.banner-content p {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.95;
}
.banner-content button {
  background: var(--accent);
  color: #fff;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: var(--radius);
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(37,99,235,0.12);
  transition: background 0.2s, transform 0.2s;
}
.banner-content button:hover {
  background: #128c7e;
  transform: scale(1.04);
}

/* Seção de busca */
.search-section {
  background: #fff;
  padding: 2.5rem 0 2rem 0;
  text-align: center;
  z-index: 2;
  position: relative;
  box-shadow: var(--shadow);
}
.search-section h2 {
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 1rem;
}
.search-form {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}
.search-form input,
.search-form select {
  padding: 0.9rem;
  border: 1.5px solid #cbd5e1;
  border-radius: var(--radius);
  min-width: 180px;
  font-size: 1rem;
  background: #f8fafc;
  transition: border 0.2s;
}
.search-form input:focus,
.search-form select:focus {
  border: 1.5px solid var(--primary);
  outline: none;
}
.search-form button {
  background: var(--primary);
  color: #fff;
  border: none;
  padding: 0.9rem 2rem;
  border-radius: var(--radius);
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.search-form button:hover {
  background: var(--secondary);
  color: var(--primary);
  transform: scale(1.04);
}

/* Seção de serviços */
.services-section {
  background: var(--bg-light);
  padding: 2.5rem 0;
  text-align: center;
}
.services-section h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
}
.services-list {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 1.5rem;
}
.service-card {
  background: #fff;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 1.5rem 1.2rem;
  width: 240px;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1.5px solid #e0e7ef;
}
.service-card:hover {
  transform: translateY(-6px) scale(1.04);
  box-shadow: 0 8px 32px rgba(37,99,235,0.10);
}
.service-icon {
  font-size: 2.5rem;
  margin-bottom: 0.7rem;
  display: block;
  color: var(--primary);
}
.service-card h3 {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
}
.service-card p {
  color: #555;
  font-size: 0.98rem;
}

/* Seção de imóveis em destaque */
.featured-properties {
  padding: 2.5rem 0;
  background: #fff;
  text-align: center;
}
.featured-properties h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
}
.properties-list {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 1.5rem;
}
.property-card {
  background: var(--bg-light);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 1.2rem 1rem;
  width: 270px;
  text-align: left;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1.5px solid #e0e7ef;
}
.property-card:hover {
  transform: translateY(-6px) scale(1.04);
  box-shadow: 0 8px 32px rgba(37,99,235,0.10);
}
.property-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 0.7rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.property-card h3 {
  margin: 0.5rem 0 0.2rem 0;
  font-size: 1.15rem;
  font-weight: 700;
}
.property-card p {
  color: #555;
  font-size: 0.97rem;
}
.property-card span {
  color: var(--primary);
  font-weight: bold;
  font-size: 1.13rem;
}

/* Seção de parceiros */
.partners-section {
  background: #f5f5f5;
  padding: 2.5rem 0;
  text-align: center;
}
.partners-section h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
}
.partners-list {
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  align-items: center;
  margin-top: 1rem;
  flex-wrap: wrap;
}
.partners-list img {
  width: 80px;
  height: 80px;
  object-fit: contain;
  filter: grayscale(1) brightness(0.8);
  transition: filter 0.2s, transform 0.2s;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 0.5rem;
}
.partners-list img:hover {
  filter: none;
  transform: scale(1.08);
}

/* Sobre a imobiliária */
.about-section {
  background: #eaf6fb;
  padding: 2.5rem 0;
  text-align: center;
}
.about-section h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.7rem;
}
.about-section p {
  max-width: 600px;
  margin: 0 auto;
  color: #444;
  font-size: 1.08rem;
}

/* FAQ */
.faq-section {
  background: #fff;
  padding: 2.5rem 0;
  text-align: center;
}
.faq-section h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
}
.faq-list {
  max-width: 700px;
  margin: 0 auto;
  text-align: left;
}
.faq-item {
  margin-bottom: 1.2rem;
  background: #f8fafc;
  border-radius: var(--radius);
  padding: 1rem 1.2rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  border-left: 4px solid var(--primary);
}
.faq-item h4 {
  margin-bottom: 0.3rem;
  color: var(--primary);
  font-size: 1.08rem;
}
.faq-item p {
  color: #444;
  margin: 0;
  font-size: 0.98rem;
}

/* Depoimentos */
.testimonials-section {
  background: #fff;
  padding: 2.5rem 0;
  text-align: center;
}
.testimonials-section h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
}
.testimonials-list {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}
.testimonials-list blockquote {
  background: #f5f5f5;
  border-left: 4px solid var(--primary);
  padding: 1.2rem 1.5rem;
  border-radius: var(--radius);
  font-style: italic;
  max-width: 320px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  color: #333;
}
.testimonials-list span {
  display: block;
  margin-top: 0.7rem;
  color: var(--primary);
  font-weight: bold;
}

/* Botão do WhatsApp */
.whatsapp-float {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 99;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0,0,0,0.18);
  background: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, transform 0.2s;
}
.whatsapp-float img {
  width: 36px;
  height: 36px;
}
.whatsapp-float:hover {
  background: #128c7e;
  transform: scale(1.08);
}

/* Rodapé */
.footer {
  background: var(--primary);
  color: #fff;
  text-align: center;
  padding: 1.2rem 0;
  margin-top: 2rem;
  font-size: 1rem;
  letter-spacing: 0.5px;
  border-radius: var(--radius) var(--radius) 0 0;
  box-shadow: 0 -2px 8px rgba(0,0,0,0.04);
}

/* Responsividade */
@media (max-width: 1200px) {
  .properties-list, .services-list, .testimonials-list, .partners-list {
    gap: 1.2rem;
  }
}
@media (max-width: 900px) {
  .properties-list, .services-list, .testimonials-list, .partners-list {
    flex-direction: column;
    align-items: center;
  }
  .banner-content h1 {
    font-size: 2.1rem;
  }
}
@media (max-width: 600px) {
  .banner-content h1 {
    font-size: 1.3rem;
  }
  .banner-content p {
    font-size: 1rem;
  }
  .property-card, .service-card {
    width: 98vw;
    min-width: unset;
    max-width: 340px;
  }
  .partners-list img {
    width: 60px;
    height: 60px;
  }
  .faq-list, .about-section p {
    padding: 0 0.5rem;
  }
  .whatsapp-float {
    width: 48px;
    height: 48px;
    bottom: 16px;
    right: 16px;
  }
  .whatsapp-float img {
    width: 28px;
    height: 28px;
  }
}
</style>