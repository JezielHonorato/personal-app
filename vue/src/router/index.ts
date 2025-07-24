import { createRouter, createWebHistory } from 'vue-router';
import { LivrosRoutes } from '@/features/livros/router';
import Home from '@/components/Home.vue';
import TextEditor from '@/components/TextEditor.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/texto',
        name: 'TextEditor',
        component: TextEditor,
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
