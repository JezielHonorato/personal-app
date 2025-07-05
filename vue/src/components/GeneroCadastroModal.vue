<template>
    <div>
        <Modal :show="show" @close="$emit('close')" title="Cadastrar Novo Autor">
            <form @submit.prevent="handleSubmit">
                <div class="space-y-4">
                    <FormTextInput id="autorNome" label="Nome do Autor" placeholder="Ex: J.R.R. Tolkien" v-model="autorForm.nome" />

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormTextInput id="dataNascimento" type="date" label="Data de Nascimento" v-model="autorForm.data_nascimento" />
                        <FormTextInput id="dataObito" type="date" label="Data de Falecimento" v-model="autorForm.data_obito" />
                    </div>

                    <div class="flex items-end gap-2">
                        <FormSelect class="flex-grow" id="pais" label="País de Origem" placeholder="Selecione um país" :options="paises" v-model="autorForm.pais_id" :loading="carregandoPaises" :error="errorPaises || undefined" />
                        <button @click="showPaisModal = true" type="button" class="h-10 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg">+</button>
                    </div>
                </div>

                <p v-if="submitError" class="text-red-500 text-sm mt-4">{{ submitError }}</p>
                <div class="mt-6">
                    <FormSubmitButton :loading="isSubmitting" text="Salvar Autor" loadingText="Salvando..." class="w-full" />
                </div>
            </form>
        </Modal>

        <PaisCadastroModal :show="showPaisModal" @close="showPaisModal = false" @paisCriado="fetchPaises" />
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import Modal from './Modal.vue';
    import { FormTextInput, FormSubmitButton, FormSelect } from '@/components/form';
    import { useAutorForm } from '@/composables/useAutorForm';
    import { usePaises } from '@/composables/useDatabaseLivros';
    import PaisCadastroModal from './PaisCadastroModal.vue'; // Importa o novo modal

    defineProps<{ show: boolean }>();
    const emit = defineEmits(['close', 'autorCriado']);

    // Lógica para o modal de país
    const showPaisModal = ref(false);

    const { data: paises, carregando: carregandoPaises, error: errorPaises, fetch: fetchPaises } = usePaises();
    const {
        autorForm,
        isSubmitting,
        submitError,
        handleSubmit: handleAutorSubmit,
        resetForm,
    } = useAutorForm({
        autorParaEditar: null,
        onSuccess: () => {
            emit('autorCriado');
            emit('close');
            resetForm();
        },
    });

    const handleSubmit = async () => {

		await handleAutorSubmit();
    };

    onMounted(() => {
        fetchPaises();
    });
</script>
