import type { IPais } from '@/features/biblioteca/paises/models/paisModel';

export interface IAutor {
    id: number;
    nome: string;
    ano_nascimento: number | null;
    ano_obito: number | null;
    pais: IPais;
    pais_id: number | null;
}
