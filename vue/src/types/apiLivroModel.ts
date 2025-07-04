export interface Pais {
    id: number;
    nome: string;
}

export interface Autor {
    id: number;
    nome: string;
    data_nascimento?: number | null;
    data_obito?: number | null;
    pais?: Pais;
    pais_id?: number | null;
}

export interface Genero {
    id: number;
    nome: string;
}

export interface Livro {
    id: number;
    titulo: string;
    titulo_original?: string | null;
    autor?: Autor;
    genero?: Genero;
    ano_publicacao?: number | null;
    lido: boolean;
    arquivo?: string | null;
    capa?: string | null;
	autor_id?: Autor;
    genero_id?: Genero;

}
