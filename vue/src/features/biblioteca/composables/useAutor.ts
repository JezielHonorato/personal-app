import { ref } from 'vue';
import { autorService } from '../services/autorService';
import type { Autor, AutorForm } from '../models/autorModel';

export function useAutor() {
    const autores = ref<Autor[]>([]);
    const autor = ref<Autor | null>(null);
    const carregando = ref(false);
    const erro = ref<string | null>(null);

    const getAutores = async (): Promise<void> => {
        carregando.value = true;
        erro.value = null;
        try {
            autores.value = await autorService.getAll();
        } catch (err: any) {
            erro.value = err.message || 'Ocorreu um erro ao buscar os Autores.';
            console.error(err);
        } finally {
            carregando.value = false;
        }
    };

    const getAutor = async (id: number): Promise<void> => {
        carregando.value = true;
        erro.value = null;
        try {
            autor.value = await autorService.getById(id);
        } catch (err: any) {
            erro.value = err.message || 'Ocorreu um erro ao buscar o Autor.';
            console.error(err);
        } finally {
            carregando.value = false;
        }
    };

    const createAutor = async (data: AutorForm): Promise<void> => {
        carregando.value = true;
        erro.value = null;
        try {
            await autorService.create(data);
        } catch (err: any) {
            erro.value = err.message || 'Ocorreu um erro ao criar o Autor.';
            throw err;
        } finally {
            carregando.value = false;
        }
    };

    const updateAutor = async (id: number, data: AutorForm): Promise<void> => {
        carregando.value = true;
        erro.value = null;
        try {
            await autorService.update(id, data);
        } catch (err: any) {
            erro.value = err.message || 'Ocorreu um erro ao atualizar o Autor.';
            throw err;
        } finally {
            carregando.value = false;
        }
    };

    const deleteAutor = async (id: number): Promise<void> => {
        carregando.value = true;
        erro.value = null;
        try {
            await autorService.delete(id);
        } catch (err: any) {
            erro.value = err.message || 'Ocorreu um erro ao deletar o Autor.';
            throw err;
        } finally {
            carregando.value = false;
        }
    };

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
