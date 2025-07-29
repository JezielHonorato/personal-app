import { ref, type Ref } from 'vue';
import { generoService } from '../services';
import type { Genero } from '../models';
import { tratarErro } from '@/utils/error';

export function useGenero() {
    const genero: Ref<Genero | null> = ref<Genero | null>(null);
    const generos: Ref<Genero[]> = ref<Genero[]>([]);
    const carregando: Ref<boolean> = ref(false);
    const erro: Ref<string[]> = ref<string[]>([]);

    async function getGeneros(): Promise<void> {
        carregando.value = true;
        erro.value = [];
        try {
            generos.value = await generoService.getAll();
        } catch (err: unknown) {
            erro.value = tratarErro(err, 'Ocorreu um erro ao buscar os gêneros.');
            throw err;
        } finally {
            carregando.value = false;
        }
    }

    async function getGenero(id: number): Promise<void> {
        carregando.value = true;
        erro.value = [];
        try {
            genero.value = await generoService.getById(id);
        } catch (err: unknown) {
            erro.value = tratarErro(err, 'Ocorreu um erro ao buscar o gênero.');
            throw err;
        } finally {
            carregando.value = false;
        }
    }

    async function createGenero(data: FormData): Promise<void> {
        carregando.value = true;
        erro.value = [];
        try {
            await generoService.create(data);
        } catch (err: unknown) {
            erro.value = tratarErro(err, 'Ocorreu um erro ao criar gênero.');
            throw err;
        } finally {
            carregando.value = false;
        }
    }

    async function updateGenero(id: number, data: FormData): Promise<void> {
        carregando.value = true;
        erro.value = [];
        try {
            await generoService.update(id, data);
        } catch (err: unknown) {
            erro.value = tratarErro(err, 'Ocorreu um erro ao atualizar o gênero.');
            throw err;
        } finally {
            carregando.value = false;
        }
    }

    async function deleteGenero(id: number): Promise<void> {
        carregando.value = true;
        erro.value = [];
        try {
            await generoService.delete(id);
        } catch (err: unknown) {
            erro.value = tratarErro(err, 'Ocorreu um erro ao deletar o gênero.');
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
