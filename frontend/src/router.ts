import { createRouter, createWebHashHistory } from 'vue-router';

import HomeView from './views/HomeView.vue';
import LoginView from './views/LoginView.vue';
import { useEthereumStore } from './stores/ethereum';

const router = createRouter({
  strict: true,
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: `/`,
      component: HomeView,
      // meta: { requiresAuth: true },
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
      meta: { requiresAuth: true },
    },
    {
      path: '/join_event',
      component: () => import('./views/JoinEventView.vue'),
      name: 'joinEvent',
      meta: { requiresAuth: true },
    },
    {
      path: '/new_event',
      component: () => import('./views/CreateEventView.vue'),
      name: 'createEvent',
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const eth = useEthereumStore();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !eth.address) {
    next('/login');
  } else {
    next();
  }
});

export default router;