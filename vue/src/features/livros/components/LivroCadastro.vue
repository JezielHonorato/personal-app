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
                        <FormSelect class="flex-grow" id="autor" label="Autor" placeholder="Selecione um autor" :options="autores" v-model="livroForm.autor_id" :carregando="carregandoAutores" :erro="erroAutores[0]" cadastro="AutorCadastro" />
                    </div>
                    <div class="flex items-end gap-2">
                        <FormSelect class="flex-grow" id="genero" label="Gênero" placeholder="Selecione um gênero" :options="generos" v-model="livroForm.genero_id" cadastro="GeneroCadastro" :carregando="carregandoGeneros" :erro="erroGeneros[0]" />
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <FormNumberInput id="ano_publicacao" label="Ano de Publicação:" placeholder="Ex: 2023" v-model="livroForm.ano_publicacao" />
                    <div class="flex items-center mt-6"><FormCheckbox id="lido" label="Lido" v-model="livroForm.lido" /></div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <FormFileInput id="arquivo" label="Arquivo do livro" accept=".pdf, .md, .txt" :fileName="livroForm.arquivo?.name" />
                    <FormFileInput id="capa" label="Capa do livro" accept="image/*" />
                </div>

                <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                    <FormSubmitButton :carregando="carregando" textoCarregando="Salvando..." :texto="modoEditar ? 'Atualizar Livro' : 'Cadastrar Livro'" :habilitado="validarPreenchimento(livroForm.titulo)" />
                    <FormCancelButton />
                </div>

                <FormErro :erro="erro" />
            </form>

            <div v-else class="text-center p-8">Carregando dados do livro...</div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref, type Ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { FormCancelButton, FormCheckbox, FormErro, FormFileInput, FormNumberInput, FormSelect, FormSubmitButton, FormTextInput } from '@/components/form';
    import type { Livro, LivroForm } from '../models';
    import { useAutor, useGenero, useLivro } from '../composables';
    import { validarPreenchimento } from '@/utils/validators';

    const route = useRoute();

    const livroId: number | null = route.params.id ? Number(route.params.id) : null;
    const modoEditar: Ref<boolean> = ref(!!livroId);

    const { livro, carregando, erro, getLivro, createLivro, updateLivro } = useLivro();
    const { generos, carregando: carregandoGeneros, erro: erroGeneros, getGeneros } = useGenero();
    const { autores, carregando: carregandoAutores, erro: erroAutores, getAutores } = useAutor();

    const livroForm = ref<LivroForm>({
        id: null,
        titulo: '',
        titulo_original: null,
        autor_id: null,
        ano_publicacao: null,
        genero_id: null,
        lido: false,
        arquivo: null,
        capa: null,
    });

    function mapearLivroParaForm(livro: Livro): LivroForm {
        return {
            id: livro.id,
            titulo: livro.titulo,
            titulo_original: livro.titulo_original,
            ano_publicacao: livro.ano_publicacao,
            lido: livro.lido,
            autor_id: livro.autor?.id ?? null,
            genero_id: livro.genero?.id ?? null,
            arquivo: null,
            capa: null,
        };
    }

    async function enviarLivro(): Promise<void> {
        try {
            const formData = new FormData();
            formData.append('titulo', livroForm.value.titulo);
            formData.append('titulo_original', livroForm.value.titulo_original ?? '');
            formData.append('autor_id', livroForm.value.autor_id !== null ? livroForm.value.autor_id.toString() : '');
            formData.append('genero_id', livroForm.value.genero_id !== null ? livroForm.value.genero_id.toString() : '');
            formData.append('ano_publicacao', livroForm.value.ano_publicacao !== null ? livroForm.value.ano_publicacao.toString() : '');
            formData.append('lido', livroForm.value.lido ? '1' : '0');

            if (livroForm.value.arquivo) formData.append('arquivo', livroForm.value.arquivo);
            if (livroForm.value.capa) formData.append('capa', livroForm.value.capa);

            if (livroId) {
                await updateLivro(livroId, formData);
            } else {
                await createLivro(formData);
            }

            history.back();
        } catch (error) {
            console.error('Falha ao salvar o livro:', error);
        }
    }

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
