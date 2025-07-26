import { api } from '@/config/axios';
import { CrudService } from '@/services/crudService';
import type { Livro, LivroForm, LivroConteudo } from '../models/livroModel';

class LivroService extends CrudService<Livro> {
    constructor() {
        super('livros');
    }

    async getContent(id: number): Promise<LivroConteudo> {
        const response = await api.get<LivroConteudo>(`/livros/${id}/conteudo`);
        return response.data;
    }
}

export const livroService: LivroService = new LivroService();
