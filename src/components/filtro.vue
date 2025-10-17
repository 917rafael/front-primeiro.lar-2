<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref } from 'vue'

const tipo = ref('')
const precoMin = ref('')
const precoMax = ref('')
const quartos = ref('')
const banheiros = ref('')
const vagas = ref('')
const cidade = ref('')
const metragem = ref('')

function limparFiltros() {
  tipo.value = ''
  precoMin.value = ''
  precoMax.value = ''
  quartos.value = ''
  banheiros.value = ''
  vagas.value = ''
  cidade.value = ''
  metragem.value = ''
}

function filtrar() {
  console.log({
    tipo: tipo.value,
    precoMin: precoMin.value,
    precoMax: precoMax.value,
    quartos: quartos.value,
    banheiros: banheiros.value,
    vagas: vagas.value,
    cidade: cidade.value,
    metragem: metragem.value
  })
}
</script>

<template>
  <aside class="filtro-lateral">
    <h3><span class="icon">🏠</span> Filtrar Imóveis</h3>
    <form @submit.prevent="filtrar" class="filtro-form">
      <div class="input-row">
        <div class="input-field">
          <label for="tipo"><span class="icon">🏢</span> Tipo</label>
          <select id="tipo" v-model="tipo">
            <option value="">Todos</option>
            <option>Apartamento</option>
            <option>Casa</option>
            <option>Terreno</option>
          </select>
        </div>
      </div>

      <div class="input-row">
        <div class="input-field">
          <label for="cidade"><span class="icon">📍</span> Cidade/Bairro</label>
          <input id="cidade" type="text" v-model="cidade" placeholder="Digite a cidade ou bairro" />
        </div>
      </div>

      <div class="input-row">
        <div class="input-field">
          <label for="metragem"><span class="icon">📐</span> Área (m²)</label>
          <input id="metragem" type="number" v-model="metragem" placeholder="Ex: 75" min="0" />
        </div>
      </div>

      <div class="input-row">
        <div class="input-field">
          <label for="precoMin"><span class="icon">💰</span> Preço Mínimo</label>
          <input id="precoMin" type="number" v-model="precoMin" placeholder="Ex: 100000" min="0" />
        </div>
        <div class="input-field">
          <label for="precoMax"><span class="icon">💸</span> Preço Máximo</label>
          <input id="precoMax" type="number" v-model="precoMax" placeholder="Ex: 500000" min="0" />
        </div>
      </div>

      <div class="input-row horizontal-3">
        <div class="input-field">
          <label for="quartos"><span class="icon">🛏️</span> Quartos</label>
          <input id="quartos" type="number" v-model="quartos" min="0" placeholder="Ex: 2" />
        </div>
        <div class="input-field">
          <label for="banheiros"><span class="icon">🛁</span> Banheiros</label>
          <input id="banheiros" type="number" v-model="banheiros" min="0" placeholder="Ex: 1" />
        </div>
        <div class="input-field">
          <label for="vagas"><span class="icon">🚗</span> Vagas</label>
          <input id="vagas" type="number" v-model="vagas" min="0" placeholder="Ex: 1" />
        </div>
      </div>

      <div class="botoes-filtro">
        <button class="btn-filtrar" type="submit">Filtrar</button>
        <button class="btn-limpar" type="button" @click="limparFiltros">Limpar</button>
      </div>
    </form>
  </aside>
</template>

