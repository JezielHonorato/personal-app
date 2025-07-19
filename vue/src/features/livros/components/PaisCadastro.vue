<template>
    <div class="min-h-screen w-full bg-white dark:bg-gray-900">
        <div class="container mx-auto px-4 py-8 max-w-2xl">
            <h2 class="text-3xl font-extrabold mb-8 text-center text-gray-900 dark:text-white">
                {{ modoEditar ? 'Editar Pais' : 'Cadastrar Novo Pais' }}
            </h2>

            <form v-if="!carregando" @submit.prevent="enviarPais" class="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <FormTextInput id="nome" label="Pais" placeholder="Nome do Pais" v-model="paisForm.nome" required />

                <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                    <FormSubmitButton :carregando="carregando" textoCarregando="Salvando..." :texto="modoEditar ? 'Atualizar Pais' : 'Cadastrar Pais'" :desabilitado="validarPreenchimento(paisForm.nome)" />
                    <FormCancelButton />
                </div>

                <FormErro :erro="erro" />
            </form>

            <div v-else class="text-center p-8">Carregando dados do gênero...</div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref, type Ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { FormCancelButton, FormErro, FormSubmitButton, FormTextInput } from '@/components/form';
    import type { Pais, PaisForm } from '../models';
    import { usePais } from '../composables';
    import { validarPreenchimento, validarNome } from '@/utils/validators';

    const route = useRoute();

    const paisId: number | null = route.params.id ? Number(route.params.id) : null;
    const modoEditar: Ref<boolean> = ref(!!paisId);

    const { pais, carregando, erro, getPais, createPais, updatePais } = usePais();

    const paisForm: Ref<PaisForm> = ref<PaisForm>({
        id: null,
        nome: '',
    });

    function mapearPaisParaForm(pais: Pais): PaisForm {
        return {
            id: pais.id,
            nome: pais.nome,
        };
    }

    async function enviarPais() {
        if (!validarNome(paisForm.value.nome)) {
            erro.value = 'O título do livro deve ser composto por letras e/ou pontos!';
            return;
        }

        try {
            if (paisId) {
                await updatePais(paisId, paisForm.value);
            } else {
                await createPais(paisForm.value);
            }
            history.back();
        } catch (error) {
            console.error('Falha ao salvar o gênero:', error);
        }
    }

    onMounted(async () => {
        if (paisId) {
            try {
                await getPais(paisId);
                if (pais.value) {
                    paisForm.value = mapearPaisParaForm(pais.value);
                }
            } catch (error) {
                console.error('Erro ao buscar pais para edição:', error);
            }
        }
    });
</script>
