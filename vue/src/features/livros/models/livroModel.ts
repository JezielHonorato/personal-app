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
    autor_id: number | null;
    genero_id: number | null;
    arquivo: File | null;
    capa: File | null;
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
