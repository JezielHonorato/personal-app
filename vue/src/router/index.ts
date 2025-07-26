import { createRouter, createWebHistory } from 'vue-router';
import { LivrosRoutes } from '@/features/livros/router';
import Home from '@/components/Home.vue';
import TextEditor from '@/components/TextEditor.vue';
import JsonSorter from '@/components/JsonSorter.vue';

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
    {
        path: '/json',
        name: 'JsonSorter',
        component: JsonSorter,
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
