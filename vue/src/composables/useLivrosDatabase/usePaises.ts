import { api } from '@/services';
import type { Pais, PaisForm } from '@/types';
import { useFilter, useGet, useCreate, useUpdate, useDelete } from '@/composables/useCrud';

export function usePaises() {
    const listState = useFilter<Pais>(api.paises.getFlter);

    listState.fetch();

    return {
        ...listState,

        get: useGet<Pais>(api.paises.get),
        create: useCreate<Pais, PaisForm>(api.paises.create),
        update: useUpdate<PaisForm>(api.paises.update),
        delete: useDelete(api.paises.delete),
    };
}
