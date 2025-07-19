import type { RouteRecordRaw } from 'vue-router';

import { Livro, LivroCadastro, AutorCadastro, GeneroCadastro, PaisCadastro } from './components';

export const BibliotecaRoutes: RouteRecordRaw[] = [
    {
        path: '/livros',
        name: 'Livros',
        component: Livro,
    },
    {
        path: '/autores/cadastro/:id([1-9]\\d*)?',
        name: 'AutorCadastro',
        component: AutorCadastro,
        props: true,
    },
    {
        path: '/livros/cadastro/:id([1-9]\\d*)?',
        name: 'LivroCadastro',
        component: LivroCadastro,
        props: true,
    },
    {
        path: '/generos/cadastro/:id([1-9]\\d*)?',
        name: 'GeneroCadastro',
        component: GeneroCadastro,
        props: true,
    },
    {
        path: '/paises/cadastro/:id([1-9]\\d*)?',
        name: 'PaisCadastro',
        component: PaisCadastro,
        props: true,
    },
];
