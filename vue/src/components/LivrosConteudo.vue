<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-opacity-75 backdrop-blur-sm" @click.self="emit('close')">
        <div class="relative flex flex-col w-11/12 max-w-5xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl m-4">
            <header class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 shrink-0">
                <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 truncate">
                    <span :title="livro.titulo">{{ livro.titulo }}</span>
                    <span v-if="livro.autor" class="text-base font-medium text-gray-500 dark:text-gray-400"> - {{ livro.autor.nome }} </span>
                </h3>
                <button @click="emit('close')" class="p-2 text-gray-500 rounded-full hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="Fechar">
                    <X class="w-6 h-6" />
                </button>
            </header>

            <section v-if="data && (data.type === 'txt' || data.type === 'md')" class="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 shrink-0">
                <div class="flex flex-col">
                    <label for="fontSize" class="text-xs font-medium text-gray-600 dark:text-gray-400">Tam. Fonte: {{ fontSize }}</label>
                    <input id="fontSize" type="range" min="12" max="32" step="1" v-model="fontSize" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                </div>

                <div class="flex flex-col">
                    <label for="lineHeight" class="text-xs font-medium text-gray-600 dark:text-gray-400">Espaçamento: {{ lineHeight }}</label>
                    <input id="lineHeight" type="range" min="1.2" max="2.5" step="0.1" v-model="lineHeight" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                </div>

                <div class="flex items-center gap-2">
                    <label for="textColor" class="text-xs font-medium text-gray-600 dark:text-gray-400">Cor do Texto</label>
                    <input id="textColor" type="color" v-model="textColor" class="w-8 h-8 p-0 bg-transparent border-none cursor-pointer" />
                </div>

                <div class="flex items-center gap-2">
                    <label for="backgroundColor" class="text-xs font-medium text-gray-600 dark:text-gray-400">Cor do Fundo</label>
                    <input id="backgroundColor" type="color" v-model="backgroundColor" class="w-8 h-8 p-0 bg-transparent border-none cursor-pointer" />
                </div>
            </section>

            <main class="flex-grow overflow-auto">
                <div v-if="isLoading" class="text-center p-6">Carregando conteúdo...</div>
                <div v-else-if="error" class="text-center text-red-500 p-6">
                    <p>Ocorreu um erro:</p>
                    <p>{{ error }}</p>
                </div>
                <div v-else-if="data" class="h-full">
                    <pre v-if="data.type === 'txt'" :style="contentStyle" class="w-full h-full text-justify p-6 whitespace-pre-wrap break-words font-mono">{{ data.content }}</pre>

                    <div v-if="data.type === 'md'" v-html="data.content_html" :style="contentStyle" class="prose text-justify dark:prose-invert max-w-none p-6"></div>

                    <div v-if="data.type === 'pdf'" class="w-full h-[80vh]">
                        <iframe :src="data.url" class="w-full h-full border-0" title="Visualizador de PDF"></iframe>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed, watch } from 'vue';
    import { useLivroVisualizador } from '@/composables/useLivroVisualizador';
    import { X } from 'lucide-vue-next';
    import type { Livro } from '@/types';

    const props = defineProps<{
        livro: Livro;
    }>();

    const emit = defineEmits(['close']);

    const { data, isLoading, error, fetchConteudo } = useLivroVisualizador();

    const isDarkMode = ref(document.documentElement.classList.contains('dark'));

    const fontSize = ref(16);
    const lineHeight = ref(1.7);
    const backgroundColor = ref(isDarkMode.value ? '#111827' : '#FFFFFF');
    const textColor = ref(isDarkMode.value ? '#F3F4F6' : '#1F2937');

    const contentStyle = computed(() => ({
        fontSize: `${fontSize.value}px`,
        lineHeight: lineHeight.value,
        backgroundColor: backgroundColor.value,
        color: textColor.value,
        '--tw-prose-body': textColor.value,
        '--tw-prose-headings': textColor.value,
        '--tw-prose-bold': textColor.value,
        '--tw-prose-invert-body': textColor.value,
        '--tw-prose-invert-headings': textColor.value,
        '--tw-prose-invert-bold': textColor.value,
    }));

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
    input[type='color'] {
        border: none;
        width: 32px;
        height: 32px;
    }
    input[type='color']::-webkit-color-swatch-wrapper {
        padding: 0;
    }
    input[type='color']::-webkit-color-swatch {
        border: 1px solid #d1d5db;
        border-radius: 50%;
    }

    .dark input[type='color']::-webkit-color-swatch {
        border-color: #4b5563;
    }

    input[type='range']::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 16px;
        height: 16px;
        background: #4f46e5;
        cursor: pointer;
        border-radius: 50%;
    }

    input[type='range']::-moz-range-thumb {
        width: 16px;
        height: 16px;
        background: #4f46e5;
        cursor: pointer;
        border-radius: 50%;
    }
    html {
        scroll-behavior: smooth;
    }
</style>
