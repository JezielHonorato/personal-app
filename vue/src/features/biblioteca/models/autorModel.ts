import type { Pais } from '@/features/biblioteca/models/paisModel';

export interface Autor {
    id: number;
    nome: string;
    ano_nascimento: number | null;
    ano_obito: number | null;
    pais: Pais | null;
}

export interface AutorForm {
    id: number | null;
    nome: string;
    ano_nascimento: number | null;
    ano_obito: number | null;
    paisId: number | null;
}
