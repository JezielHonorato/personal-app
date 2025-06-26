import { ref, type Ref } from 'vue';

export function useList<T>(req: (params?: any) => Promise<any>) {
    const data: Ref<T[]> = ref([]);
    const carregando = ref<boolean>(false);
    const error = ref<string | null>(null);

    const fetch = async (params?: any) => {
        carregando.value = true;
        error.value = null;
        try {
            const response = await req(params);
            data.value = response.data;
        } catch (err: any) {
            error.value = `Erro ao buscar lista: ${err.message}`;
        } finally {
            carregando.value = false;
        }
    };

    return { data, carregando, error, fetch };
}

export function useGet<T>(req: (id: number) => Promise<any>) {
    const data: Ref<T | null> = ref(null);
    const carregando = ref<boolean>(false);
    const error = ref<string | null>(null);

    const fetchById = async (id: number) => {
        carregando.value = true;
        error.value = null;
        try {
            const response = await req(id);
            data.value = response.data;
        } catch (err: any) {
            error.value = `Erro ao buscar item #${id}: ${err.message}`;
            data.value = null;
        } finally {
            carregando.value = false;
        }
    };

    return { data, carregando, error, fetchById };
}

export function useCreate<T, F>(req: (formData: F) => Promise<any>) {
    const isCreating = ref<boolean>(false);
    const error = ref<string | null>(null);
    const createdData: Ref<T | null> = ref(null);

    const create = async (formData: F) => {
        isCreating.value = true;
        error.value = null;
        createdData.value = null;
        try {
            const response = await req(formData);
            createdData.value = response.data;
        } catch (err: any) {
            error.value = `Erro ao criar item: ${err.message}`;
            throw err;
        } finally {
            isCreating.value = false;
        }
    };

    return { isCreating, error, createdData, create };
}

export function useUpdate<F>(req: (id: number, formData: F) => Promise<any>) {
    const isUpdating = ref<boolean>(false);
    const error = ref<string | null>(null);

    const update = async (id: number, formData: F) => {
        isUpdating.value = true;
        error.value = null;
        try {
            await req(id, formData);
        } catch (err: any) {
            error.value = `Erro ao atualizar item #${id}: ${err.message}`;
            throw err;
        } finally {
            isUpdating.value = false;
        }
    };

    return { isUpdating, error, update };
}

export function useDelete(req: (id: number) => Promise<any>) {
    const isDeleting = ref<boolean>(false);
    const error = ref<string | null>(null);

    const remove = async (id: number) => {
        isDeleting.value = true;
        error.value = null;
        try {
            await req(id);
        } catch (err: any) {
            error.value = `Erro ao deletar item #${id}: ${err.message}`;
            throw err;
        } finally {
            isDeleting.value = false;
        }
    };

    return { isDeleting, error, remove };
}
