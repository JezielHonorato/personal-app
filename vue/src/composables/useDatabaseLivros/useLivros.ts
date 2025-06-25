import { ref, computed, watch } from 'vue';
import { api } from '@/services';
import type { Livro, LivroForm } from '@/types';
import { useList, useGet, useCreate, useUpdate, useDelete } from '@/composables/useCrud';

export function useLivros() {
    const { data: livros, carregando: carregandoLivros, error: errorLivros, fetch: fetchLivrosComFiltro } = useList<Livro>(api.livros.getAll);

    const filtroNome = ref<string>('');
    const filtroGenero = ref<number | null>(null);
    const filtroPais = ref<number | null>(null);
    const filtroAnoInicial = ref<number | null>(1800);
    const filtroAnoFinal = ref<number | null>(2025);

    const searchParams = computed(() => {
        const params: Record<string, any> = {};
        if (filtroNome.value) params.nome = filtroNome.value;
        if (filtroGenero.value) params.genero = filtroGenero.value;
        if (filtroPais.value) params.pais = filtroPais.value;
        if (filtroAnoInicial.value) params.ano_min = filtroAnoInicial.value;
        if (filtroAnoFinal.value) params.ano_max = filtroAnoFinal.value;
        return params;
    });

    watch(searchParams, () => fetchLivrosComFiltro(searchParams.value), { immediate: true });

    return {
        livros,
        carregandoLivros,
        errorLivros,
        fetchLivros: () => fetchLivrosComFiltro(searchParams.value),

        filtroNome,
        filtroGenero,
        filtroPais,
        filtroAnoInicial,
        filtroAnoFinal,

        get: useGet<Livro>(api.livros.get),
        create: useCreate<Livro, LivroForm>(api.livros.create),
        update: useUpdate<LivroForm>(api.livros.update),
        delete: useDelete(api.livros.delete),
    };
}
