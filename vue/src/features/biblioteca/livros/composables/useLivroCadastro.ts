import type { Livro, LivroForm } from '../models/livroModel';

export function mapearLivroParaForm(livro: Livro): LivroForm {
    return {
        id: livro.id,
        titulo: livro.titulo,
        titulo_original: livro.titulo_original,
        ano_publicacao: livro.ano_publicacao,
        lido: livro.lido,
        autorId: livro.autor?.id || null,
        generoId: livro.genero?.id || null,
        arquivo_file: null,
        capa_file: null,
        capa_preview_url: livro.capa,
    };
}

export function alterarCapa(livroForm: LivroForm, file: File | null) {
    if (livroForm.capa_preview_url?.startsWith('blob:')) {
        URL.revokeObjectURL(livroForm.capa_preview_url);
    }
    livroForm.capa_file = file;
    livroForm.capa_preview_url = file ? URL.createObjectURL(file) : null;
}

export function alterarArquivo(livroForm: LivroForm, file: File | null) {
    livroForm.arquivo_file = file;
}

export async function initCadastro({ getAutores, getGeneros, getLivro, livroId, livro, livroForm }: { getAutores: () => Promise<void>; getGeneros: () => Promise<void>; getLivro: (id: number) => Promise<void>; livroId: number | null; livro: { value: Livro | null }; livroForm: { value: LivroForm } }) {
    await getAutores();
    await getGeneros();
    if (livroId) {
        try {
            await getLivro(livroId);
            if (livro.value) {
                livroForm.value = mapearLivroParaForm(livro.value);
            }
        } catch (error) {
            console.error('Erro ao carregar livro para edição:', error);
        }
    }
}
