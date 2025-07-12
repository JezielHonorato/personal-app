<template>
    <div class="min-h-screen w-full bg-white dark:bg-gray-900">
        <div class="container mx-auto px-4 py-8 max-w-2xl">
            <h2 class="text-3xl font-extrabold mb-8 text-center text-gray-900 dark:text-white">
                {{ modoEditar ? 'Editar Gênero' : 'Cadastrar Novo Gênero' }}
            </h2>

            <form v-if="!carregando" @submit.prevent="enviarGenero" class="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <FormTextInput id="nome" label="Gênero" placeholder="Nome do Gênero" v-model="generoForm.nome" required />

                <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                    <FormSubmitButton :carregando="carregando" textoCarregando="Salvando..." :texto="modoEditar ? 'Atualizar Livro' : 'Cadastrar Livro'" :desabilitado="validarPreencimento(generoForm.nome)" />
                    <FormCancelButton />
                </div>

                <p v-if="erro" class="text-red-600 text-sm mt-6 text-center font-medium">{{ erro }}</p>
            </form>

            <div v-else class="text-center p-8">Carregando dados do gênero...</div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { FormCancelButton, FormSubmitButton, FormTextInput } from '@/components/form';
    import type { Genero, GeneroForm } from '../models';
    import { useGenero } from '../composables';
    import { validarPreencimento } from '@/utils/validators';

    const route = useRoute();

    const generoId = route.params.id ? Number(route.params.id) : null;
    const modoEditar = ref(!!generoId);

    const { genero, carregando, erro, getGenero, getGeneros, createGenero, updateGenero } = useGenero();

    const generoForm = ref<GeneroForm>({
        id: null,
        nome: '',
    });

    function mapearLivroParaForm(genero: Genero): GeneroForm {
        return {
            id: genero.id,
            nome: genero.nome,
        };
    }

    const enviarGenero = async () => {
        try {
            if (generoId) {
                await updateGenero(generoId, generoForm.value);
            } else {
                await createGenero(generoForm.value);
            }
            await getGeneros();
            history.back();
        } catch (error) {
            console.error('Falha ao salvar o gênero:', error);
        }
    };

    onMounted(async () => {
        if (generoId) {
            try {
                await getGenero(generoId);
                if (genero.value) {
                    generoForm.value = mapearLivroParaForm(genero.value);
                }
            } catch (error) {
                console.error('Erro ao buscar livro para edição:', error);
            }
        }
    });
</script>
