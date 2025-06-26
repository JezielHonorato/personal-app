import { ref, watch } from 'vue';
import type { Autor, AutorForm } from '@/types';
import { useAutores } from '@/composables/useDatabaseLivros';

interface UseAutorFormOptions {
    autorParaEditar: Autor | null;
    onSuccess: (action: 'create' | 'update') => void;
}

const getAutorForm = (): AutorForm => ({
    nome: '',
    data_nascimento: null,
    data_obito: null,
    pais_id: null,
});

export function useAutorForm(options: UseAutorFormOptions) {
    const { create: createAutor, update: updateAutor } = useAutores();

    const autorForm = ref<AutorForm>(getAutorForm());
    const isSubmitting = ref(false);
    const successMessage = ref<string | null>(null);
    const submitError = ref<string | null>(null);

    const resetForm = () => {
        autorForm.value = getAutorForm();
        submitError.value = null;
    };

    const handleSubmit = async () => {
        isSubmitting.value = true;
        successMessage.value = null;
        submitError.value = null;

        const isEditMode = !!(options.autorParaEditar && options.autorParaEditar.id);

        try {
            const formData = { ...autorForm.value };

            if (isEditMode) {
                await updateAutor.update(options.autorParaEditar!.id, formData);
                successMessage.value = 'Autor atualizado com sucesso!';
                options.onSuccess('update');
            } else {
                await createAutor.create(formData);
                successMessage.value = 'Autor atualizado com sucesso!';

                options.onSuccess('create');
                resetForm();
            }
        } catch (err: any) {
            submitError.value = err.message;
            console.error('Erro de envio:', err);
        } finally {
            isSubmitting.value = false;
        }
    };

    watch(
        () => options.autorParaEditar,
        (autor) => {
            if (autor) {
                autorForm.value = {
                    id: autor.id,
                    nome: autor.nome,
                    data_nascimento: autor.data_nascimento || null,
                    data_obito: autor.data_obito || null,
                    pais_id: autor.pais?.id || null,
                };
            } else {
                resetForm();
            }
        },
        { immediate: true }
    );

    return { autorForm, isSubmitting, successMessage, submitError, handleSubmit, resetForm };
}
