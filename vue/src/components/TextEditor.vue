<template>
    <div class="mt-5 min-h-screen w-full bg-white dark:bg-gray-900">
        <div class="bg-gray-100 dark:bg-gray-800 p-4 max-w-2xl mx-auto rounded-lg shadow-md">
            <h1 class="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-300">Editor de Texto</h1>

            <textarea v-model="text" rows="10" class="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 border dark:border-gray-700 mb-4 text-gray-800 dark:text-gray-200" placeholder="Digite ou cole seu texto aqui..." aria-label="Área de edição de texto"></textarea>

            <div class="flex flex-wrap gap-2 mb-4">
                <button @click="toUpperCase" class="p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600">Maiúsculas</button>
                <button @click="toLowerCase" class="p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600">Minúsculas</button>
                <button @click="toTitleCase" class="p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600">Title Case</button>
                <button @click="toSentenceCase" class="p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600">Sentence Case</button>
                <button @click="invertCase" class="p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600">Inverter Caixas</button>
                <button @click="randomizeCase" class="p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600">Randomizar Caixas</button>
                <button @click="inverterTexto" class="p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600">Inverter Texto</button>
                <button @click="clearText" class="p-2 rounded bg-red-500 text-white hover:bg-red-600">Limpar</button>
            </div>

            <div class="p-4 rounded bg-gray-100 dark:bg-gray-800 border dark:border-gray-700 text-gray-700 dark:text-gray-300">
                <p><strong>Contagem de Caracteres:</strong> {{ numeroCaracteres }}</p>
                <p><strong>Contagem de Palavras:</strong> {{ numeroPalavras }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, computed, type Ref, type ComputedRef } from 'vue';

    const text: Ref<string> = ref('');

    const numeroCaracteres: ComputedRef<number> = computed(() => text.value.length);

    const numeroPalavras: ComputedRef<number> = computed(() => {
        if (!text.value.trim()) return 0;
        return text.value.trim().split(/\s+/).length;
    });

    function toUpperCase(): void {
        text.value = text.value.toUpperCase();
    }

    function toLowerCase(): void {
        text.value = text.value.toLowerCase();
    }

    function toTitleCase(): void {
        text.value = text.value
            .toLowerCase()
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    function toSentenceCase(): void {
        text.value = text.value
            .toLowerCase()
            .split('. ')
            .map((sentence) => sentence.charAt(0).toUpperCase() + sentence.slice(1))
            .join('. ');
    }

    function invertCase(): void {
        text.value = Array.from(text.value)
            .map((char) => (char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()))
            .join('');
    }

    function randomizeCase(): void {
        text.value = Array.from(text.value)
            .map((char) => (Math.random() < 0.5 ? char.toLowerCase() : char.toUpperCase()))
            .join('');
    }

    function inverterTexto(): void {
        text.value = text.value.split('').reverse().join('');
    }

    function clearText(): void {
        text.value = '';
    }
</script>
