import type { RouteRecordRaw } from 'vue-router';

import Livros from './components/Livros.vue';
import LivrosCadastro from './components/LivrosCadastro.vue';

export const LivrosRoutes: RouteRecordRaw[] = [
    {
        path: '/livros',
        name: 'Livros',
        component: Livros,
    },
    {
        path: '/livros/cadastro',
        name: 'LivrosCadastro',
        component: LivrosCadastro,
    },
    {
        path: '/livros/editar/:id',
        name: 'LivrosEditar',
        component: LivrosCadastro,
        props: true,
    },
];
