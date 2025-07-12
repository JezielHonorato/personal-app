import type { RouteRecordRaw } from 'vue-router';

import GenerosCadastro from './components/GenerosCadastro.vue';

export const GenerosRoutes: RouteRecordRaw[] = [
    {
        path: '/generos/cadastro',
        name: 'GenerosCadastro',
        component: GenerosCadastro,
    },
    {
        path: '/generos/editar/:id',
        name: 'GenerosEditar',
        component: GenerosCadastro,
        props: true,
    },
];
