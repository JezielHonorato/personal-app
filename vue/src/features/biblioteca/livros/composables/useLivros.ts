import { ref, computed } from 'vue';
import { livroService } from '../services/livroService';
import type { Livro, LivroForm, LivroFiltro } from '../models/livroModel';
import { Turtle } from 'lucide-vue-next';

export function useLivros() {
    const livros = ref<Livro[]>([]);
    const livro = ref<Livro | null>(null);
    const carregando = ref(false);
    const erro = ref<string | null>(null);

    const filtros = ref<LivroFiltro>({
        tituloAutor: '',
        generoId: null,
        paisId: null,
        lido: null,
    });

    const getLivros = async () => {
        carregando.value = true;
        erro.value = null;
        try {
            livros.value = await livroService.getAll();
        } catch (err: any) {
            erro.value = err.message || 'Ocorreu um erro ao buscar os livros.';
            console.error(err);
        } finally {
            carregando.value = false;
        }
    };

    const getLivro = async (id: number) => {
        carregando.value = true;
        erro.value = null;
        try {
            livro.value = await livroService.getById(id);
        } catch (err: any) {
            erro.value = err.message || 'Ocorreu um erro ao buscar o livro.';
            console.error(err);
        } finally {
            carregando.value = false;
        }
    };

    const createLivro = async (data: LivroForm) => {
        carregando.value = true;
        erro.value = null;
        try {
            const newLivro = await livroService.create(data);
            return newLivro;
        } catch (err: any) {
            erro.value = err.message || 'Ocorreu um erro ao criar o livro.';
            throw err;
        } finally {
            carregando.value = false;
        }
    };

    const updateLivro = async (id: number, data: LivroForm) => {
        carregando.value = true;
        erro.value = null;
        try {
            const updatedLivro = await livroService.update(id, data);
            return updatedLivro;
        } catch (err: any) {
            erro.value = err.message || 'Ocorreu um erro ao atualizar o livro.';
            throw err;
        } finally {
            carregando.value = false;
        }
    };

    const deleteLivro = async (id: number) => {
        carregando.value = true;
        erro.value = null;
        try {
            await livroService.delete(id);
        } catch (err: any) {
            erro.value = err.message || 'Ocorreu um erro ao deletar o livro.';
            throw err;
        } finally {
            carregando.value = false;
        }
    };

    const aplicarFiltros = (novosFiltros: LivroFiltro) => {
        filtros.value = { ...filtros.value, ...novosFiltros };
    };
    const livrosFiltrados = computed(() => {
        return livros.value.filter((livro) => {
            const filtro = filtros.value;
            if (!filtro) return true;

            const matchTituloAutor = filtro.tituloAutor ? livro.titulo.toLowerCase().includes(filtro.tituloAutor.toLowerCase()) || (livro.autor && livro.autor.nome.toLowerCase().includes(filtro.tituloAutor.toLowerCase())) : true;

            const matchGenero = filtro.generoId ? livro.genero?.id === filtro.generoId : true;
            const matchLido = typeof filtro.lido === 'boolean' ? livro.lido === filtro.lido : true;

            return matchTituloAutor && matchGenero && matchLido;
        });
    });

    return {
        livro,
        livros,
        carregando,
        erro,
        filtros,

        livrosFiltrados,

        getLivros,
        getLivro,
        createLivro,
        updateLivro,
        deleteLivro,
        aplicarFiltros,
    };
}
