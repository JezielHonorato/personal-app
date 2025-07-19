import { createRouter, createWebHistory } from 'vue-router';
import { BibliotecaRoutes } from '@/features/livros/router';
import Home from '@/components/Home.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    ...BibliotecaRoutes,
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
