<script>
export default {
  name: 'AnuncioCard',
  props: {
    imovelId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      mostrarInfo: false
    }
  },
  methods: {
    abrir() {
      this.mostrarInfo = true;
    },
    fechar() {
      this.mostrarInfo = false;
    },
    fecharFora(e) {
      if (e.target.classList.contains('info-overlay')) {
        this.fechar();
      }
    }
  }
}
</script>

<template>
  <div class="property-card-wrapper">
    <div class="property-card" @click="abrir" v-if="!mostrarInfo">
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
      </div>
    </div>
    <div v-if="mostrarInfo" class="info-overlay" @click="fecharFora">
      <button class="fechar-info" @click="fechar">×</button>
      <div class="info-content-row" @click.stop>
        <img class="info-img" src="@/assets/img/image.png" alt="Foto do imóvel" />
        <div class="info-colunas">
          <div class="coluna-esq">
            <h2>Casa moderna em Vila Bela</h2>
            <p><strong>Endereço:</strong> Rua Gradau, 100 - Vila Bela, São Paulo/SP</p>
            <p><strong>Área:</strong> 165m²</p>
            <p><strong>Quartos:</strong> 3</p>
            <p><strong>Banheiros:</strong> 4</p>
            <p><strong>Vagas:</strong> 2</p>
            <p><strong>Preço:</strong> R$ 589.000</p>
            <p><strong>Condomínio:</strong> R$ 100</p>
          </div>
          <div class="coluna-dir">
            <p><strong>IPTU:</strong> R$ 1.200/ano</p>
            <p><strong>Tipo:</strong> Casa térrea</p>
            <p><strong>Ano de construção:</strong> 2018</p>
            <p><strong>Estado de conservação:</strong> Excelente</p>
            <p><strong>Possui piscina:</strong> Sim</p>
            <p><strong>Possui churrasqueira:</strong> Sim</p>
            <p><strong>Documentação:</strong> OK</p>
            <p><strong>Proximidades:</strong> Escola, supermercado, parque, farmácia</p>
          </div>
        </div>
      </div>
      <div class="descricao-row">
        <strong>Descrição:</strong> Essa casa é legal! Com arquitetura moderna, ambientes amplos e ótima iluminação natural. Pronta para morar, aceita financiamento, aceita pet, rua tranquila e vizinhança amigável.
      </div>
    </div>
  </div>
</template>

<style scoped>
.property-card-wrapper {
  position: relative;
}
.property-card {
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
.action-ico img {
  width: 28px;
  height: 28px;
  display: block;
}
.action-txt { font-size:1rem; }

@media (max-width:600px) {
  .modal { padding:16px; }
  .modal-actions { grid-template-columns:1fr; }
}

.info-overlay {
  position: fixed;
  top: 0;
  left: 25vw;
  width: 75vw;
  height: 100vh;
  background: rgba(255,255,255,0.98);
  z-index: 10000;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  box-shadow: -8px 0 24px rgba(0,0,0,0.12);
  padding: 2vw 2vw;
  transition: left 0.2s, width 0.2s;
  border-radius: 1.5vw 0 0 1.5vw;
}
.fechar-info {
  position: absolute;
  top: 1.5vw;
  background: none;
  border: none;
  font-size: 2.5vw;
  cursor: pointer;
  z-index: 20;
}
.info-content-row {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 2vw;
  width: 100%;
  margin-top: 2vw;
}
.info-img {
  width: 22vw;
  max-width: 320px;
  border-radius: 1vw;
  margin-bottom: 0;
  object-fit: cover;
}
.info-colunas {
  display: flex;
  flex-direction: row;
  gap: 3vw;
  width: 100%;
}
.coluna-esq, .coluna-dir {
  display: flex;
  flex-direction: column;
  gap: 0.7vw;
  font-size: 1.1vw;
}
.coluna-esq h2 {
  font-size: 2vw;
  margin-bottom: 0.7vw;
}
.descricao-row {
  margin-top: 2vw;
  color: #444;
  font-size: 1.2vw;
  text-align: left;
  max-width: 60vw;
  padding-left: 2vw;
}
@media (max-width: 900px) {
  .info-overlay {
    left: 0;
    width: 100vw;
    height: 100vh;
    padding: 2vw 1vw;
    border-radius: 0;
  }
  .info-content-row {
    flex-direction: column;
    align-items: center;
  }
  .info-img {
    width: 90vw;
    max-width: 90vw;
  }
  .info-colunas {
    flex-direction: column;
    gap: 2vw;
  }
  .coluna-esq, .coluna-dir {
    font-size: 2.5vw;
  }
  .coluna-esq h2 {
    font-size: 5vw;
  }
  .descricao-row {
    font-size: 2.5vw;
    max-width: 98vw;
    padding-left: 0;
  }
}
</style>
