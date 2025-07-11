import { ref } from 'vue';
import { autorService } from '../services/autorService';
import type { Autor, AutorForm } from '../models/autorModel';

export function useAutores() {
    const autores = ref<Autor[]>([]);
    const autor = ref<Autor | null>(null);
    const carregando = ref(false);
    const erro = ref<string | null>(null);

    const getAutores = async () => {
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

    const getAutor = async (id: number) => {
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

    const createAutor = async (data: AutorForm) => {
        carregando.value = true;
        erro.value = null;
        try {
            const newAutor = await autorService.create(data);
            autores.value.push(newAutor);
            return newAutor;
        } catch (err: any) {
            erro.value = err.message || 'Ocorreu um erro ao criar o Autor.';
            throw err;
        } finally {
            carregando.value = false;
        }
    };

    const updateAutor = async (id: number, data: AutorForm) => {
        carregando.value = true;
        erro.value = null;
        try {
            const updatedAutor = await autorService.update(id, data);
            const index = autores.value.findIndex((Autor) => Autor.id === id);
            if (index !== -1) {
                autores.value[index] = updatedAutor;
            }
            return updatedAutor;
        } catch (err: any) {
            erro.value = err.message || 'Ocorreu um erro ao atualizar o Autor.';
            throw err;
        } finally {
            carregando.value = false;
        }
    };

    const deleteAutor = async (id: number) => {
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

    const removerAutorDaLista = (id: number) => {
        const index = autores.value.findIndex((Autor) => Autor.id === id);
        if (index > -1) {
            autores.value.splice(index, 1);
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
        removerAutorDaLista,
    };
}
