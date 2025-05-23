import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import CreateView from '../views/CreateView.vue'
import RegisterView from '@/views/RegisterView.vue'
import EventsView from '@/views/NotesView.vue'
import NotesView from '@/views/NotesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import('../views/AboutView.vue')
      component: AboutView
    },
    {
      path: '/create',
      name: 'create',
      component: CreateView
    },
    {
      path:"/register",
      name:"register",
      component:RegisterView
    },
    {
      path:"/notes",
      name:"notes",
      component:NotesView
    }
  ]
})

export default router
