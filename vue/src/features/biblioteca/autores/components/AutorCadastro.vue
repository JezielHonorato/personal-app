<template>
    <div>
        <Modal :show="show" @close="$emit('close')" title="Cadastrar Novo Autor">
            <form @submit.prevent="enviarLivro">
                <div class="space-y-4">
                    <FormTextInput id="autorNome" label="Nome do Autor" placeholder="Nome do autor" v-model="autorForm.nome" />

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormNumberInput id="anoNascimento" label="Ano de Nascimento" v-model="autorForm.ano_nascimento" />
                        <FormNumberInput id="anoObito" label="Ano de Falecimento" v-model="autorForm.ano_obito" />
                    </div>

                    <div class="flex items-end gap-2">
                        <FormSelect class="flex-grow" id="pais" label="País de Origem" placeholder="Selecione um país" :options="paises" v-model="autorForm.pais_id" :loading="carregandoPaises" :error="erroPaises" />
                        <button @click="showPaisModal = true" type="button" class="h-10 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg">+</button>
                    </div>
                </div>

                <p v-if="validationError" class="text-red-500 text-sm mt-4">{{ validationError }}</p>
                <p v-if="submitError" class="text-red-500 text-sm mt-4">{{ submitError }}</p>

                <div class="mt-6">
                    <FormSubmitButton :loading="carregando" text="Salvar Autor" loadingText="Salvando..." class="w-full" />
                </div>
            </form>
        </Modal>

        <PaisCadastroModal :show="showPaisModal" @close="showPaisModal = false" @paisCriado="getPaises" />
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import Modal from './Modal.vue';
    import { FormNumberInput, FormTextInput, FormSubmitButton, FormSelect } from '@/components/form';
    import { useAutores } from '../composables/useAutores';
    import { usePaises } from '@/features/biblioteca/paises/composables/usePaises';

    import PaisCadastroModal from './PaisCadastroModal.vue';

    defineProps<{ show: boolean }>();
    const emit = defineEmits(['close', 'autorCriado']);

    const showPaisModal = ref(false);
    const validationError = ref<string | null>(null);

    const { autor, carregando, erro, getAutores } = useAutores();
    const { paises, carregando: carregandoPaises, erro: erroPaises, getPaises } = usePaises();
    const {
        autorForm,
        submitError,
        enviarAutor: enviarAutor,
    } = useAutorForm({
        autorParaEditar: null,
        onSuccess: () => {
            emit('close');
        },
    });

    const handleSubmit = async () => {
        validationError.value = null;

        if (!autorForm.value.nome) {
            validationError.value = 'O nome do autor é obrigatório.';
            return;
        }

        await enviarAutor();
    };
	    const enviarLivro = async () => {
        try {
            if (livroId) {
                await updateLivro(livroId, livroForm.value);
            } else {
                await createLivro(livroForm.value);
            }
            await getAutores();
            router.push('/livros');
        } catch (error) {
            console.error('Falha ao salvar o livro:', error);
        }
    };

    onMounted(() => {
        getPaises();
    });
</script>
