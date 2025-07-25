<template>
    <div class="mt-5 min-h-screen w-full bg-white dark:bg-gray-900">
        <div class="bg-gray-100 dark:bg-gray-800 p-4 max-w-2xl mx-auto rounded-lg shadow-md">
            <h1 class="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-300">Sorteio de Nome Aleatório</h1>

            <button @click="sortearNome" class="p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 mb-4">Sortear Nome</button>

            <div v-if="nomeSorteado" class="p-4 rounded bg-gray-100 dark:bg-gray-800 border dark:border-gray-700 text-gray-700 dark:text-gray-300">
                <p class="text-xl font-semibold">Nome Sorteado: {{ nomeSorteado }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import nomes from '@/assets/duplo-sentido.json';

    const nomeSorteado = ref<string | null>(null);

    function sortearNome() {
        const index = Math.floor(Math.random() * nomes.length);
        nomeSorteado.value = nomes[index];
    }
</script>

<style scoped></style>
