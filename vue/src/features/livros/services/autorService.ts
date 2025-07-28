import { CrudService } from '@/services/crudService';
import type { Autor } from '../models/autorModel';

class AutorService extends CrudService<Autor> {
    constructor() {
        super('autores');
    }
}

export const autorService: AutorService = new AutorService();
