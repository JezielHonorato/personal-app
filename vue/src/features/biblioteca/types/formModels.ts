export interface AutorForm {
    id?: number;
    nome: string;
    ano_nascimento: number | null;
    ano_obito: number | null;
    pais_id: number | null;
}

export interface LivroForm {
    id?: number;
    titulo: string;
    titulo_original: string | null;
    autor_id: number | null;
    genero_id: number | null;
    ano_publicacao: number | null;
    lido: boolean;
    arquivo_file: File | null;
    capa_file: File | null;
    capa_url_preview: string | null;
}

export interface PaisForm {
    id?: number;
    nome: string;
}
export interface GeneroForm {
    id?: number;
    nome: string;
}

export interface ConteudoLivro {
    type: 'txt' | 'md' | 'pdf';
    content?: string;
    content_html?: string;
    url?: string;
}
