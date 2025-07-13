import { ref, type Ref } from 'vue';
import { generoService } from '../services';
import type { Genero, GeneroForm } from '../models';

export function useGenero() {
    const genero: Ref<Genero | null> = ref<Genero | null>(null);
    const generos: Ref<Genero[]> = ref<Genero[]>([]);
    const carregando: Ref<boolean> = ref(false);
    const erro: Ref<string | null> = ref<string | null>(null);

    async function getGeneros(): Promise<void> {
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
    }

    async function getGenero(id: number): Promise<void> {
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
    }

    async function createGenero(data: GeneroForm): Promise<void> {
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
    }

    async function updateGenero(id: number, data: GeneroForm): Promise<void> {
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
    }

    async function deleteGenero(id: number): Promise<void> {
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
    }

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
