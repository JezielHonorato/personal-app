<template>
    <button type="button" @click="voltar" class="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg">{{ texto ?? 'Cancelar' }}</button>
</template>

<script setup lang="ts">
    defineProps<{
        texto?: string;
    }>();

    const voltar = (): void => {
        history.back();
    };
</script>
