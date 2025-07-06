import { ref, watch, type Ref } from 'vue';
import type { Livro, LivroForm } from '@/types';
import { useLivros } from '@/composables/useLivrosDatabase';

interface UseLivroFormOptions {
    livroParaEditar: Ref<Livro | null>;
    onSuccess: (action: 'create' | 'update') => void;
}

const getLivroForm = (): LivroForm => ({
    titulo: '',
    titulo_original: null,
    autor_id: null,
    genero_id: null,
    ano_publicacao: null,
    lido: false,
    arquivo_file: null,
    capa_file: null,
    capa_url_preview: null,
});

export function useLivroForm(options: UseLivroFormOptions) {
    const { create: createLivro, update: updateLivro } = useLivros();

    const livroForm = ref<LivroForm>(getLivroForm());
    const isSubmitting = ref(false);
    const successMessage = ref<string | null>(null);
    const submitError = ref<string | null>(null);

    const resetarForm = () => {
        livroForm.value = getLivroForm();
        successMessage.value = null;
        submitError.value = null;
    };

    const handleCapaChange = (file: File | null) => {
        if (livroForm.value.capa_url_preview?.startsWith('blob:')) {
            URL.revokeObjectURL(livroForm.value.capa_url_preview);
        }

        if (file) {
            livroForm.value.capa_file = file;
            livroForm.value.capa_url_preview = URL.createObjectURL(file);
        } else {
            livroForm.value.capa_file = null;
            livroForm.value.capa_url_preview = null;
        }
    };

    const handleArquivoChange = (file: File | null) => {
        livroForm.value.arquivo_file = file;
    };

    const buildFormData = (): FormData => {
        const formData = new FormData();

        const colunas: Record<keyof Omit<LivroForm, 'id' | 'arquivo_file' | 'capa_file' | 'capa_url_preview'>, string> = {
            titulo: 'titulo',
            titulo_original: 'titulo_original',
            autor_id: 'autor_id',
            genero_id: 'genero_id',
            ano_publicacao: 'ano_publicacao',
            lido: 'lido',
        };

        for (const key in colunas) {
            const formKey = key as keyof typeof colunas;
            const value = livroForm.value[formKey];

            if (value !== null && value !== undefined && value !== '') {
                formData.append(colunas[formKey], String(value));
            }
        }

        if (livroForm.value.capa_file) {
            formData.append('capa', livroForm.value.capa_file);
        } else if (!livroForm.value.capa_url_preview) {
            formData.append('capa', '');
        }

        if (livroForm.value.arquivo_file) {
            formData.append('arquivo', livroForm.value.arquivo_file);
        }

        return formData;
    };

    const enviarLivro = async () => {
        isSubmitting.value = true;
        successMessage.value = null;
        submitError.value = null;

        const formData = buildFormData();
        const isEditMode = !!(options.livroParaEditar.value && options.livroParaEditar.value.id);

        try {
            if (isEditMode) {
                await updateLivro.update(options.livroParaEditar.value!.id!, formData as any);
                successMessage.value = 'Livro atualizado com sucesso!';
                options.onSuccess('update');
            } else {
                await createLivro.create(formData as any);
                successMessage.value = 'Livro cadastrado com sucesso!';
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
        options.livroParaEditar,
        (livro) => {
            if (livro) {
                livroForm.value = {
                    id: livro.id,
                    titulo: livro.titulo,
                    titulo_original: livro.titulo_original || null,
                    autor_id: livro.autor.id || null,
                    genero_id: livro.genero.id || null,
                    ano_publicacao: livro.ano_publicacao || null,
                    lido: livro.lido ?? false,
                    arquivo_file: null,
                    capa_file: null,
                    capa_url_preview: livro.capa || null,
                };
            } else {
                resetarForm();
            }
        },
        { immediate: true, deep: true }
    );

    return { livroForm, isSubmitting, successMessage, submitError, resetarForm, handleCapaChange, handleArquivoChange, enviarLivro };
}
