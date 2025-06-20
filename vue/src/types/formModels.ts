export interface AutorForm {
	id?: number;
	nome: string;
	data_nascimento?: string | null;
	data_obito?: string | null;
	pais_id?: number | null;
}

export interface LivroForm {
	id?: number;
	titulo: string;
	titulo_original?: string | null;
	autor_id?: number | null;
	genero_id?: number | null;
	ano_publicacao?: number | null;
	status?: string | null;
	avaliacao?: number | null;
	data_inicio?: string | null;
	data_fim?: string | null;
	arquivo_file?: File | null;
	capa_file?: File | null;
	capa_url_preview?: string | null;
}

export interface PaisForm {
	id?: number;
	nome: string;
}
