<template>
    <p v-if="erro" class="text-red-600 dark:text-red-400 text-sm mt-6 text-center font-medium bg-red-100 dark:bg-red-900/40 p-2 rounded">
        {{ erro }}
    </p>
</template>

<script setup lang="ts">
    defineProps<{
        erro: string | null;
    }>();
</script>
