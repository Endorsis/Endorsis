import { createRouter, createWebHashHistory } from 'vue-router';

import HomeView from './views/HomeView.vue';
import LoginView from './views/LoginView.vue';

const router = createRouter({
  strict: true,
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: `/`,
      component: HomeView,
    },
    {
      path: `/login`,
      component: LoginView,
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
      path: '/join_event',
      component: () => import('./views/JoinEventView.vue'),
      name: 'joinEvent',
    },
    {
      path: '/new_event',
      component: () => import('./views/CreateEventView.vue'),
      name: 'createEvent',
    },
  ],
});

export default router;
