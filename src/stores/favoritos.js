import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFavoritosStore = defineStore('favoritos', () => {
  // Funções para persistência no localStorage
  const loadFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem('primeiro-lar-favoritos')
      return saved ? JSON.parse(saved) : []
    } catch (error) {
      console.error('Erro ao carregar favoritos do localStorage:', error)
      return []
    }
  }

  const saveToLocalStorage = (favoritosArray) => {
    try {
      localStorage.setItem('primeiro-lar-favoritos', JSON.stringify(favoritosArray))
    } catch (error) {
      console.error('Erro ao salvar favoritos no localStorage:', error)
    }
  }

  // Estado reativo dos favoritos (carrega do localStorage)
  const favoritos = ref(loadFromLocalStorage())

  // Dados mockados dos imóveis
  const imoveis = ref([
    {
      id: 1,
      titulo: 'Casa moderna em Vila Bela',
      endereco: 'Rua Gradau, 100 - Vila Bela, São Paulo/SP',
      preco: 'R$ 589.000',
      condominio: 'R$ 100',
      area: '165m²',
      quartos: 3,
      banheiros: 4,
      vagas: 2,
      imagem:'src/assets/img/Casa-moderna-9.jpg' ,
      Dimagem:'https://sketchfab.com/models/ab698b84c9c2419fbf15364fe6a43053/embed',
      tipo: 'Casa',
      descricao: 'Essa casa é legal! Com arquitetura moderna, ambientes amplos e ótima iluminação natural.',
      caracteristicas: ['Piscina', 'Churrasqueira', 'Garagem', 'Jardim']
    },
    {
      id: 2,
      titulo: 'Apartamento no Centro',
      endereco: 'Av. Paulista, 1500 - Bela Vista, São Paulo/SP',
      preco: 'R$ 450.000',
      condominio: 'R$ 350',
      area: '85m²',
      quartos: 2,
      banheiros: 2,
      vagas: 1,
      imagem: 'src/assets/img/aparatmento.jpg',
       Dimagem:'https://sketchfab.com/models/cb7e16179949431ea74e75a22bfd8002/embed',
      tipo: 'Apartamento',
      descricao: 'Apartamento moderno com vista panorâmica da cidade.',
      caracteristicas: ['Varanda', 'Academia', 'Portaria 24h', 'Elevador']
    },
    {
      id: 3,
      titulo: 'Loft Moderno Vila Madalena',
      endereco: 'Rua Harmonia, 789 - Vila Madalena, São Paulo/SP',
      preco: 'R$ 380.000',
      condominio: 'R$ 200',
      area: '55m²',
      quartos: 1,
      banheiros: 1,
      vagas: 1,
      imagem: '/src/assets/img/image.png',
       Dimagem:'https://sketchfab.com/models/8059c23f509c47a1815d7341915f8ab6/embed',
      tipo: 'Loft',
      descricao: 'Loft moderno em região boêmia com excelente vida noturna.',
      caracteristicas: ['Mobiliado', 'Pet Friendly', 'Coworking', 'Bike Space']
    }
  ])

  // Função para verificar se um imóvel está nos favoritos
  const isFavorito = (imovelId) => {
    return favoritos.value.includes(imovelId)
  }

  // Computed para obter lista de imóveis favoritos
  const imoveisFavoritos = computed(() => {
    return imoveis.value.filter(imovel => favoritos.value.includes(imovel.id))
  })

  // Função para adicionar aos favoritos
  const adicionarFavorito = (imovelId) => {
    if (!favoritos.value.includes(imovelId)) {
      favoritos.value.push(imovelId)
      saveToLocalStorage(favoritos.value)
      console.log(`Imóvel ${imovelId} adicionado aos favoritos`)
    }
  }

  // Função para remover dos favoritos
  const removerFavorito = (imovelId) => {
    const index = favoritos.value.indexOf(imovelId)
    if (index > -1) {
      favoritos.value.splice(index, 1)
      saveToLocalStorage(favoritos.value)
      console.log(`Imóvel ${imovelId} removido dos favoritos`)
    }
  }

  // Função para alternar favorito
  const toggleFavorito = (imovelId) => {
    console.log(`Toggling favorito para imóvel ${imovelId}`)
    console.log(`Estado atual: ${isFavorito(imovelId) ? 'favorito' : 'não favorito'}`)
    
    if (isFavorito(imovelId)) {
      removerFavorito(imovelId)
    } else {
      adicionarFavorito(imovelId)
    }
  }

  // Função para obter dados de um imóvel específico
  const getImovel = (imovelId) => {
    return imoveis.value.find(imovel => imovel.id === imovelId)
  }

  // Função para obter todos os imóveis
  const getTodosImoveis = () => {
    return imoveis.value
  }

  return {
    favoritos,
    imoveis,
    isFavorito,
    imoveisFavoritos,
    adicionarFavorito,
    removerFavorito,
    toggleFavorito,
    getImovel,
    getTodosImoveis
  }
})
