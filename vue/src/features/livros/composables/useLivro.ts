import { ref, computed, type Ref } from 'vue';
import { livroService } from '../services';
import type { Livro, LivroFiltro, LivroConteudo } from '../models';
import { tratarErro } from '@/utils/error';

export function useLivro() {
    const livro: Ref<Livro | null> = ref<Livro | null>(null);
    const livros: Ref<Livro[]> = ref<Livro[]>([]);
    const conteudo: Ref<LivroConteudo | null> = ref<LivroConteudo | null>(null);
    const carregando: Ref<boolean> = ref(false);
    const erro: Ref<string[]> = ref<string[]>([]);

    const filtros: Ref<LivroFiltro> = ref<LivroFiltro>({
        tituloAutor: '',
        anoInicial: null,
        anoFinal: null,
        generoId: null,
        paisId: null,
    });

    async function getLivros(): Promise<void> {
        carregando.value = true;
        erro.value = [];
        try {
            livros.value = await livroService.getAll();
        } catch (err: unknown) {
            erro.value = tratarErro(err, 'Ocorreu um erro ao buscar os livros.');
            throw err;
        } finally {
            carregando.value = false;
        }
    }

    async function getLivro(id: number): Promise<void> {
        carregando.value = true;
        erro.value = [];
        try {
            livro.value = await livroService.getById(id);
        } catch (err: unknown) {
            erro.value = tratarErro(err, 'Ocorreu um erro ao buscar o livro.');
            throw err;
        } finally {
            carregando.value = false;
        }
    }

    async function createLivro(data: FormData): Promise<void> {
        carregando.value = true;
        erro.value = [];
        try {
            await livroService.create(data);
        } catch (err: unknown) {
            erro.value = tratarErro(err, 'Ocorreu um erro ao criar o livro.');
            throw err;
        } finally {
            carregando.value = false;
        }
    }

    async function updateLivro(id: number, data: FormData): Promise<void> {
        carregando.value = true;
        erro.value = [];
        try {
            data.append('_method', 'PUT');
            await livroService.update(id, data);
        } catch (err: unknown) {
            erro.value = tratarErro(err, 'Ocorreu um erro ao atualizar o livro.');
            throw err;
        } finally {
            carregando.value = false;
        }
    }

    async function deleteLivro(id: number): Promise<void> {
        carregando.value = true;
        erro.value = [];
        try {
            await livroService.delete(id);
        } catch (err: unknown) {
            erro.value = tratarErro(err, 'Ocorreu um erro ao deletar o livro.');
            throw err;
        } finally {
            carregando.value = false;
        }
    }

    async function getConteudoLivro(id: number): Promise<void> {
        carregando.value = true;
        erro.value = [];
        try {
            conteudo.value = await livroService.getContent(id);
        } catch (err: unknown) {
            erro.value = tratarErro(err, 'Ocorreu um erro ao buscar o conteúdo do livro.');
            throw err;
        } finally {
            carregando.value = false;
        }
    }

    function aplicarFiltros(novosFiltros: Partial<LivroFiltro>): void {
        filtros.value = { ...filtros.value, ...novosFiltros };
    }

    const livrosFiltrados = computed(() => {
        return livros.value.filter((livro) => {
            const filtro = filtros.value;
            const filtroTituloAutor = !filtro.tituloAutor || livro.titulo.toLowerCase().includes(filtro.tituloAutor.toLowerCase()) || (livro.autor && livro.autor.nome.toLowerCase().includes(filtro.tituloAutor.toLowerCase()));
            const filtroGenero = !filtro.generoId || livro.genero?.id === filtro.generoId;
            const filtroPais = !filtro.paisId || livro.autor?.pais?.id === filtro.paisId;
            const filtroAno = (!filtro.anoInicial || (livro.ano_publicacao && livro.ano_publicacao >= filtro.anoInicial)) && (!filtro.anoFinal || (livro.ano_publicacao && livro.ano_publicacao <= filtro.anoFinal));

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
