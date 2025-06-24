import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import Livros from '@/components/Livros.vue';
import LivrosCadastro from '@/components/LivrosCadastro.vue';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/livros', name: 'Livros', component: Livros },
    { path: '/livros/cadastro', name: 'LivrosCadastro', component: LivrosCadastro },
    { path: '/:catchAll(.*)', name: 'not-found', component: Home },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
