import { api } from '@/services';
import type { Autor, AutorForm } from '@/types';
import { useList, useGet, useCreate, useUpdate, useDelete } from '@/composables/useCrud';

export function useAutores() {
    const listState = useList<Autor>(api.autores.getAll);

    listState.fetch();

    return {
        ...listState,

        get: useGet<Autor>(api.autores.get),
        create: useCreate<Autor, AutorForm>(api.autores.create),
        update: useUpdate<AutorForm>(api.autores.update),
        delete: useDelete(api.autores.delete),
    };
}
