<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm transition-opacity duration-300" @click.self="emit('close')">
        <div class="relative flex flex-col w-11/12 max-w-4xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl m-4 transition-transform duration-300 transform hover:scale-[1.01]">
            <header class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 shrink-0">
                <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 truncate">
                    <span :title="livro.titulo">{{ livro.titulo }}</span>
                    <span v-if="livro.autor" class="text-base font-medium text-gray-500 dark:text-gray-400"> - {{ livro.autor.nome }} </span>
                </h3>
                <button @click="emit('close')" class="p-2 text-gray-500 rounded-full hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="Fechar">
                    <X class="w-6 h-6" />
                </button>
            </header>

            <main class="flex-grow p-6 overflow-auto">
                <div v-if="isLoading" class="text-center">Carregando conteúdo...</div>
                <div v-else-if="error" class="text-center text-red-500">
                    <p>Ocorreu um erro:</p>
                    <p>{{ error }}</p>
                </div>
                <div v-else-if="data">
                    <pre v-if="data.type === 'txt'" class="w-full h-full p-4 text-sm whitespace-pre-wrap break-words bg-gray-100 rounded-md dark:bg-gray-900 font-mono">{{ data.content }}</pre>
                    <div v-if="data.type === 'md'" v-html="data.content_html" class="prose prose-indigo dark:prose-invert max-w-none"></div>
                    <div v-if="data.type === 'pdf'" class="w-full h-[70vh]">
                        <iframe :src="data.url" class="w-full h-full border-0 rounded-md" title="Visualizador de PDF"></iframe>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { watch } from 'vue';
    import { useLivroVisualizador } from '@/composables/useLivroVisualizador';
    import { X } from 'lucide-vue-next';
    import type { Livro } from '@/types';

    const props = defineProps<{
        livro: Livro;
    }>();

    const emit = defineEmits(['close']);

    const { data, isLoading, error, fetchConteudo } = useLivroVisualizador();

    watch(
        () => props.livro,
        (novoLivro) => {
            if (novoLivro && novoLivro.id) {
                fetchConteudo(novoLivro.id);
            }
        },
        { immediate: true, deep: true }
    );
</script>

<style>
    .prose {
        max-width: 100%;
        line-height: 1.7;
    }

    .prose img {
        border-radius: 0.5rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        margin: 1rem auto;
    }

    .prose a {
        color: #2563eb;
        text-decoration: underline;
        transition: color 0.3s;
    }

    .prose a:hover {
        color: #1d4ed8;
    }

    .prose blockquote {
        border-left: 4px solid #6366f1;
        padding-left: 1rem;
        color: #374151;
        background: #f3f4f6;
        border-radius: 0.25rem;
    }

    .dark .prose-invert blockquote {
        background: #374151;
        color: #f3f4f6;
    }

    .prose code {
        background-color: #f3f4f6;
        padding: 0.2rem 0.4rem;
        border-radius: 0.25rem;
        font-size: 0.9em;
    }

    .dark .prose-invert code {
        background-color: #1f2937;
    }

    .prose pre {
        background-color: #1f2937;
        color: #f3f4f6;
        padding: 1rem;
        border-radius: 0.5rem;
        overflow-x: auto;
    }

    .prose table {
        width: 100%;
        border-collapse: collapse;
    }

    .prose th,
    .prose td {
        border: 1px solid #d1d5db;
        padding: 0.5rem;
    }

    .dark .prose-invert th,
    .dark .prose-invert td {
        border-color: #4b5563;
    }
    .prose h1 {
        font-size: 2rem;
        font-weight: 700;
        color:#1e3a8a;
        margin-top: 1.5rem;
        margin-bottom: 0.75rem;
        line-height: 1.2;
        border-bottom: 2px solid #c7d2fe;
        padding-bottom: 0.3rem;
    }

    .prose h2 {
        font-size: 1.5rem;
        font-weight: 600;
        color: #1e40af;
        margin-top: 1.2rem;
        margin-bottom: 0.5rem;
        line-height: 1.3;
        border-left: 4px solid #93c5fd;
        padding-left: 0.5rem;
    }

    .prose h3 {
        font-size: 1.25rem;
        font-weight: 600;
        color: #1d4ed8;
        margin-top: 1rem;
        margin-bottom: 0.5rem;
        line-height: 1.4;
    }

    .dark .prose-invert h1 {
        color: #bfdbfe;
        border-bottom: 2px solid #3b82f6;
    }

    .dark .prose-invert h2 {
        color: #93c5fd;
        border-left: 4px solid #60a5fa;
    }

    .dark .prose-invert h3 {
        color: #60a5fa;
    }
</style>
