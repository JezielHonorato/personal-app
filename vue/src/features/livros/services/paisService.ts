import { CrudService } from '@/services/crudService';
import type { Pais } from '../models/paisModel';

class PaisService extends CrudService<Pais> {
    constructor() {
        super('paises');
    }
}

export const paisService: PaisService = new PaisService();
