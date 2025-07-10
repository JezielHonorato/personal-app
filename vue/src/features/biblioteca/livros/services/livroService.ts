import { CrudService } from '@/services/crudService';
import type { Livro, LivroForm } from '../models/livroModel';

class LivroService extends CrudService<Livro, LivroForm> {
    constructor() {
        super('livros');
    }
}

export const livroService = new LivroService();
