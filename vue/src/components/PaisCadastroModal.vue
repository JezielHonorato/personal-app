<template>
    <Modal :show="show" @close="$emit('close')" title="Cadastrar Novo País">
        <form @submit.prevent="handleSubmit">
            <div class="mb-4">
                <FormTextInput id="paisNome" label="Nome do País" placeholder="Ex: Brasil" v-model="paisForm.nome" />
            </div>
            <p v-if="submitError" class="text-red-500 text-sm mb-4">{{ submitError }}</p>
            <FormSubmitButton :loading="isSubmitting" text="Salvar País" loadingText="Salvando..." />
        </form>
    </Modal>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import Modal from './Modal.vue';
    import { FormTextInput, FormSubmitButton } from '@/components/form';
    import { usePaises } from '@/composables/useLivrosDatabase';
    import type { PaisForm } from '@/features/biblioteca/types';

    defineProps<{ show: boolean }>();
    const emit = defineEmits(['close', 'paisCriado']);

    const { create: createPais, error: submitError, carregando: isSubmitting } = usePaises();
    const paisForm = ref<PaisForm>({ nome: '' });

    const handleSubmit = async () => {
        if (!paisForm.value.nome) return;
        try {
            await createPais.create(paisForm.value);
            emit('paisCriado');
            emit('close');
            paisForm.value.nome = ''; // Limpa o formulário
        } catch (e) {
            // O erro já é tratado pelo 'submitError'
        }
    };
</script>
