import { CrudService } from '@/services/crudService';
import type { Genero, GeneroForm } from '../models/generoModel';

class GeneroService extends CrudService<Genero, GeneroForm> {
    constructor() {
        super('generos');
    }
}

export const generoService: GeneroService = new GeneroService();
