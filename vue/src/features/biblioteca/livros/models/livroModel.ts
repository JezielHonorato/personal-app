import type { IAutor } from '@/features/biblioteca/autores/models/autorModel';
import type { IGenero } from '@/features/biblioteca/generos/models/generoModel';

export interface ILivro {
    id: number;
    titulo: string;
    titulo_original: string | null;
    ano_publicacao: number | null;
    lido: boolean;
    arquivo: string | null;
    capa: string | null;

    autor: IAutor;
    genero: IGenero;
}
