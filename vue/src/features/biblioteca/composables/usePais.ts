import { ref } from 'vue';
import { paisService } from '../services/paisService';
import type { Pais, PaisForm } from '../models/paisModel';

export function usePais() {
    const paises = ref<Pais[]>([]);
    const pais = ref<Pais | null>(null);
    const carregando = ref(false);
    const erro = ref<string | null>(null);

    const getPaises = async (): Promise<void> => {
        carregando.value = true;
        erro.value = null;
        try {
            paises.value = await paisService.getAll();
        } catch (err: any) {
            erro.value = err.message || 'Ocorreu um erro ao buscar os paises.';
            console.error(err);
        } finally {
            carregando.value = false;
        }
    };

    const getPais = async (id: number): Promise<void> => {
        carregando.value = true;
        erro.value = null;
        try {
            pais.value = await paisService.getById(id);
        } catch (err: any) {
            erro.value = err.message || 'Ocorreu um erro ao buscar o pais.';
            console.error(err);
        } finally {
            carregando.value = false;
        }
    };

    const createPais = async (data: PaisForm): Promise<void> => {
        carregando.value = true;
        erro.value = null;
        try {
            await paisService.create(data);
        } catch (err: any) {
            erro.value = err.message || 'Ocorreu um erro ao criar o pais.';
            throw err;
        } finally {
            carregando.value = false;
        }
    };

    const updatePais = async (id: number, data: PaisForm): Promise<void> => {
        carregando.value = true;
        erro.value = null;
        try {
            await paisService.update(id, data);
        } catch (err: any) {
            erro.value = err.message || 'Ocorreu um erro ao atualizar o pais.';
            throw err;
        } finally {
            carregando.value = false;
        }
    };

    const deletePais = async (id: number): Promise<void> => {
        carregando.value = true;
        erro.value = null;
        try {
            await paisService.delete(id);
        } catch (err: any) {
            erro.value = err.message || 'Ocorreu um erro ao deletar o pais.';
            throw err;
        } finally {
            carregando.value = false;
        }
    };

    return {
        pais,
        paises,
        carregando,
        erro,

        getPaises,
        getPais,
        createPais,
        updatePais,
        deletePais,
    };
}
