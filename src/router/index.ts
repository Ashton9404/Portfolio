import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView, // eagerly bundled: it is what every visitor sees first
    },
    {
      path: '/projects/:slug',
      name: 'project',
      component: () => import('@/views/ProjectDetailView.vue'),
      props: true,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],

  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition

    /*
      No `top` offset here on purpose — each section carries `scroll-mt-20`, so
      the sticky header clearance is defined once in CSS rather than being
      duplicated as a magic number in the router.
    */
    if (to.hash) return { el: to.hash, behavior: 'smooth' }

    return { top: 0 }
  },
})
