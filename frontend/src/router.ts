import { createRouter, createWebHashHistory } from 'vue-router';

import HomeView from './views/HomeView.vue';

const router = createRouter({
  strict: true,
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: `/`,
      component: HomeView,
    },
    {
      path: '/:path(.*)',
      component: () => import('./views/404View.vue'),
    },
    {
      path: '/events/:id([0-9a-fA-F]{64,64})',
      component: () => import('./views/EventView.vue'),
      props: true,
      name: 'event',
    },
    {
      path: '/events',
      component: () => import('./views/CreateEventView.vue'),
      name: 'createEvent',
    },
  ],
});

export default router;
