import type { Autor } from '../models';
import type { Genero } from '../models';

export interface Livro {
    id: number;
    titulo: string;
    titulo_original: string | null;
    ano_publicacao: number | null;
    lido: boolean;
    arquivo: string | null;
    capa: string | null;
    autor: Autor | null;
    genero: Genero | null;
}

export interface LivroForm {
    id: number | null;
    titulo: string;
    titulo_original: string | null;
    ano_publicacao: number | null;
    lido: boolean;
    autorId: number | null;
    generoId: number | null;
    arquivo_file: File | null;
    capa_file: File | null;
    capa_preview_url: string | null;
}

export interface LivroFiltro {
    tituloAutor: string;
    anoInicial: number | null;
    anoFinal: number | null;
    generoId: number | null;
    paisId: number | null;
}
export interface LivroConteudo {
    type: 'txt' | 'md' | 'pdf';
    content?: string;
    content_html?: string;
    url?: string;
}
