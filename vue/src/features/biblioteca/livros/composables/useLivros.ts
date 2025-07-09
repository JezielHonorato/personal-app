import { ref, onMounted, type Ref } from 'vue';
import type { Livro } from '../../types';
import { getLivros } from '../services/livrosService';

export function useLivros() {
    const livros: Ref<Livro[]> = ref([]);

    const carregando = ref(false);
    const erro = ref<string | null>(null);

    const fetchLivros = async () => {
        carregando.value = true;
        erro.value = null;
        try {
            const response = await getLivros();
            livros.value = response.data;
        } catch (err: any) {
            erro.value = err.message;
        } finally {
            carregando.value = false;
        }
    };

    onMounted(fetchLivros);

    return { livros, carregando, erro };
}
