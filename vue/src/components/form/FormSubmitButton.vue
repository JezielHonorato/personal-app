<template>
    <button type="submit" :disabled="carregando || !habilitado" class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 transition duration-200 ease-in-out transform hover:-translate-y-0.5 dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:ring-blue-400">
        {{ carregando ? (textoCarregando ?? 'Carregando') : texto }}
    </button>
</template>

<script setup lang="ts">
    defineProps<{
        texto: string;
        carregando: boolean;
        textoCarregando?: string;
        habilitado?: boolean;
    }>();
</script>
