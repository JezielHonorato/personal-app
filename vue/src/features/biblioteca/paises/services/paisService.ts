import { CrudService } from '@/services/crudService';
import type { Pais, PaisForm } from '../models/paisModel';

class PaisService extends CrudService<Pais, PaisForm> {
    constructor() {
        super('paises');
    }
}

export const paisService = new PaisService();
