<template>
    <div v-if="erro && erro.length" class="text-red-600 dark:text-red-400 text-sm mt-6 text-center font-medium bg-red-100 dark:bg-red-900/40 p-2 rounded">
        <p v-for="(mensagem, index) in erro" :key="index" class="mb-1">
            {{ mensagem }}
        </p>
    </div>
</template>

<script setup lang="ts">
    defineProps<{
        erro: string[] | null;
    }>();
</script>
