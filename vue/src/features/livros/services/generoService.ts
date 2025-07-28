import { CrudService } from '@/services/crudService';
import type { Genero } from '../models/generoModel';

class GeneroService extends CrudService<Genero> {
    constructor() {
        super('generos');
    }
}

export const generoService: GeneroService = new GeneroService();
