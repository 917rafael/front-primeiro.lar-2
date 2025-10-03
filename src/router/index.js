import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue'),
    },
     {
      path: '/cadastro',
      name: 'Cadastro',
      component: () => import('../views/CadastroUsuario.vue'),
    },
  ],
})

export default router
