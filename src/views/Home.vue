<script setup>
import { ref, onMounted, watch } from 'vue';
import Header from '@/components/Header.vue';

const estados = ref([]);
const cidades = ref([]);
const estadoSelecionado = ref('');
const cidadeSelecionada = ref('');

const isHeaderScrolled = ref(false);

onMounted(() => {
  window.addEventListener('scroll', () => {
    isHeaderScrolled.value = window.scrollY > 50;
  });
});

onMounted(async () => {
  // Buscar estados do Brasil via IBGE
  const res = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
  estados.value = await res.json();
});

watch(estadoSelecionado, async (uf) => {
  if (uf) {
    cidades.value = [];
    cidadeSelecionada.value = '';
    const res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
    cidades.value = await res.json();
  }
});
</script>
<template>
  <Header :scrolled="isHeaderScrolled" />
  <section class="banner">
    <div class="banner-content banner-flex-align">
      <div class="banner-left">
        <h1>Encontre o imóvel dos seus sonhos</h1>
        <p class="banner-desc">
          Somos especialistas em realizar sonhos! Há mais de 20 anos no mercado, a Imobiliária Primeiro Lar oferece
          atendimento personalizado, transparência e segurança em cada etapa da sua jornada. Nossa equipe está pronta
          para ajudar você a encontrar o imóvel perfeito, seja para morar, investir ou empreender. Conte conosco para
          transformar seu projeto de vida em realidade!
        </p>
      </div>
      <div class="banner-btn-right">
        <button>Ver imóveis</button>
      </div>
    </div>
  </section>

  <section class="search-section">
    <h2>Busque seu imóvel</h2>
    <form class="search-form">
      <select v-model="estadoSelecionado">
        <option value="">Selecione o estado</option>
        <option v-for="estado in estados" :key="estado.id" :value="estado.sigla">
          {{ estado.nome }}
        </option>
      </select>
      <select v-if="estadoSelecionado" v-model="cidadeSelecionada">
        <option value="">Selecione a cidade</option>
        <option v-for="cidade in cidades" :key="cidade.id" :value="cidade.nome">
          {{ cidade.nome }}
        </option>
      </select>
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
        <span class="service-icon">
          <!-- Ícone Casa -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="32"
            height="32">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7m-9 2v6m4-6v6m5-6l2 2m-2-2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6" />
          </svg>
        </span>
        <h3>Venda de Imóveis</h3>
        <p>Intermediação completa para compra e venda de casas, apartamentos e terrenos.</p>
      </div>
      <div class="service-card">
        <span class="service-icon">
          <!-- Ícone Chave -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="32"
            height="32">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 7a4 4 0 11-8 0 4 4 0 018 0zm-4 4v6m0 0h2m-2 0H7" />
          </svg>
        </span>
        <h3>Locação</h3>
        <p>Encontre o imóvel ideal para alugar com segurança e praticidade.</p>
      </div>
      <div class="service-card">
        <span class="service-icon">
          <!-- Ícone Avaliação (Documento) -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="32"
            height="32">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h10M7 11h10M7 15h6" />
          </svg>
        </span>
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
        <p>Documentos pessoais, comprovante de renda e comprovante de residência. Nossa equipe orienta todo o processo.
        </p>
      </div>
      <div class="faq-item">
        <h4>Posso financiar meu imóvels fontes todas em branco q?</h4>
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

  <!-- Seção de bancos parceiros -->
  <section class="banks-section">
    <h2>Trabalhamos com os principais bancos</h2>
    <div class="banks-logos">
      <img src="@/assets/img/Itau.png" alt="Itaú" />
      <img src="@/assets/img/Bradesco.jpeg" alt="Bradesco" />
      <img src="@/assets/img/BancoDoBrasil.jpeg" alt="Banco do Brasil" />
      <img src="@/assets/img/Caixa.png" alt="Caixa" />
      <img src="@/assets/img/Santander.jpg" alt="Santander" />
      <img src="@/assets/img/Sicredi.jpg" alt="Sicredi" />
    </div>
  </section>

  <!-- Seção sobre a imobiliária e contato -->
  <section class="about-section">
    <div class="about-flex print-layout">
      <div class="about-img">
        <img src="@/assets/img/chave-na-mao.jpg" alt="Chave na mão" />
      </div>
      <div class="about-text">
        <h2>Sobre nós</h2>
        <p>Somos uma imobiliária especializada na intermediação comercial de imóveis residenciais e comerciais, com
          atuação sólida e confiável no mercado. Nossa missão é conectar pessoas ao imóvel ideal, sempre com
          transparência, ética e agilidade. Junte-se a centenas de clientes satisfeitos que já realizaram seus sonhos
          conosco. Conte com nossa equipe experiente para garantir segurança e tranquilidade em todas as etapas do
          processo.</p>
      </div>
    </div>
  </section>

  <!-- Botão flutuante de WhatsApp -->
  <a href="https://wa.me/5599999999999" class="whatsapp-float" target="_blank" title="Fale conosco no WhatsApp">
    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
  </a>

