<template>
    <div class="min-h-screen w-full bg-white dark:bg-gray-900">
        <div class="container mx-auto px-4 py-8 max-w-2xl">
            <h2 class="text-3xl font-extrabold mb-8 text-center text-gray-900 dark:text-white">
                {{ modoEditar ? 'Editar Livro' : 'Cadastrar Novo Livro' }}
            </h2>

            <form v-if="!carregando" @submit.prevent="enviarLivro" class="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <FormTextInput id="titulo" label="Título" placeholder="Nome do Livro" v-model="livroForm.titulo" required />
                    <FormTextInput id="titulo_original" label="Título Original" placeholder="Título original" v-model="livroForm.titulo_original" />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div class="flex items-end gap-2">
                        <FormSelect class="flex-grow" id="autor" label="Autor" placeholder="Selecione um autor" :options="autores" v-model="livroForm.autorId" :carregando="carregandoAutores" :erro="erroAutores" />
                        <button @click="showAutorModal = true" type="button" class="h-10 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg">+</button>
                    </div>
                    <div class="flex items-end gap-2">
                        <FormSelect class="flex-grow" id="genero" label="Gênero" placeholder="Selecione um gênero" :options="generos" v-model="livroForm.generoId" :carregando="carregandoGeneros" :erro="erroGeneros" />
                        <button @click="showGeneroModal = true" type="button" class="h-10 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg">+</button>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <FormNumberInput id="ano_publicacao" label="Ano de Publicação:" placeholder="Ex: 2023" v-model="livroForm.ano_publicacao" />
                    <div class="flex items-center mt-6"><FormCheckbox id="lido" label="Lido" v-model="livroForm.lido" /></div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <FormFileInput id="arquivo" label="Arquivo do livro:" accept=".pdf, .md, .txt" @change="alterarArquivo" :fileName="livroForm.arquivo_file" />
                    <FormFileInput id="capa" label="Capa do livro:" accept="image/*" @change="alterarCapa" :previewUrl="livroForm.capa_preview_url" />
                </div>

                <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                    <FormSubmitButton :carregando="carregando" textoCarregando="Salvando..." :texto="modoEditar ? 'Atualizar Livro' : 'Cadastrar Livro'" :desabilitado="validarPreencimento(livroForm.titulo)" />
                    <button v-if="modoEditar" type="button" @click="cancelarEdicao" class="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg">Cancelar</button>
                </div>

                <p v-if="erro" class="text-red-600 text-sm mt-6 text-center font-medium">{{ erro }}</p>
            </form>

            <div v-else class="text-center p-8">Carregando dados do livro...</div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { FormCheckbox, FormFileInput, FormNumberInput, FormSelect, FormSubmitButton, FormTextInput } from '@/components/form';
    import type { Livro, LivroForm } from '../models/livroModel';
    import { useAutores } from '@/features/biblioteca/autores/composables/useAutores';
    import { useGeneros } from '@/features/biblioteca/generos/composables/useGeneros';
    import { useLivros } from '../composables/useLivros';
    import { validarPreencimento } from '@/utils/validators';

    const route = useRoute();

    const livroId = route.params.id ? Number(route.params.id) : null;
    const modoEditar = ref(!!livroId);

    const { livro, carregando, erro, getLivro, getLivros, createLivro, updateLivro } = useLivros();

    const showAutorModal = ref(false);
    const showGeneroModal = ref(false);

    const { generos, carregando: carregandoGeneros, erro: erroGeneros, getGeneros } = useGeneros();
    const { autores, carregando: carregandoAutores, erro: erroAutores, getAutores } = useAutores();

    const livroForm = ref<LivroForm>({
        id: null,
        titulo: '',
        titulo_original: null,
        ano_publicacao: null,
        lido: false,
        autorId: null,
        generoId: null,
        arquivo_file: null,
        capa_file: null,
        capa_preview_url: null,
    });

    function mapearLivroParaForm(livro: Livro): LivroForm {
        return {
            id: livro.id,
            titulo: livro.titulo,
            titulo_original: livro.titulo_original,
            ano_publicacao: livro.ano_publicacao,
            lido: livro.lido,
            autorId: livro.autor?.id ? livro.autor.id : null,
            generoId: livro.genero?.id ? livro.genero.id : null,
            arquivo_file: null,
            capa_file: null,
            capa_preview_url: livro.capa,
        };
    }
    const alterarArquivo = (file: File | null) => {
        livroForm.value.arquivo_file = file;
    };

    const alterarCapa = (file: File | null) => {
        if (livroForm.value.capa_preview_url?.startsWith('blob:')) {
            URL.revokeObjectURL(livroForm.value.capa_preview_url);
        }

        if (file) {
            livroForm.value.capa_file = file;
            livroForm.value.capa_preview_url = URL.createObjectURL(file);
        } else {
            livroForm.value.capa_file = null;
            livroForm.value.capa_preview_url = null;
        }
    };

    const enviarLivro = async () => {
        try {
            if (livroId) {
                await updateLivro(livroId, livroForm.value);
            } else {
                await createLivro(livroForm.value);
            }
            await getLivros();
            history.back();
        } catch (error) {
            console.error('Falha ao salvar o livro:', error);
        }
    };

    const cancelarEdicao = () => {
        history.back();
    };

    onMounted(async () => {
        getAutores();
        getGeneros();
        if (livroId) {
            try {
                await getLivro(livroId);
                if (livro.value) {
                    livroForm.value = mapearLivroParaForm(livro.value);
                }
            } catch (error) {
                console.error('Erro ao buscar livro para edição:', error);
            }
        }
    });
</script>
