export interface Pais {
	id: number;
	nome: string;
}

export interface Autor {
	id: number;
	nome: string;
	data_nascimento?: string | null;
	data_obito?: string | null;
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
	status: string;
	avaliacao?: number | null;
	data_inicio?: string | null;
	data_fim?: string | null;
	arquivo?: string | null;
	capa?: string | null;
	data_criacao: string;
	data_atualizacao: string;
}
