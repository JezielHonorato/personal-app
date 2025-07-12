import { ref } from 'vue';
import { generoService } from '../services/generoService';
import type { Genero, GeneroForm } from '../models/generoModel';

export function useGenero() {
    const generos = ref<Genero[]>([]);
    const genero = ref<Genero | null>(null);
    const carregando = ref(false);
    const erro = ref<string | null>(null);

    const getGeneros = async (): Promise<void> => {
        carregando.value = true;
        erro.value = null;
        try {
            generos.value = await generoService.getAll();
        } catch (err: any) {
            erro.value = err.message || 'Ocorreu um erro ao buscar os Generos.';
            console.error(err);
        } finally {
            carregando.value = false;
        }
    };

    const getGenero = async (id: number): Promise<void> => {
        carregando.value = true;
        erro.value = null;
        try {
            genero.value = await generoService.getById(id);
        } catch (err: any) {
            erro.value = err.message || 'Ocorreu um erro ao buscar o Genero.';
            console.error(err);
        } finally {
            carregando.value = false;
        }
    };

    const createGenero = async (data: GeneroForm): Promise<void> => {
        carregando.value = true;
        erro.value = null;
        try {
            await generoService.create(data);
        } catch (err: any) {
            erro.value = err.message || 'Ocorreu um erro ao criar o Genero.';
            throw err;
        } finally {
            carregando.value = false;
        }
    };

    const updateGenero = async (id: number, data: GeneroForm): Promise<void> => {
        carregando.value = true;
        erro.value = null;
        try {
            await generoService.update(id, data);
        } catch (err: any) {
            erro.value = err.message || 'Ocorreu um erro ao atualizar o Genero.';
            throw err;
        } finally {
            carregando.value = false;
        }
    };

    const deleteGenero = async (id: number): Promise<void> => {
        carregando.value = true;
        erro.value = null;
        try {
            await generoService.delete(id);
        } catch (err: any) {
            erro.value = err.message || 'Ocorreu um erro ao deletar o Genero.';
            throw err;
        } finally {
            carregando.value = false;
        }
    };

    return {
        genero,
        generos,
        carregando,
        erro,

        getGeneros,
        getGenero,
        createGenero,
        updateGenero,
        deleteGenero,
    };
}