</template>color: aliceblue;

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
  --shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

body {
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  background: var(--bg-light);
  color: var(--text-light);
}

.faq-item {
  background: rgba(30, 41, 59, 0.85);
}

.service-card {
  background: rgba(30, 41, 59, 0.85);
}

.property-card {
  background: rgba(30, 41, 59, 0.85);
}

.about-section {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.featured-properties {
  background: rgba(30, 41, 59, 0.85);
}

.search-section {
  background: rgba(30, 41, 59, 0.85);
}

.testimonials-section {
  background: rgba(30, 41, 59, 0.85);
}

/* Banner principal */
.banner {
  min-height: 85vh;
  height: 85vh;
  max-height: 100vh;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(30, 41, 59, 0.65), rgba(30, 41, 59, 0.65)), url('@/assets/img/image.png') center center no-repeat;
  background-size: cover;
  background-attachment: fixed;
  color: var(--text-light);
  position: relative;
  z-index: 2;
  box-shadow: var(--shadow);
  border-radius: 0 0 var(--radius) var(--radius);
}

.banner-content {
  text-align: center;
  padding: 3rem 2rem;
  background: transparent;
  border-radius: 0;
  box-shadow: none;
  backdrop-filter: none;
}

.banner-content h1 {
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 0.7rem;
  letter-spacing: -1px;
  color: aliceblue;
}

.banner-content p {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.95;
  color: aliceblue;
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
  color: aliceblue;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.12);
  transition: background 0.2s, transform 0.2s;
}

.banner-content button:hover {
  background: var(--bg-dark);
  transform: scale(1.04);
}

/* Banner flex layout */
.banner-flex {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 2.5rem;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}

.banner-flex-align {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  min-height: 85vh;
  max-width: 1100px;
  margin: 0 auto;
}

.banner-center {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  min-height: 85vh;
  max-width: 1100px;
  margin: 0 auto;
}

.banner-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  max-width: 520px;
  margin-left: 2.5rem;
}

.banner-left h1 {
  text-align: left;
  margin-left: 0;
  margin-bottom: 1.2rem;
  margin-left: -80%;
}

.banner-left p {
  text-align: left;
  margin-left: 0;
  margin-bottom: 1.5rem;
  margin-left: -80%;
}

.banner-desc {
  text-align: left;
  font-size: 0.95rem;
  margin-bottom: 0;
  color: var(--text-light);
  opacity: 0.85;
  max-width: 650px;
  line-height: 1.6;
}

.banner-btn-right {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  height: 100%;
  width: 50%;
  padding-top: 4rem;
}

