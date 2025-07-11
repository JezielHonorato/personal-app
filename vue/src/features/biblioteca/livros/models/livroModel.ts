import type { Autor } from '@/features/biblioteca/autores/models/autorModel';
import type { Genero } from '@/features/biblioteca/generos/models/generoModel';

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
    tituloAutor: string | null;
    generoId: number | null;
    paisId: number | null;
    lido: boolean | null;
}
export interface LivroConteudo {
    type: 'txt' | 'md' | 'pdf';
    content?: string;
    url?: string;
}
