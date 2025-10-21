<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import imagem from '@/assets/img/image.png'

const imoveis = [
  {
    id: 1,
    titulo: 'Casa moderna em Vila Bela',
    endereco: 'Rua Gradau, 100 - Vila Bela, São Paulo/SP',
    area: 165,
    quartos: 3,
    banheiros: 4,
    vagas: 2,
    preco: 589000,
    condominio: 100,
    imagem: imagem,
    descricao: `Essa casa é legal! Com arquitetura moderna, ambientes amplos e ótima iluminação natural, ela oferece conforto e praticidade para toda a família. Localizada em um bairro tranquilo, próxima a escolas, mercados e áreas de lazer, é perfeita para quem busca qualidade de vida. Venha conhecer e se encantar com cada detalhe deste imóvel exclusivo!`
  }
]

const route = useRoute()
const imovel = imoveis.find(i => i.id === Number(route.params.id))

const nome = ref('')
const email = ref('')
const telefone = ref('')
const mensagem = ref('')
const mensagemEnviada = ref(false)
let timeoutId = null

function enviarMensagem() {
  mensagemEnviada.value = true
  nome.value = ''
  email.value = ''
  telefone.value = ''
  mensagem.value = ''
  if (timeoutId) clearTimeout(timeoutId)
  timeoutId = setTimeout(() => {
    mensagemEnviada.value = false
  }, 2500)
}
</script>

<template>
  <div class="imovel-detalhe-container">
    <div class="imovel-main">
      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        Home &gt; Brasil &gt; PE &gt; Recife &gt; Boa Viagem &gt; Rua Mamanguape
      </nav>
      <!-- Imagem principal -->
      <div class="galeria">
        <div class="galeria-principal">
          <img :src="imovel.imagem" alt="Imagem do imóvel" />
        </div>
      </div>
      <!-- Informações principais -->
      <div class="imovel-info-topo">
        <div class="imovel-preco-bloco">
          <div class="preco">R$ {{ imovel.preco.toLocaleString() }}</div>
          <div class="preco-detalhes">Condomínio R$ {{ imovel.condominio }} &nbsp;·&nbsp; IPTU R$ --</div>
        </div>
        <div class="imovel-mapa">
          <span class="mapa-icone">📍</span>
          <span>{{ imovel.endereco }}</span>
        </div>
      </div>
      <!-- Detalhes -->
      <div class="imovel-dados-lista">
        <div class="dado-item"><span class="dado-ico">🏠</span> {{ imovel.area }}m²</div>
        <div class="dado-item"><span class="dado-ico">🛏️</span> {{ imovel.quartos }} quartos</div>
        <div class="dado-item"><span class="dado-ico">🛁</span> {{ imovel.banheiros }} banheiros</div>
        <div class="dado-item"><span class="dado-ico">🚗</span> {{ imovel.vagas }} vagas</div>
      </div>
      <!-- Descrição do imóvel -->
      <div class="imovel-descricao">
        <h4>Descrição</h4>
        <p>{{ imovel.descricao }}</p>
      </div>
    </div>
    <!-- Card lateral de contato -->
    <aside class="imovel-contato">
      <h3>Fale com o anunciante</h3>
      <template v-if="!mensagemEnviada">
        <button class="btn-contato">Mensagem</button>
        <button class="btn-contato btn-agendar">Agendar visita</button>
        <input class="input-contato" placeholder="Digite seu nome" v-model="nome" />
        <input class="input-contato" placeholder="Digite seu email" v-model="email" />
        <input class="input-contato" placeholder="Digite seu telefone" v-model="telefone" />
        <textarea class="input-contato" placeholder="Mensagem" v-model="mensagem"></textarea>
        <button class="btn-enviar" @click="enviarMensagem">Enviar</button>
      </template>
      <template v-else>
        <div class="mensagem-sucesso">Mensagem enviada com sucesso!</div>
      </template>
    </aside>
  </div>
</template>

<style scoped>
.imovel-detalhe-container {
  display: flex;
  gap: 2.5rem;
  max-width: 1200px;
  margin: 2rem auto;
  align-items: flex-start;
}
.imovel-main {
  flex: 2;
}
.breadcrumb {
  color: #888;
  font-size: 0.98rem;
  margin-bottom: 1.2rem;
}
.galeria {
  display: flex;
  gap: 1.2rem;
  margin-bottom: 1.5rem;
}
.galeria-principal {
  flex: 2;
  background: #f7f7f7;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 340px;
  max-height: 420px;
}
.galeria-principal img {
  width: 100%;
  max-width: 520px;
  max-height: 420px;
  object-fit: cover;
  border-radius: 12px;
}
.imovel-info-topo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.2rem;
  gap: 2rem;
}
.imovel-preco-bloco {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.preco {
  font-size: 2.1rem;
  font-weight: 700;
  color: #e30613;
}
.preco-detalhes {
  color: #888;
  font-size: 1.08rem;
}
.btn-parcelas {
  background: #e30613;
  color: #fff;
  border: none;
  border-radius: 7px;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  font-weight: 500;
  margin-top: 0.5rem;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-parcelas:hover {
  background: #b9000e;
}
.imovel-mapa {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f4f4f4;
  border-radius: 8px;
  padding: 0.7rem 1.2rem;
  font-size: 1.08rem;
}
.imovel-dados-lista {
  display: flex;
  gap: 2.5rem;
  margin-bottom: 2rem;
  font-size: 1.15rem;
  color: #444;
}
.dado-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.dado-ico {
  font-size: 1.3rem;
}
.imovel-descricao {
  font-size: 1rem;
  color: #333;
  background: #f9f9f9;
  border-radius: 8px;
  padding: 1.2rem;
  margin-bottom: 2rem;
  line-height: 1.4;
}
.imovel-contato {
  flex: 1;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.07);
  padding: 2rem 1.5rem;
  min-width: 320px;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: stretch;
}
.imovel-contato h3 {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.7rem;
}
.btn-contato {
  background: #fff;
  color: #e30613;
  border: 1.5px solid #e30613;
  border-radius: 7px;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.btn-contato.btn-agendar {
  color: #222;
  border: 1.5px solid #bbb;
  margin-bottom: 1rem;
}
.btn-contato:hover {
  background: #e30613;
  color: #fff;
}
.input-contato {
  border: 1.5px solid #ddd;
  border-radius: 7px;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}
.btn-enviar {
  background: #e30613;
  color: #fff;
  border: none;
  border-radius: 7px;
  padding: 0.7rem 1.2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 0.7rem;
  transition: background 0.2s;
}
.btn-enviar:hover {
  background: #b9000e;
}
.mensagem-sucesso {
  color: #198754;
  background: #eafaf1;
  border: 1.5px solid #b6e2cd;
  border-radius: 7px;
  padding: 1.2rem 1rem;
  font-size: 1.1rem;
  text-align: center;
  margin-top: 1rem;
  font-weight: 600;
}
@media (max-width: 1100px) {
  .imovel-detalhe-container {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
  .imovel-contato {
    max-width: 100%;
    min-width: 0;
    width: 100%;
  }
}
</style>
