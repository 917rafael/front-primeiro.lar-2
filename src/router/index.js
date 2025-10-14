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
  ],
})

export default router
