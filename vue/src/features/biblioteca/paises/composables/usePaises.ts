import { ref } from 'vue';
import { paisService } from '../services/paisService';
import type { Pais, PaisForm } from '../models/paisModel';

export function usePaises() {
    const paises = ref<Pais[]>([]);
    const pais = ref<Pais | null>(null);
    const carregando = ref(false);
    const erro = ref<string | null>(null);

    const getPaises = async () => {
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

    const getPais = async (id: number) => {
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

    const createPais = async (data: PaisForm) => {
        carregando.value = true;
        erro.value = null;
        try {
            const newPais = await paisService.create(data);
            paises.value.push(newPais);
            return newPais;
        } catch (err: any) {
            erro.value = err.message || 'Ocorreu um erro ao criar o pais.';
            throw err;
        } finally {
            carregando.value = false;
        }
    };

    const updatePais = async (id: number, data: PaisForm) => {
        carregando.value = true;
        erro.value = null;
        try {
            const updatedPais = await paisService.update(id, data);
            const index = paises.value.findIndex((pais) => pais.id === id);
            if (index !== -1) {
                paises.value[index] = updatedPais;
            }
            return updatedPais;
        } catch (err: any) {
            erro.value = err.message || 'Ocorreu um erro ao atualizar o pais.';
            throw err;
        } finally {
            carregando.value = false;
        }
    };

    const deletePais = async (id: number) => {
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

    const removerPaisDaLista = (id: number) => {
        const index = paises.value.findIndex((pais) => pais.id === id);
        if (index > -1) {
            paises.value.splice(index, 1);
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
        removerPaisDaLista,
    };
}
