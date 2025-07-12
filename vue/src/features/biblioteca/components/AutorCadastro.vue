<template>
    <div class="min-h-screen w-full bg-white dark:bg-gray-900">
        <div class="container mx-auto px-4 py-8 max-w-2xl">
            <h2 class="text-3xl font-extrabold mb-8 text-center text-gray-900 dark:text-white">
                {{ modoEditar ? 'Editar Autor' : 'Cadastrar Novo Autor' }}
            </h2>

            <form v-if="!carregando" @submit.prevent="enviarAutor" class="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <FormTextInput id="nome" label="Autor" placeholder="Nome do Autor" v-model="autorForm.nome" required />

                    <div class="flex items-end gap-2">
                        <FormSelect class="flex-grow" id="pais" label="Pais" placeholder="Selecione um pais" :options="paises" v-model="autorForm.paisId" cadastro="PaisCadastro" :carregando="carregandoPais" :erro="erroPais" />
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <FormNumberInput id="ano_nascimento" label="Ano de Nascimento:" placeholder="Ex: 2023" v-model="autorForm.ano_nascimento" />
                    <FormNumberInput id="ano_obito" label="Ano de Obito:" placeholder="Ex: 2023" v-model="autorForm.ano_obito" />
                </div>

                <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                    <FormSubmitButton :carregando="carregando" textoCarregando="Salvando..." :texto="modoEditar ? 'Atualizar Autor' : 'Cadastrar Autor'" :desabilitado="validarPreencimento(autorForm.nome)" />
                    <FormCancelButton />
                </div>

                <p v-if="erro" class="text-red-600 text-sm mt-6 text-center font-medium">{{ erro }}</p>
            </form>

            <div v-else class="text-center p-8">Carregando dados do autor...</div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { FormCancelButton, FormNumberInput, FormSelect, FormSubmitButton, FormTextInput } from '@/components/form';
    import type { Autor, AutorForm } from '../models/autorModel';
    import { useAutor, usePais } from '../composables';
    import { validarPreencimento } from '@/utils/validators';

    const route = useRoute();

    const autorId = route.params.id ? Number(route.params.id) : null;
    const modoEditar = ref(!!autorId);

    const { paises, carregando: carregandoPais, erro: erroPais, getPaises } = usePais();
    const { autor, carregando, erro, getAutor, getAutores, createAutor, updateAutor } = useAutor();

    const autorForm = ref<AutorForm>({
        id: null,
        nome: '',
        ano_nascimento: null,
        ano_obito: null,
        paisId: null,
    });

    function mapearLivroParaForm(autor: Autor): AutorForm {
        return {
            id: autor.id,
            nome: autor.nome,
            ano_nascimento: autor.ano_nascimento,
            ano_obito: autor.ano_obito,
            paisId: autor.pais?.id ?? null,
        };
    }

    const enviarAutor = async () => {
        try {
            if (autorId) {
                await updateAutor(autorId, autorForm.value);
            } else {
                await createAutor(autorForm.value);
            }
            await getAutores();
            history.back();
        } catch (error) {
            console.error('Falha ao salvar o autor:', error);
        }
    };

    onMounted(async () => {
        getPaises();
        if (autorId) {
            try {
                await getAutor(autorId);
                if (autor.value) {
                    autorForm.value = mapearLivroParaForm(autor.value);
                }
            } catch (error) {
                console.error('Erro ao buscar autor para edição:', error);
            }
        }
    });
</script>
