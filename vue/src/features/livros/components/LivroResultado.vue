<template>
    <div>
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Resultados da Pesquisa</h2>
        <div v-if="!livros || livros.length === 0" class="text-center text-gray-600 dark:text-gray-400 py-8">Nenhum livro encontrado com os critérios de pesquisa.</div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div v-for="livro in livros" :key="livro.id" class="relative group bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-600 transition-transform duration-200 hover:scale-[1.02]">
                <div class="w-full max-w-xs mx-auto mb-4 aspect-[2/3]">
                    <img v-if="livro.capa" :src="livro.capa" alt="Capa do livro" class="w-full h-full object-cover rounded-md bg-gray-200 dark:bg-gray-600" />
                    <div v-else class="w-full h-full flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-md text-center p-4">
                        <BookOpenText class="w-16 h-16 text-gray-400 dark:text-gray-500 mb-2" />
                        <span class="text-lg font-bold text-gray-500 dark:text-gray-400 truncate">{{ livro.titulo }}</span>
                    </div>
                </div>
                <h3 class="text-xl font-bold text-indigo-700 dark:text-indigo-300 mb-2 truncate" :title="livro.titulo">{{ livro.titulo }}</h3>

                <p class="text-gray-700 dark:text-gray-300 mb-1"><strong>Autor:</strong> {{ livro.autor?.nome || 'Desconhecido' }}</p>
                <p class="text-gray-600 dark:text-gray-400 mb-1"><strong>Gênero:</strong> {{ livro.genero?.nome || 'Desconhecido' }}</p>
                <p class="text-gray-600 dark:text-gray-400 mb-1"><strong>País:</strong> {{ livro.autor?.pais?.nome || 'Desconhecido' }}</p>
                <p class="text-gray-600 dark:text-gray-400"><strong>Ano:</strong> {{ livro.ano_publicacao || 'Desconhecido' }}</p>

                <div class="absolute top-4 right-4 flex flex-col gap-2">
                    <button @click="editarLivro(livro.id)" title="Editar Livro" class="bg-blue-600 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <Pencil class="w-4 h-4" />
                    </button>
                    <button v-if="livro.arquivo" @click="$emit('visualizarLivro', livro.id)" title="Abrir Arquivo" class="bg-green-600 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-green-500">
                        <FileText class="w-4 h-4" />
                    </button>
                    <button @click="apagarLivro(livro.id)" title="Apagar Livro" class="bg-red-600 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500">
                        <Trash2 class="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { defineProps } from 'vue';
    import { BookOpenText, FileText, Pencil, Trash2 } from 'lucide-vue-next';
    import { useRouter } from 'vue-router';
    import { useLivro } from '../composables';
    import type { Livro } from '../models';

    defineProps<{
        livros: Livro[] | null;
    }>();

    const emit = defineEmits(['livroApagado', 'visualizarLivro']);

    const router = useRouter();
    const { getLivros, deleteLivro } = useLivro();

    function editarLivro(id: number): void {
        router.push(`/livros/cadastro/${id}`);
    }

    async function apagarLivro(id: number) {
        if (!window.confirm('Tem certeza que deseja apagar este livro? Esta ação não pode ser desfeita.')) {
            return;
        }

        try {
            await deleteLivro(id);
            await getLivros();
            router.go(0);
        } catch (error) {
            console.error('Falha ao apagar o livro:', error);
        }
    }
</script>
