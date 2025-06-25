import { api } from '@/services';
import type { Genero, GeneroForm } from '@/types';
import { useList, useGet, useCreate, useUpdate, useDelete } from '@/composables/useCrud';

export function useGeneros() {
    const listState = useList<Genero>(api.generos.getAll);

    listState.fetch();

    return {
        ...listState,

        get: useGet<Genero>(api.generos.get),
        create: useCreate<Genero, GeneroForm>(api.generos.create),
        update: useUpdate<GeneroForm>(api.generos.update),
        delete: useDelete(api.generos.delete),
    };
}
