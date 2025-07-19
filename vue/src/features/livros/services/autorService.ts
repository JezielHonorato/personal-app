import { CrudService } from '@/services/crudService';
import type { Autor, AutorForm } from '../models/autorModel';

class AutorService extends CrudService<Autor, AutorForm> {
    constructor() {
        super('autores');
    }
}

export const autorService = new AutorService();
