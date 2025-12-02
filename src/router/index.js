import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue'),
    // },
    //  {
    //   path: '/login',
    //   name: 'login',
    //   component: () => import('../components/LoginECadastro/LoginDoCliente.vue'),
    //  },
    //   {
    //   path: '/cadastro',
    //   name: 'Cadastro',
    //   component: () => import('../components/LoginECadastro/CadastroUsuario.vue'),
     },
     {
      path: '/LoginCadastro',
      name: 'login',
      component: () => import('../views/LoginCadastro.vue'),
     },
    {
      path: '/vendas',
      name: 'vendas',
      component: () => import('../views/PagVendas.vue'),
     },
     {
      path: '/anuncie',
      name: 'Anuncie',
      component: () => import('../views/PaginaAnuncie.vue'),
     },
     {
      path: '/favoritos',
      name: 'Favoritos',
      component: () => import('../views/PaginaFavorito.vue'),
     },
     {
      path: '/perfil',
      name: 'Perfil',
      component: () => import('../views/PerfilUsu.vue'),
     },

    // Removido rota para DescricaoDoImovel.vue pois o arquivo não existe
    // {
    //   path: '/teste',
    //   name: 'teste',
    //   component: () => import('../views/DescricaoDoImovel.vue'),
    // },



  ],
})

export default router
