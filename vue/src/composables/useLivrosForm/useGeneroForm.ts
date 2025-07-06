import { ref, watch, type Ref } from 'vue';
import type { Genero, GeneroForm } from '@/types';
import { useGeneros } from '@/composables/useLivrosDatabase';

interface UseGeneroFormOptions {
    generoParaEditar: Ref<Genero | null>;
    onSuccess: (action: 'create' | 'update') => void;
}

const getGeneroForm = (): GeneroForm => ({
    nome: '',
});

export function useGeneroForm(options: UseGeneroFormOptions) {
    const { create: createGenero, update: updateGenero } = useGeneros();

    const generoForm = ref<GeneroForm>(getGeneroForm());
    const isSubmitting = ref(false);
    const successMessage = ref<string | null>(null);
    const submitError = ref<string | null>(null);

    const resetarForm = () => {
        generoForm.value = getGeneroForm();
        successMessage.value = null;
        submitError.value = null;
    };

    const enviarGenero = async () => {
        isSubmitting.value = true;
        successMessage.value = null;
        submitError.value = null;

        const formData = { ...generoForm.value };

        const isEditMode = !!(options.generoParaEditar.value && options.generoParaEditar.value.id);

        try {
            if (isEditMode) {
                await updateGenero.update(options.generoParaEditar.value!.id!, formData as any);
                successMessage.value = 'Genero atualizado com sucesso!';
                options.onSuccess('update');
            } else {
                await createGenero.create(formData as any);
                successMessage.value = 'Genero cadastrado com sucesso!';
                options.onSuccess('create');
                resetarForm();
            }
        } catch (err: any) {
            submitError.value = err.message;
            console.error('Erro de envio:', err);
        } finally {
            isSubmitting.value = false;
        }
    };

    watch(
        options.generoParaEditar,
        (genero) => {
            if (genero) {
                generoForm.value = {
                    id: genero.id,
                    nome: genero.nome,
                };
            } else {
                resetarForm();
            }
        },
        { immediate: true, deep: true }
    );

    return { generoForm, isSubmitting, successMessage, submitError, resetarForm, enviarGenero };
}
