
<template>
  <div class="property-card">
    <div class="image-section">
      <img src="@/assets/img/image.png" alt="Foto do imóvel" />
    </div>

    <div class="details-section">
      <p class="address">
        <strong>Rua Gradau, 100</strong><br />
        Vila Bela, São Paulo/SP
      </p>

      <div class="info">
        <span>165m²</span>
        <span>· 3 quartos</span>
        <span>· 4 banheiros</span>
        <span>· 2 vagas</span>
      </div>

      <div class="price">
        <strong>R$ 589.000</strong>
        <p>Condomínio R$ 100</p>
      </div>

      <button class="contact-button" @click="openContact">Contatar</button>
    </div>
  </div>

  <!-- Contact Modal -->
  <div v-if="showContact" class="modal-overlay" @click.self="closeContact">
    <div class="modal">
      <button class="modal-close" @click="closeContact" aria-label="Fechar">×</button>

      <h3 class="modal-title">Falar com {{ agencyName }}</h3>

      <div class="modal-body">
        <div class="modal-card">
          <img class="modal-thumb" src="@/assets/img/image.png" alt="thumbnail" />
          <div class="modal-card-info">
            <div class="modal-sub">Prédio Para Alugar Na Avenida Miguel Castro, 1280, Nossa Senhora De Nazaré, Natal</div>
            <div class="modal-price">R$ 8.500</div>
          </div>
        </div>

        <div class="modal-actions">
          <button class="action-btn">
            <div class="action-ico">💬</div>
            <div class="action-txt">Mensagem</div>
          </button>

          <button class="action-btn">
            <div class="action-ico">📅</div>
            <div class="action-txt">Agendar visita</div>
          </button>

          <button class="action-btn">
            <div class="action-ico">📞</div>
            <div class="action-txt">Telefones</div>
          </button>

          <button class="action-btn">
            <div class="action-ico">🟢</div>
            <div class="action-txt">Whatsapp</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Anuncio',
  data() {
    return {
      showContact: false,
      agencyName: 'AUDAZ IMOB',
    };
  },
  methods: {
    openContact() {
      this.showContact = true;
    },
    closeContact() {
      this.showContact = false;
    },
  },
};
</script>

<style scoped>
.property-card {
  width: 850px;
  height: 300px;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  margin: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  background-color: #fff;
  transition: transform 0.2s;
}

.property-card:hover {
  transform: translateY(-3px);
}

.image-section {
  position: relative;
  flex: 1 1 300px;
  min-width: 300px;
  max-width: 40%;
}

.image-section img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.details-section {
  flex: 1 1 60%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.address {
  font-size: 1rem;
  color: #222;
  margin-bottom: 0.8rem;
  line-height: 1.4;
}

.info {
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.price {
  font-size: 1.2rem;
  color: #111;
  font-weight: bold;
  margin-bottom: 1rem;
}

.price p {
  font-size: 0.95rem;
  color: #888;
  font-weight: normal;
  margin-top: 0.3rem;
}

.contact-button {
  background-color: #e30613;
  color: white;
  padding: 0.7rem 1.4rem;
  border: none;
  border-radius: 5px;
  font-size: 0.95rem;
  cursor: pointer;
  align-self: flex-start;
  transition: background-color 0.3s ease;
}

.contact-button:hover {
  background-color: #c10510;
}

/* Responsividade */
@media (max-width: 768px) {
  .property-card {
    flex-direction: column;
  }

  .image-section, .details-section {
    max-width: 100%;
    flex: 1 1 100%;
  }
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 24px;
}

.modal {
  background: #fff;
  width: 760px;
  max-width: calc(100% - 48px);
  border-radius: 10px;
  padding: 22px 28px;
  position: relative;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
}

.modal-close {
  position: absolute;
  left: 16px;
  top: 12px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.modal-title { font-weight: 700; margin: 18px 0; }

.modal-body { display: flex; flex-direction: column; gap: 18px; }

.modal-card { display:flex; gap:12px; align-items:center; padding:10px; border-radius:8px; border:1px solid #f1f1f1; }
.modal-thumb { width:90px; height:64px; object-fit:cover; border-radius:6px; }
.modal-card-info { font-size: 0.95rem; color:#333; }
.modal-sub { color:#666; font-size:0.9rem; }
.modal-price { font-weight:800; margin-top:6px; }

.modal-actions { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-top:12px; }
.action-btn { background:#fff5f5; border:1px solid #fdecec; padding:18px; border-radius:12px; display:flex; gap:12px; align-items:center; justify-content:center; cursor:pointer; font-weight:700; color:#c12b2b; }
.action-ico { font-size:20px; }
.action-txt { font-size:1rem; }

@media (max-width:600px) {
  .modal { padding:16px; }
  .modal-actions { grid-template-columns:1fr; }
}
</style>
