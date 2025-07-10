import { createRouter, createWebHistory } from 'vue-router';
import { LivrosRoutes } from '@/features/biblioteca/livros/routes';
import Home from '@/components/Home.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    ...LivrosRoutes,
    {
        path: '/:catchAll(.*)',
        name: 'not-found',
        component: Home,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