<style scoped>
.filtro-lateral {
  position: fixed;
  top: 0;
  left: 0;
  width: 460px;
  max-width: 100vw;
  height: 100vh;
  background: linear-gradient(180deg, #ffffff 0%, #fdfdfd 100%);
  padding: 48px 36px;
  box-shadow: 6px 0 25px rgba(0, 0, 0, 0.08);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e0e0e0;
  font-family: "Segoe UI", "Roboto", Arial, sans-serif;
  box-sizing: border-box;
  overflow-y: auto;
  transition: all 0.3s ease;
  backdrop-filter: blur(6px);
}

.filtro-lateral h3 {
  margin-bottom: 32px;
  color: #222;
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: 0.3px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.filtro-lateral h3 .icon {
  font-size: 1.5rem;
  color: #007bff;
}

.filtro-form {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.input-row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.input-row.horizontal-3 {
  display: flex;
  gap: 16px;
  justify-content: space-between;
}

.input-field {
  display: flex;
  flex-direction: column;
  flex: 1 1 32%;
  min-width: 100px;
  background: #ffffff;
  border-radius: 10px;
  padding: 12px 14px;
  border: 1.5px solid #dcdcdc;
  transition: all 0.25s ease;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  box-sizing: border-box;
}

.input-field:hover {
  border-color: #c5c5c5;
  background: #fafafa;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.input-field:focus-within {
  border-color: #007bff;
  box-shadow: 0 0 10px rgba(0, 123, 255, 0.25);
  background: #fff;
}

.input-field label {
  font-size: 1rem;
  color: #333;
  font-weight: 600;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 5px;
  padding-left: 2px;
  justify-content: flex-start;
}

.input-field label .icon {
  color: #007bff;
  flex-shrink: 0;
  margin-right: 3px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.input-field input,
.input-field select {
  padding: 10px 10px 10px 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  background: #f9f9f9;
  color: #111;
  transition: all 0.3s ease;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.08);
  width: 100%;
  box-sizing: border-box;
}

.input-field input:hover,
.input-field select:hover {
  background: #f1f1f1;
}

.input-field input::placeholder {
  color: #999;
  font-size: 1rem;
  opacity: 0.9;
}

.input-field input:focus,
.input-field select:focus {
  outline: none;
  border-color: #007bff;
  background: #fff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
}

.input-field select {
  appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg fill="%23007bff" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 0.7em center;
  background-size: 0.9em;
  padding-right: 1.8em;
  cursor: pointer;
}

.botoes-filtro {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 16px;
}

.btn-filtrar {
  background: linear-gradient(135deg, #007bff 0%, #0056d2 100%);
  color: #fff;
  border: none;
  padding: 12px 26px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 3px 12px rgba(0, 123, 255, 0.3);
  letter-spacing: 0.2px;
  text-transform: uppercase;
}

.btn-filtrar:hover {
  background: linear-gradient(135deg, #0056d2 0%, #0041a8 100%);
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(0, 123, 255, 0.35);
}

.btn-limpar {
  background: #ffffff;
  color: #333;
  border: 1px solid #ccc;
  padding: 12px 26px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.2px;
  text-transform: uppercase;
}

.btn-limpar:hover {
  background: #f5f5f5;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
}

.filtro-lateral::-webkit-scrollbar {
  width: 10px;
}

.filtro-lateral::-webkit-scrollbar-track {
  background: #fafafa;
}

.filtro-lateral::-webkit-scrollbar-thumb {
  background-color: #bbb;
  border-radius: 6px;
  border: 2px solid #fafafa;
}

.filtro-lateral::-webkit-scrollbar-thumb:hover {
  background-color: #999;
}

@media (max-width: 900px) {
  .filtro-lateral {
    width: 100vw;
    height: auto;
    padding: 24px 20px;
  }

  .input-row.horizontal-3 {
    flex-wrap: wrap;
  }

  .input-field {
    flex: 1 1 45%;
    min-width: 160px;
  }

  .botoes-filtro {
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn-filtrar,
  .btn-limpar {
    min-width: 120px;
  }
}

@media (max-width: 600px) {
  .input-row {
    flex-direction: column;
  }

  .input-field {
    flex: 1 1 100%;
  }

  .input-field label {
    font-size: 0.7rem;
  }

  .input-field input,
  .input-field select {
    font-size: 0.75rem;
  }
}

.input-field input:focus::placeholder {
  opacity: 0.5;
  transition: opacity 0.3s ease;
}

.input-field {
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}

.input-field:hover {
  transform: translateY(-1px);
}

.input-field label .icon {
  transition: transform 0.25s ease, color 0.25s ease;
}

.input-field:focus-within label .icon {
  transform: rotate(-5deg);
  color: #0056d2;
}

.input-field input:disabled,
.input-field select:disabled {
  background: #f1f1f1;
  color: #999;
  cursor: not-allowed;
}

.btn-filtrar:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.btn-limpar:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

</style>