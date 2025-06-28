<template>
    <div class="min-h-screen w-full bg-white dark:bg-gray-900">
        <div class="container mx-auto px-4 py-8 max-w-2xl">
            <h2 class="text-3xl font-extrabold mb-8 text-center text-gray-900 dark:text-white">
                {{ isEditMode ? 'Editar Livro' : 'Cadastrar Novo Livro' }}
            </h2>

            <div v-if="carregandoLivro" class="text-center p-8">
                <p>Carregando dados do livro...</p>
            </div>

            <form v-else @submit.prevent="handleSubmit" class="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <FormTextInput id="titulo" label="Título" placeholder="Nome do Livro" v-model="livroForm.titulo" />
                    <FormTextInput id="titulo_original" label="Título Original" placeholder="Título original" v-model="livroForm.titulo_original" />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <FormSelect id="autor" label="Autor" placeholder="Selecione um autor" :options="autores" v-model="livroForm.autor_id" :loading="carregandoAutores" :error="errorAutores || undefined" />
                    <FormSelect id="genero" label="Gênero" placeholder="Selecione um gênero" :options="generos" v-model="livroForm.genero_id" :loading="carregandoGeneros" :error="errorGeneros || undefined" />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <FormNumberInput id="ano_publicacao" label="Ano de Publicação:" placeholder="Ex: 2023" v-model="livroForm.ano_publicacao" />
                    <div class="flex items-center mt-6">
                        <FormCheckbox id="lido" label="Lido" v-model="livroForm.lido" />
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <FormFileInput id="arquivo" label="Arquivo do livro:" accept=".pdf, .md, .txt" @change="handleArquivoChange" :fileName="livroForm.arquivo_file?.name" />
                    <FormFileInput id="capa" label="Capa do livro:" accept="image/*" @change="handleCapaChange" :previewUrl="livroForm.capa_url_preview" />
                </div>

                <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                    <FormSubmitButton :loading="isSubmitting" loadingText="Salvando..." :text="isEditMode ? 'Atualizar Livro' : 'Cadastrar Livro'" />
                    <button v-if="isEditMode" type="button" @click="cancelarEdicao" class="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-200 ease-in-out transform hover:-translate-y-0.5 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-300">Cancelar</button>
                </div>

                <p v-if="successMessage" class="text-green-600 text-sm mt-6 text-center font-medium dark:text-green-400">{{ successMessage }}</p>
                <p v-if="submitError" class="text-red-600 text-sm mt-6 text-center font-medium dark:text-red-500">{{ submitError }}</p>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { FormCheckbox, FormFileInput, FormNumberInput, FormSelect, FormSubmitButton, FormTextInput } from '@/components/form/';
    import { useAutores, useGeneros, useLivros } from '@/composables/useDatabaseLivros';
    import { useLivroForm } from '@/composables/useLivroForm';

    const route = useRoute();
    const router = useRouter();

    const livroId = route.params.id ? Number(route.params.id) : null;
    const isEditMode = ref(!!livroId);

    const { get: getLivro } = useLivros();
    const { data: livroParaEditar, carregando: carregandoLivro, error: erroCarregarLivro, fetchById } = getLivro;

    const { data: autores, carregando: carregandoAutores, error: errorAutores, fetch: fetchAutores } = useAutores();
    const { data: generos, carregando: carregandoGeneros, error: errorGeneros, fetch: fetchGeneros } = useGeneros();

    const emit = defineEmits<{
        (e: 'livroCadastrado'): void;
        (e: 'livroAtualizado'): void;
    }>();

    const { livroForm, isSubmitting, successMessage, submitError, handleSubmit, handleCapaChange, handleArquivoChange } = useLivroForm({
        livroParaEditar: livroParaEditar,
        onSuccess: (action) => {
            const destination = '/livros';
            if (action === 'create') {
                emit('livroCadastrado');
            } else {
                emit('livroAtualizado');
            }
            router.push(destination);
        },
    });

    const cancelarEdicao = () => {
        router.push('/livros');
    };

    onMounted(() => {
        fetchAutores();
        fetchGeneros();
        if (livroId) {
            fetchById(livroId);
            if (erroCarregarLivro.value) console.error('Falha ao carregar o livro para edição:', erroCarregarLivro.value);
        }
    });
</script>
