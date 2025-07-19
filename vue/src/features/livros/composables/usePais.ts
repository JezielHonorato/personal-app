import { ref, type Ref } from 'vue';
import { paisService } from '../services';
import type { Pais, PaisForm } from '../models';

export function usePais() {
    const pais: Ref<Pais | null> = ref<Pais | null>(null);
    const paises: Ref<Pais[]> = ref<Pais[]>([]);
    const carregando: Ref<boolean> = ref(false);
    const erro: Ref<string | null> = ref<string | null>(null);

    async function getPaises(): Promise<void> {
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
    }

    async function getPais(id: number): Promise<void> {
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
    }

    async function createPais(data: PaisForm): Promise<void> {
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
    }

    async function updatePais(id: number, data: PaisForm): Promise<void> {
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
    }

    async function deletePais(id: number): Promise<void> {
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
    }

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
