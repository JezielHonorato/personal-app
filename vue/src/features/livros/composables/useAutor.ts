import { ref, type Ref } from 'vue';
import { autorService } from '../services';
import type { Autor } from '../models';

export function useAutor() {
    const autor: Ref<Autor | null> = ref<Autor | null>(null);
    const autores: Ref<Autor[]> = ref<Autor[]>([]);
    const carregando: Ref<boolean> = ref(false);
    const erro: Ref<string[]> = ref<string[]>([]);

    async function getAutores(): Promise<void> {
        carregando.value = true;
        erro.value = [];
        try {
            autores.value = await autorService.getAll();
        } catch (err: any) {
            erro.value = err.message || 'Ocorreu um erro ao buscar os Autores.';
            console.error(err);
        } finally {
            carregando.value = false;
        }
    }

    async function getAutor(id: number): Promise<void> {
        carregando.value = true;
        erro.value = [];
        try {
            autor.value = await autorService.getById(id);
        } catch (err: any) {
            erro.value = err.message || 'Ocorreu um erro ao buscar o Autor.';
            console.error(err);
        } finally {
            carregando.value = false;
        }
    }

    async function createAutor(data: FormData): Promise<void> {
        carregando.value = true;
        erro.value = [];
        try {
            await autorService.create(data);
        } catch (err: any) {
            erro.value = err.message || 'Ocorreu um erro ao criar o Autor.';
            throw err;
        } finally {
            carregando.value = false;
        }
    }

    async function updateAutor(id: number, data: FormData): Promise<void> {
        carregando.value = true;
        erro.value = [];
        try {
            await autorService.update(id, data);
        } catch (err: any) {
            erro.value = err.message || 'Ocorreu um erro ao atualizar o Autor.';
            throw err;
        } finally {
            carregando.value = false;
        }
    }

    async function deleteAutor(id: number): Promise<void> {
        carregando.value = true;
        erro.value = [];
        try {
            await autorService.delete(id);
        } catch (err: any) {
            erro.value = err.message || 'Ocorreu um erro ao deletar o Autor.';
            throw err;
        } finally {
            carregando.value = false;
        }
    }

    return {
        autor,
        autores,
        carregando,
        erro,

        getAutores,
        getAutor,
        createAutor,
        updateAutor,
        deleteAutor,
    };
}
