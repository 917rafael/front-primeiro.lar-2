<script setup>
</script>

<template>
  <div class="imovel-card">
    <div class="imovel-img">
      <!-- <img src="@/assets/img/chave-na-mao.jpg" alt="Casa à venda na Vila Bela, São Paulo" /> -->
    </div>
    <div class="imovel-info">
      <h2>Casa com 3 quartos à venda</h2>
      <p class="imovel-endereco">
        Rua Gradau, 100<br />
        Vila Bela, São Paulo/SP
      </p>
      <div class="imovel-detalhes">
        <span>165m²</span>
        <span>·</span>
        <span>3 Quartos</span>
        <span>·</span>
        <span>4 Banheiros</span>
        <span>·</span>
        <span>2 Vagas</span>
      </div>
      <div class="imovel-preco">
        <strong>R$ 589.000</strong>
        <span class="imovel-condominio">Condomínio R$ 100</span>
      </div>
      <button class="imovel-contato">Contatar</button>
    </div>
  </div>
</template>

<style scoped>
.imovel-card {
  display: flex;
  flex-direction: row;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  overflow: hidden;
  margin: 24px 0;
  max-width: 900px;
  width: 100%;
  transition: box-shadow 0.2s;
}

.imovel-card:hover {
  box-shadow: 0 4px 24px rgba(0,0,0,0.15);
}

.imovel-img {
  flex-shrink: 0;
  width: 320px;
  min-width: 180px;
  max-width: 100vw;
  display: flex;
  align-items: stretch;
  background: #f5f5f5;
}

.imovel-img img {
  width: 100%;
  height: 100%;
  min-height: 220px;
  object-fit: cover;
  display: block;
  border-right: 1px solid #eee;
}

.imovel-info {
  flex: 1;
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
}

.imovel-endereco {
  color: #555;
  margin: 8px 0 16px 0;
  font-size: 1.05rem;
  word-break: break-word;
}

.imovel-detalhes {
  color: #444;
  font-size: 1.05rem;
  margin-bottom: 18px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.imovel-preco {
  font-size: 1.7rem;
  color: #222;
  margin-bottom: 14px;
  display: flex;
  flex-direction: column;
}

.imovel-condominio {
  font-size: 1.05rem;
  color: #888;
}

.imovel-contato {
  background: #e60023;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 14px 36px;
  font-size: 1.1rem;
  cursor: pointer;
  align-self: flex-start;
  transition: background 0.2s, transform 0.2s;
  font-weight: 600;
  box-shadow: 0 1px 4px rgba(230,0,35,0.08);
}

.imovel-contato:hover {
  background: #b8001a;
  transform: translateY(-2px) scale(1.03);
}

@media (max-width: 900px) {
  .imovel-card {
    flex-direction: column;
    max-width: 100%;
    margin: 18px 0;
  }
  .imovel-img {
    width: 100%;
    min-width: 0;
  }
  .imovel-img img {
    width: 100%;
    min-height: 180px;
    border-right: none;
    border-bottom: 1px solid #eee;
  }
  .imovel-info {
    padding: 20px 12px;
  }
}

@media (max-width: 600px) {
  .imovel-card {
    border-radius: 0;
    margin: 10px 0;
  }
  .imovel-img img {
    min-height: 120px;
  }
  .imovel-info {
    padding: 12px 6px;
  }
  .imovel-preco {
    font-size: 1.2rem;
  }
  .imovel-contato {
    width: 100%;
    align-self: stretch;
    padding: 12px 0;
    font-size: 1rem;
  }
}
</style>
