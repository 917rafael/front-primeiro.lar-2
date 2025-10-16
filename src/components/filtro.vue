<script setup>
import { ref } from 'vue'

const tipo = ref('')
const precoMin = ref('')
const precoMax = ref('')
const quartos = ref('')
const banheiros = ref('')
const vagas = ref('')
const cidade = ref('')

function limparFiltros() {
  tipo.value = ''
  precoMin.value = ''
  precoMax.value = ''
  quartos.value = ''
  banheiros.value = ''
  vagas.value = ''
  cidade.value = ''
}

function filtrar() {
  // Aqui você pode emitir um evento ou manipular os filtros
  // Exemplo: console.log({ tipo, precoMin, precoMax, quartos, banheiros, vagas, cidade })
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
          <label for="precoMin"><span class="icon">💰</span> Preço Mínimo</label>
          <input id="precoMin" type="number" v-model="precoMin" placeholder="Ex: 100000" min="0" />
        </div>
        <div class="input-field">
          <label for="precoMax"><span class="icon">💸</span> Preço Máximo</label>
          <input id="precoMax" type="number" v-model="precoMax" placeholder="Ex: 500000" min="0" />
        </div>
      </div>
      <div class="input-row">
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
  width: 440px;
  max-width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #f0f4ff 60%, #e0f7fa 100%);
  padding: 40px 36px 32px 36px;
  box-shadow: 8px 0 32px 0 rgba(25, 118, 210, 0.13), 0 8px 32px 0 rgba(66, 165, 245, 0.07);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  border-right: 2.5px solid #90caf9;
  font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
  box-sizing: border-box;
  overflow-y: auto;
  transition: box-shadow 0.3s, width 0.3s;
  border-top-right-radius: 32px;
  border-bottom-right-radius: 32px;
}
@media (max-width: 900px) {
  .filtro-lateral {
    width: 100vw;
    border-radius: 0 0 18px 18px;
    border-right: none;
    border-bottom: 2.5px solid #90caf9;
    top: 0;
    left: 0;
    height: auto;
    min-height: 0;
    max-height: none;
    padding: 24px 10px 16px 10px;
  }
}
.filtro-lateral h3 {
  margin-bottom: 32px;
  color: #1565c0;
  font-size: 2.1rem;
  font-weight: 900;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 14px;
  background: linear-gradient(90deg, #1565c0 60%, #26c6da 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.filtro-form {
  display: flex;
  flex-direction: column;
  gap: 28px;
}
.input-row {
  display: flex;
  gap: 18px;
  margin-bottom: 0;
}
@media (max-width: 900px) {
  .input-row {
    flex-direction: column;
    gap: 12px;
  }
}
.input-field {
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  min-width: 0;
  background: rgba(255,255,255,0.99);
  border-radius: 18px;
  box-shadow: 0 2px 16px #e3f0ff, 0 1.5px 0 #b3d1f7;
  padding: 18px 18px 10px 18px;
  margin-bottom: 0;
  border: 1.5px solid #b3e5fc;
  transition: box-shadow 0.2s, border 0.2s;
  position: relative;
}
.input-field:focus-within {
  box-shadow: 0 4px 24px #90caf9, 0 2px 0 #1565c0;
  border: 1.5px solid #1565c0;
}
.input-field label {
  font-size: 1.13rem;
  color: #1565c0;
  font-weight: 700;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  letter-spacing: 0.5px;
}
.input-field input,
.input-field select {
  padding: 16px 18px;
  border: 1.5px solid #b3e5fc;
  border-radius: 10px;
  font-size: 1.13rem;
  background: #fafdff;
  transition: border 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 4px #e3f0ff;
  width: 100%;
  min-width: 0;
  margin-bottom: 0;
  font-family: inherit;
  color: #234;
  box-sizing: border-box;
}
.input-field input:focus,
.input-field select:focus {
  border: 2px solid #26c6da;
  outline: none;
  box-shadow: 0 2px 12px #90caf9;
}
.input-field input::placeholder {
  color: #90caf9;
  opacity: 1;
  font-size: 1.01rem;
}
.input-field select {
  appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg fill="%231565c0" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 0.7em center;
  background-size: 1.2em;
  padding-right: 2.2em;
}
.icon {
  font-size: 1.25em;
  vertical-align: middle;
  filter: drop-shadow(0 1px 2px #b3d1f7);
}
.botoes-filtro {
  display: flex;
  gap: 18px;
  margin-top: 18px;
  justify-content: flex-end;
}
.btn-filtrar {
  background: linear-gradient(90deg, #1565c0 60%, #26c6da 100%);
  color: #fff;
  border: none;
  padding: 16px 38px;
  border-radius: 12px;
  font-weight: 800;
  font-size: 1.18rem;
  cursor: pointer;
  box-shadow: 0 2px 12px #90caf9;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  letter-spacing: 0.5px;
}
.btn-filtrar:hover {
  background: linear-gradient(90deg, #0d47a1 60%, #26c6da 100%);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 4px 18px #1565c0;
}
.btn-limpar {
  background: #fff;
  color: #1565c0;
  border: 1.5px solid #1565c0;
  padding: 16px 38px;
  border-radius: 12px;
  font-weight: 800;
  font-size: 1.18rem;
  cursor: pointer;
  box-shadow: 0 2px 12px #e3f0ff;
  transition: background 0.2s, color 0.2s, transform 0.2s, box-shadow 0.2s;
  letter-spacing: 0.5px;
}
.btn-limpar:hover {
  background: #e0f7fa;
  color: #0d47a1;
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 4px 18px #1565c0;
}
.filtro-lateral input[type="number"]::-webkit-inner-spin-button,
.filtro-lateral input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.filtro-lateral input[type="number"] {
  -moz-appearance: textfield;
}
</style>