import { ref } from 'vue';
import { generoService } from '../services/generoService';
import type { Genero, GeneroForm } from '../models/generoModel';

export function useGeneros() {
    const generos = ref<Genero[]>([]);
    const genero = ref<Genero | null>(null);
    const carregando = ref(false);
    const erro = ref<string | null>(null);

    const getGeneros = async () => {
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

    const getGenero = async (id: number) => {
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

    const createGenero = async (data: GeneroForm) => {
        carregando.value = true;
        erro.value = null;
        try {
            const newGenero = await generoService.create(data);
            generos.value.push(newGenero);
            return newGenero;
        } catch (err: any) {
            erro.value = err.message || 'Ocorreu um erro ao criar o Genero.';
            throw err;
        } finally {
            carregando.value = false;
        }
    };

    const updateGenero = async (id: number, data: GeneroForm) => {
        carregando.value = true;
        erro.value = null;
        try {
            const updatedGenero = await generoService.update(id, data);
            const index = generos.value.findIndex((Genero) => Genero.id === id);
            if (index !== -1) {
                generos.value[index] = updatedGenero;
            }
            return updatedGenero;
        } catch (err: any) {
            erro.value = err.message || 'Ocorreu um erro ao atualizar o Genero.';
            throw err;
        } finally {
            carregando.value = false;
        }
    };

    const deleteGenero = async (id: number) => {
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

    const removerGeneroDaLista = (id: number) => {
        const index = generos.value.findIndex((Genero) => Genero.id === id);
        if (index > -1) {
            generos.value.splice(index, 1);
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
        removerGeneroDaLista,
    };
}
