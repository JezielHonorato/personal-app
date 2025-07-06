import { ref, watch, computed } from 'vue';
import type { Autor, AutorForm } from '@/types';
import { useAutores } from '@/composables/useLivrosDatabase';

interface UseAutorFormOptions {
    autorParaEditar: Autor | null;
    onSuccess: (action: 'create' | 'update') => void;
}

const getAutorForm = (): AutorForm => ({
    nome: '',
    ano_nascimento: null,
    ano_obito: null,
    pais_id: null,
});

export function useAutorForm(options: UseAutorFormOptions) {
    const { create: createAutor, update: updateAutor } = useAutores();

    const autorForm = ref<AutorForm>(getAutorForm());
    const successMessage = ref<string | null>(null);
    const carregando = computed(() => createAutor.isCreating.value || updateAutor.isUpdating.value);
    const submitError = computed(() => createAutor.error.value || updateAutor.error.value);
	
    const resetarForm = () => {
        autorForm.value = getAutorForm();
        createAutor.error.value = null;
        updateAutor.error.value = null;
    };

    const enviarAutor = async () => {
        const formData = { ...autorForm.value };
        try {
            if (options.autorParaEditar && options.autorParaEditar.id) {
                await updateAutor.update(options.autorParaEditar.id, formData);
                options.onSuccess('update');
            } else {
                await createAutor.create(formData);
                options.onSuccess('create');
                resetarForm();
            }
        } catch (err: any) {
            console.error('Falha na submissão do formulário de autor:', err);
        }
    };

    watch(
        () => options.autorParaEditar,
        (autor) => {
            if (autor) {
                autorForm.value = {
                    id: autor.id,
                    nome: autor.nome,
                    ano_nascimento: autor.ano_nascimento || null,
                    ano_obito: autor.ano_obito || null,
                    pais_id: autor.pais.id || null,
                };
            } else {
                resetarForm();
            }
        },
        { immediate: true }
    );

    return { autorForm, carregando, successMessage, submitError, enviarAutor, resetarForm };
}
