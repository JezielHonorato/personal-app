<template>
    <div class="mt-5 min-h-screen w-full bg-white dark:bg-gray-900">
        <div class="bg-gray-100 dark:bg-gray-800 p-4 max-w-2xl mx-auto rounded-lg shadow-md">
            <h1 class="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-300">Conversor e Analisador Numérico</h1>

            <input v-model.number="numero" type="number" :max="1000000" @input="validarNumero" class="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 border dark:border-gray-700 mb-4 text-gray-800 dark:text-gray-200" placeholder="Digite um número..." />

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800 dark:text-gray-200">
                <div class="bg-white dark:bg-gray-700 rounded p-4">
                    <h2 class="font-semibold text-lg mb-2">Conversões</h2>
                    <p><strong>Binário:</strong> {{ numeroBinario }}</p>
                    <p><strong>Hexadecimal:</strong> {{ numeroHexadecimal }}</p>
                    <p><strong>Octal:</strong> {{ numeroOctal }}</p>
                </div>

                <div class="bg-white dark:bg-gray-700 rounded p-4">
                    <h2 class="font-semibold text-lg mb-2">Fatores</h2>
                    <p v-if="fatores.length === 1">O número é primo</p>
                    <p v-else>{{ fatores.join(' x ') || '-' }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed, type Ref } from 'vue';

    const numero: Ref<number> = ref(0);

    const numeroBinario = computed(() => numero.value.toString(2));
    const numeroHexadecimal = computed(() => numero.value.toString(16).toUpperCase());
    const numeroOctal = computed(() => numero.value.toString(8));

    const fatores = computed(() => {
        let n = numero.value;
        const res: number[] = [];
        let divisor = 2;
        while (n > 1) {
            if (n % divisor === 0) {
                res.push(divisor);
                n /= divisor;
            } else {
                divisor++;
            }
        }
        return res;
    });

    function validarNumero(e: Event) {
        const target = e.target as HTMLInputElement;
        if (Number(target.value) > 1000000) {
            numero.value = 1000000;
        }
    }
</script>

<style scoped>
    input[type='number']::-webkit-inner-spin-button {
        margin: 0;
    }
</style>
