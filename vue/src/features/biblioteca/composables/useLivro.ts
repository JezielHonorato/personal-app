import { ref, computed } from 'vue';
import { livroService } from '../services';
import type { Livro, LivroForm, LivroFiltro, LivroConteudo } from '../models';

export function useLivro() {
    const livros = ref<Livro[]>([]);
    const livro = ref<Livro | null>(null);
    const conteudo = ref<LivroConteudo | null>(null);
    const carregando = ref(false);
    const erro = ref<string | null>(null);

    const filtros = ref<LivroFiltro>({
        tituloAutor: '',
        anoInicial: null,
        anoFinal: null,
        generoId: null,
        paisId: null,
    });

    const getLivros = async (): Promise<void> => {
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

    const getLivro = async (id: number): Promise<void> => {
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

    const createLivro = async (data: LivroForm): Promise<void> => {
        carregando.value = true;
        erro.value = null;
        try {
            await livroService.create(data);
        } catch (err: any) {
            erro.value = err.message || 'Ocorreu um erro ao criar o livro.';
            throw err;
        } finally {
            carregando.value = false;
        }
    };

    const updateLivro = async (id: number, data: LivroForm): Promise<void> => {
        carregando.value = true;
        erro.value = null;
        try {
            await livroService.update(id, data);
        } catch (err: any) {
            erro.value = err.message || 'Ocorreu um erro ao atualizar o livro.';
            throw err;
        } finally {
            carregando.value = false;
        }
    };

    const deleteLivro = async (id: number): Promise<void> => {
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

    const aplicarFiltros = (novosFiltros: Partial<LivroFiltro>): void => {
        filtros.value = { ...filtros.value, ...novosFiltros };
    };

    const getConteudoLivro = async (id: number): Promise<void> => {
        carregando.value = true;
        erro.value = null;
        try {
            conteudo.value = await livroService.getContent(id);
        } catch (err: any) {
            erro.value = err.message || 'Ocorreu um erro ao deletar o livro.';
            throw err;
        } finally {
            carregando.value = false;
        }
    };

    const livrosFiltrados = computed(() => {
        return livros.value.filter((livro) => {
            const filtro = filtros.value;

            const filtroTituloAutor = !filtro.tituloAutor || livro.titulo.toLowerCase().includes(filtro.tituloAutor.toLowerCase()) || (livro.autor && livro.autor.nome.toLowerCase().includes(filtro.tituloAutor.toLowerCase()));

            const filtroGenero = !filtro.generoId || livro.genero?.id === filtro.generoId;

            const filtroPais = !filtro.paisId || livro.autor?.pais?.id === filtro.paisId;

            const filtroAno = (!filtro.anoInicial || (livro.ano_publicacao && livro.ano_publicacao >= filtro.anoInicial)) && (!filtro.anoFinal || (livro.ano_publicacao && livro.ano_publicacao <= filtro.anoFinal));

            console.log(filtro.anoInicial);

            return filtroTituloAutor && filtroGenero && filtroPais && filtroAno;
        });
    });

    return {
        livro,
        livros,
        conteudo,
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
        getConteudoLivro,
    };
}
