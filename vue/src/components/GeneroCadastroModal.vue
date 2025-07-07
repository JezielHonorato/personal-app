<template>
    <Modal :show="show" @close="$emit('close')" title="Cadastrar Novo Gênero">
        <form @submit.prevent="handleSubmit">
            <div class="mb-4">
                <FormTextInput id="generoNome" label="Nome do Gênero" placeholder="Nome do Gênero" v-model="generoForm.nome" />
            </div>
            <p v-if="submitError" class="text-red-500 text-sm mb-4">{{ submitError }}</p>
            <FormSubmitButton :loading="isSubmitting" text="Salvar Gênero" loadingText="Salvando..." />
        </form>
    </Modal>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import Modal from './Modal.vue';
    import { FormTextInput, FormSubmitButton } from '@/components/form';
    import { useGeneros } from '@/composables/useLivrosDatabase';
    import type { GeneroForm } from '@/types';

    defineProps<{ show: boolean }>();
    const emit = defineEmits(['close', 'generoCriado']);

    const { create: createGenero, error: submitError, carregando: isSubmitting } = useGeneros();
    const generoForm = ref<GeneroForm>({ nome: '' });

    const handleSubmit = async () => {
        if (!generoForm.value.nome) return;
        try {
            await createGenero.create(generoForm.value);
            emit('generoCriado');
            emit('close');
            generoForm.value.nome = ''; // Limpa o formulário
        } catch (e) {
            // O erro já é tratado pelo 'submitError'
        }
    };
</script>
