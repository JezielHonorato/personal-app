/*
import { ref } from 'vue';
import { api } from '@/services/';
import type { ConteudoLivro } from '@/features/biblioteca/types';

export function useLivroVisualizador() {
    const data = ref<ConteudoLivro | null>(null);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    const fetchConteudo = async (id: number) => {
        isLoading.value = true;
        error.value = null;
        data.value = null;
        try {
            const response = await api.livros.getConteudo(id);
            data.value = response.data;
            console.log(data.value);
        } catch (err: any) {
            error.value = err.message || 'Falha ao carregar conteúdo do livro.';
            console.error(err);
        } finally {
            isLoading.value = false;
        }
    };

    return { data, isLoading, error, fetchConteudo };
}
*/