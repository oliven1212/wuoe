import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('@/views/CreateTodoView.vue')
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('@/views/TodoListView.vue')
    },
  ],
})

export default router
