import { ref, type Ref } from 'vue';
import { paisService } from '../services';
import type { Pais } from '../models';
import { tratarErro } from '@/utils/error';

export function usePais() {
    const pais: Ref<Pais | null> = ref<Pais | null>(null);
    const paises: Ref<Pais[]> = ref<Pais[]>([]);
    const carregando: Ref<boolean> = ref(false);
    const erro: Ref<string[]> = ref<string[]>([]);

    async function getPaises(): Promise<void> {
        carregando.value = true;
        erro.value = [];
        try {
            paises.value = await paisService.getAll();
        } catch (err: unknown) {
            erro.value = tratarErro(err, 'Ocorreu um erro ao buscar o país.');
            throw err;
        } finally {
            carregando.value = false;
        }
    }

    async function getPais(id: number): Promise<void> {
        carregando.value = true;
        erro.value = [];
        try {
            pais.value = await paisService.getById(id);
        } catch (err: unknown) {
            erro.value = tratarErro(err, 'Ocorreu um erro ao buscar os países.');
            throw err;
        } finally {
            carregando.value = false;
        }
    }

    async function createPais(data: FormData): Promise<void> {
        carregando.value = true;
        erro.value = [];
        try {
            await paisService.create(data);
        } catch (err: unknown) {
            erro.value = tratarErro(err, 'Ocorreu um erro ao criar o país.');
            throw err;
        } finally {
            carregando.value = false;
        }
    }

    async function updatePais(id: number, data: FormData): Promise<void> {
        carregando.value = true;
        erro.value = [];
        try {
            await paisService.update(id, data);
        } catch (err: unknown) {
            erro.value = tratarErro(err, 'Ocorreu um erro ao atualizar o país.');
            throw err;
        } finally {
            carregando.value = false;
        }
    }

    async function deletePais(id: number): Promise<void> {
        carregando.value = true;
        erro.value = [];
        try {
            await paisService.delete(id);
        } catch (err: unknown) {
            erro.value = tratarErro(err, 'Ocorreu um erro ao deletar o país.');
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
