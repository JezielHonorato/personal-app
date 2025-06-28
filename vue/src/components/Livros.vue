<template>
    <div class="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
        <div class="container mx-auto p-4">
            <header class="flex justify-between items-center mb-6">
                <h1 class="text-4xl font-bold text-indigo-700 dark:text-indigo-300">Minha Biblioteca Pessoal</h1>
            </header>

            <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
                <LivrosPesquisa @pesquisa="pesquisarLivros" />
            </div>

            <div class="flex justify-center mb-12 mt-8">
                <RouterLink to="livros/cadastro" class="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out transform hover:-translate-y-0.5 dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:ring-blue-400">
                    <Plus class="h-5 w-5 mr-2" />
                    Cadastrar Novo Livro
                </RouterLink>
            </div>

            <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <LivrosResultado :livros="livros" @livroApagado="removerLivro" @visualizarLivro="abrirVisualizador" />
                <div v-if="carregandoLivros" class="text-center text-gray-600 dark:text-gray-400 py-4">Carregando livros...</div>
                <div v-if="errorLivros" class="text-center text-red-500 py-4">Erro ao carregar livros: {{ errorLivros }}</div>
            </div>
        </div>

        <LivrosConteudo v-if="livroParaVisualizar" :livro="livroParaVisualizar" @close="fecharVisualizador" />
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import { Plus } from 'lucide-vue-next';
    import LivrosPesquisa from '@/components/LivrosPesquisa.vue';
    import LivrosResultado from '@/components/LivrosResultado.vue';
    import LivrosConteudo from '@/components/LivrosConteudo.vue';
    import { useLivros } from '@/composables/useDatabaseLivros';
    import type { Livro } from '@/types';

    const { livros, carregandoLivros, errorLivros, filtroNome, filtroGenero, filtroPais, filtroAnoInicial, filtroAnoFinal } = useLivros();

    const livroParaVisualizar = ref<Livro | null>(null);

    const abrirVisualizador = (id: number) => {
        livroParaVisualizar.value = livros.value.find((l) => l.id === id) || null;
    };
    const fecharVisualizador = () => {
        livroParaVisualizar.value = null;
    };

    const pesquisarLivros = ({ nome, genero, pais, anoInicial, anoFinal }: { nome: string; genero: number | null; pais: number | null; anoInicial: number | null; anoFinal: number | null }) => {
        filtroNome.value = nome;
        filtroGenero.value = genero;
        filtroPais.value = pais;
        filtroAnoInicial.value = anoInicial;
        filtroAnoFinal.value = anoFinal;
    };
    const removerLivro = (id: number) => {
        livros.value = livros.value.filter((l) => l.id !== id);
    };
</script>