.banner-btn-right button {
  margin: 0 auto;
  font-size: 1.1rem;
  padding: 1rem 2.5rem;
  display: block;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  background: var(--primary-color, #2575fc);
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.banner-btn-right button:hover {
  background: #fff;
  color: #222;
  border: 1.5px solid var(--primary-color, #2575fc);
  transform: scale(1.07) translateY(-50%);
  z-index: 1;
}

.banner-btn-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}

.banner-btn-wrapper button {
  font-size: 1.1rem;
  padding: 1rem 2.5rem;
}

/* Banner flex layout responsive */
@media (max-width: 900px) {
  .banner-flex-align {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }

  .banner-left {
    margin-left: 0.5rem;
    max-width: 98vw;
  }

  .banner-btn-right {
    width: 100%;
    justify-content: flex-start;
    height: auto;
  }

  .banner-btn-right button {
    top: 0;
    transform: none;
    margin-top: 1.5rem;
  }
}

/* Seção de busca */
.search-section {
  border-radius: var(--radius);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.10);
  margin-top: -2rem;
  background: #fff;
  padding: 2.5rem 0 2rem 0;
  text-align: center;
  z-index: 2;
  position: relative;
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

.search-form select,
.search-form input {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.2s, background 0.2s;
  padding: 0.9rem;
  border: 1.5px solid #cbd5e1;
  border-radius: var(--radius);
  min-width: 180px;
  font-size: 1rem;
  background: #f8fafc;
}

.search-form select:focus,
.search-form input:focus {
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.12);
  outline: none;
}

.search-form button {
  background: var(--primary);
  color: var(--text-dark);
  border: none;
  padding: 0.9rem 2rem;
  border-radius: var(--radius);
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.12);
}

.search-form button:hover {
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.18);
  transform: scale(1.05);
}

/* Seção de serviços */
.services-section {
  border-radius: var(--radius);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.10);
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
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.2s, transform 0.2s;
  background: #fff;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 1.5rem 1.2rem;
  width: 240px;
  text-align: center;
  border: 1.5px solid #e0e7ef;
}

.service-card:hover {
  box-shadow: 0 12px 40px rgba(30, 41, 59, 0.18);
  transform: translateY(-8px) scale(1.04);
}

.service-icon {
  font-size: 2.5rem;
  margin-bottom: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  filter: drop-shadow(0 2px 8px rgba(37, 99, 235, 0.10));
  width: 100%;
  height: 32px;
}

.service-icon svg {
  width: 32px;
  height: 32px;
  display: inline-block;
}

/* Seção de imóveis em destaque */
.featured-properties {
  border-radius: var(--radius);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.10);
  padding: 2.5rem 0;
  background: #fff;
  text-align: center;
  margin-top: 2rem;
}

.featured-properties h2 {
  font-size: 2.1rem;
  font-weight: 800;
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
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.2s, transform 0.2s;
  background: var(--bg-light);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 1.2rem 1rem;
  width: 270px;
  text-align: left;
  border: 1.5px solid #e0e7ef;
}

.property-card:hover {
  box-shadow: 0 12px 40px rgba(30, 41, 59, 0.18);
  transform: translateY(-8px) scale(1.04);
}

.property-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 0.7rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.10);
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

/* Sobre a imobiliária */
.about-section {
  border-radius: var(--radius);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.10);
  background: #eaf6fb;
  padding: 2.5rem 0;
  text-align: center;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.about-section h2 {
  font-size: 2.1rem;
  font-weight: 800;
  margin-bottom: 0.7rem;
}

.about-section p {
  max-width: 600px;
  margin: 0 auto;
  color: #444;
  font-size: 1.08rem;
}

.about-flex {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  max-width: 900px;
  margin: 0 auto;
}

.about-img img {
  width: 350px;
  max-width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.10);
}

.about-text {
  flex: 1;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.about-text h2 {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1.2rem;
  color: #222;
}

.about-text p {
  font-size: 1.08rem;
  color: #444;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.print-contact {
  width: 100%;
  margin-top: 1.5rem;
  background: none;
  box-shadow: none;
  padding: 0;
  text-align: left;
}

.print-contact h3 {
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 0.7rem;
  color: #222;
}

.print-contact p {
  font-size: 1rem;
  color: #444;
  margin-bottom: 1rem;
}

.print-whatsapp {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  background: #222;
  color: #fff;
  font-weight: 700;
  font-size: 1.08rem;
  border-radius: 8px;
  padding: 0.8rem 1.2rem;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.12);
  transition: background 0.2s, transform 0.2s;
  margin-top: 0.5rem;
}

.print-whatsapp img {
  width: 28px;
  height: 28px;
}

.print-whatsapp:hover {
  background: #128c7e;
  transform: scale(1.05);
}

/* Contato */
.contact-section {
  margin-top: 2.5rem;
  text-align: center;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  padding: 2rem 1rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.contact-section h3 {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--primary);
}

