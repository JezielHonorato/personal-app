import { ref, type Ref } from 'vue';

export function useAsyncState<T>(promiseFn: (...args: any[]) => Promise<T>) {
    const data = ref<T | null>(null) as Ref<T | null>;
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    const execute = async (...args: any[]) => {
        isLoading.value = true;
        error.value = null;
        data.value = null;
        try {
            const result = await promiseFn(...args);
            data.value = result;
        } catch (err: any) {
            error.value = err.message || 'Ocorreu um erro inesperado.';
        } finally {
            isLoading.value = false;
        }
    };

    return { data, isLoading, error, execute };
}
