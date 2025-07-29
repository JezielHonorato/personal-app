<template>
    <div class="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
        <div class="container mx-auto p-4">
            <header class="flex justify-between items-center mb-6">
                <h1 class="text-4xl font-bold text-indigo-700 dark:text-indigo-300">Minha Biblioteca Pessoal</h1>
            </header>

            <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
                <LivroPesquisa @pesquisa="aplicarFiltros" :anoMin="anoMin" :anoMax="anoMax" />
            </div>

            <div class="flex justify-center mb-12 mt-8">
                <RouterLink to="/livros/cadastro" class="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out transform hover:-translate-y-0.5 dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:ring-blue-400">
                    <Plus class="h-5 w-5 mr-2" />
                    Cadastrar Novo Livro
                </RouterLink>
            </div>

            <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <LivroResultado :livros="livrosFiltrados" @livroApagado="getLivros" @visualizarLivro="abrirVisualizador" />
                <div v-if="carregando" class="text-center text-gray-600 dark:text-gray-400 py-4">Carregando livros...</div>
                <div v-if="erro[0]" class="text-center text-red-500 py-4">Erro ao carregar livros: {{ erro }}</div>
            </div>
        </div>

        <LivroConteudo v-if="livroParaVisualizar" :livro="livroParaVisualizar" @close="fecharVisualizador" />
    </div>
</template>

<script lang="ts" setup>
    import { ref, onMounted, computed } from 'vue';
    import { Plus } from 'lucide-vue-next';
    import { LivroConteudo, LivroPesquisa, LivroResultado } from '../components';
    import { useLivro } from '../composables';
    import type { Livro } from '../models';

    const { livros, livrosFiltrados, carregando, erro, getLivros, aplicarFiltros } = useLivro();

    const livroParaVisualizar = ref<Livro | null>(null);

    function abrirVisualizador(id: number): void {
        livroParaVisualizar.value = livros.value.find((livro) => livro.id === id) || null;
    }

    function fecharVisualizador(): void {
        livroParaVisualizar.value = null;
    }

    const anoMin = computed(() => {
        if (!livros.value || livros.value.length === 0) return 0;
        return Math.min(...livros.value.map((l) => l.ano_publicacao ?? Infinity));
    });

    const anoMax = computed(() => {
        if (!livros.value || livros.value.length === 0) return new Date().getFullYear();
        return Math.max(...livros.value.map((l) => l.ano_publicacao ?? -Infinity));
    });

    onMounted(() => {
        getLivros();
    });
</script>