.contact-section p {
  font-size: 1.08rem;
  margin-bottom: 1.2rem;
  color: #222;
}

.contact-whatsapp {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  background: var(--accent);
  color: #fff;
  font-weight: 700;
  font-size: 1.08rem;
  border-radius: 8px;
  padding: 0.8rem 1.2rem;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.12);
  transition: background 0.2s, transform 0.2s;
}

.contact-whatsapp img {
  width: 28px;
  height: 28px;
}

.contact-whatsapp:hover {
  background: #128c7e;
  transform: scale(1.05);
}

/* FAQ */
.faq-section {
  border-radius: var(--radius);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.10);
  background: #fff;
  padding: 2.5rem 0;
  text-align: center;
  margin-top: 2rem;
}

.faq-section h2 {
  font-size: 2.1rem;
  font-weight: 800;
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
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  border-left: 4px solid var(--primary);
  transition: box-shadow 0.2s;
}

.faq-item:hover {
  box-shadow: 0 12px 40px rgba(30, 41, 59, 0.18);
}

.faq-item h4 {
  margin-bottom: 0.3rem;
  color: #222 !important;
  font-size: 1.08rem;
  font-weight: bold;
}

.faq-item p {
  color: #444;
  margin: 0;
  font-size: 0.98rem;
}

/* Depoimentos */
.testimonials-section {
  border-radius: var(--radius);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.10);
  background: #fff;
  padding: 2.5rem 0;
  text-align: center;
  margin-top: 2rem;
}

.testimonials-section h2 {
  font-size: 2.1rem;
  font-weight: 800;
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  color: #333;
  transition: box-shadow 0.2s;
}

.testimonials-list blockquote:hover {
  box-shadow: 0 12px 40px rgba(30, 41, 59, 0.18);
}

.testimonials-list span {
  display: block;
  margin-top: 0.7rem;
  color: var(--primary);
  font-weight: bold;
}

/* Estilo bancos parceiros */
.banks-section {
  background: #fff;
  text-align: center;
  padding: 2.5rem 0 2rem 0;
  margin-top: 2.5rem;
  border-radius: var(--radius);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.10);
}

.banks-section h2 {
  font-size: 2.1rem;
  font-weight: 800;
  margin-bottom: 1.2rem;
  color: var(--primary);
}

.banks-logos {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.banks-logos img {
  height: 48px;
  object-fit: contain;
  filter: grayscale(0.2) brightness(0.95);
  transition: filter 0.2s, transform 0.2s;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  padding: 0.5rem;
}

.banks-logos img:hover {
  filter: none;
  transform: scale(1.08);
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
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.18);
  background: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: box-shadow 0.2s, transform 0.2s;
}

.whatsapp-float img {
  width: 36px;
  height: 36px;
}

.whatsapp-float:hover {
  box-shadow: 0 12px 40px rgba(30, 41, 59, 0.18);
  transform: scale(1.08);
}

/* Rodapé */
.footer {
  background: var(--primary);
  color: #fff;
  text-align: center;
  padding: 1.5rem 0;
  margin-top: 2rem;
  font-size: 1.08rem;
  letter-spacing: 0.5px;
  border-radius: var(--radius) var(--radius) 0 0;
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.08);
}

/* Responsividade */
@media (max-width: 1200px) {

  .properties-list,
  .services-list,
  .testimonials-list {
    gap: 1.2rem;
  }
}

@media (max-width: 900px) {

  .properties-list,
  .services-list,
  .testimonials-list {
    flex-direction: column;
    align-items: center;
  }

  .banner-content h1 {
    font-size: 2.1rem;
  }

  .banner-flex {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }

  .banner-right {
    justify-content: flex-start;
    width: 100%;
  }

  .btn-align {
    justify-content: flex-start;
  }

  .banner-right button {
    margin-top: 1.5rem;
  }
}

@media (max-width: 600px) {
  .banner-content h1 {
    font-size: 1.3rem;
  }

  .banner-content p {
    font-size: 1rem;
  }

  .property-card,
  .service-card {
    width: 98vw;
    min-width: unset;
    max-width: 340px;
  }

  .faq-list,
  .about-section p {
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