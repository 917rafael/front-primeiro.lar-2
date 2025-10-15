<script>
export default {
  name: 'PropertyCard',
};
</script>

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

      <button class="contact-button">Contatar</button>
    </div>
  </div>
</template>

<style scoped>
.property-card {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  margin: 1.5rem 0;
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
</style>
