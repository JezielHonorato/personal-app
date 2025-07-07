import { api } from '@/services';
import type { Genero, GeneroForm } from '@/types';
import { useFilter, useGet, useCreate, useUpdate, useDelete } from '@/composables/useCrud';

export function useGeneros() {
    const listState = useFilter<Genero>(api.generos.getFilter);

    listState.fetch();

    return {
        ...listState,

        get: useGet<Genero>(api.generos.get),
        create: useCreate<Genero, GeneroForm>(api.generos.create),
        update: useUpdate<GeneroForm>(api.generos.update),
        delete: useDelete(api.generos.delete),
    };
}
