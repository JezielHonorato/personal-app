<template>
    <div class="mt-5 min-h-screen w-full bg-white dark:bg-gray-900">
        <div class="bg-gray-100 dark:bg-gray-800 p-4 max-w-2xl mx-auto rounded-lg shadow-md">
            <h1 class="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-300">Conversor e Analisador Numérico</h1>

            <input v-model.number="numero" type="number" :max="1000000" @input="validarNumero" @keydown="bloquearCaracteresInvalidos" class="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 border dark:border-gray-700 mb-4 text-gray-800 dark:text-gray-200" placeholder="Digite um número..." />

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

                <div class="bg-white dark:bg-gray-700 rounded p-4 md:col-span-2">
                    <h2 class="font-semibold text-lg mb-2">Número por Extenso</h2>
                    <p>{{ numeroExtenso }}</p>
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
        let n: number = numero.value;
        const fatores: number[] = [];
        let divisor: number = 2;
        while (n > 1) {
            if (n % divisor === 0) {
                fatores.push(divisor);
                n /= divisor;
            } else {
                divisor++;
            }
        }
        return fatores;
    });

    function validarNumero(e: Event): void {
        const target = e.target as HTMLInputElement;
        if (Number(target.value) > 1000000) {
            numero.value = 1000000;
        }
    }

    function bloquearCaracteresInvalidos(event: KeyboardEvent): void {
        const tecla: string = event.key;

        const permitido: RegExp = /^[0-9]$/;
        const teclasControle: string[] = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];

        if (!permitido.test(tecla) && !teclasControle.includes(tecla)) {
            event.preventDefault();
        }
    }

    function escreverNumero(n: number): string {
        if (n < 0 || n > 1_000_000) return 'Fora do intervalo suportado';

        const unidades: string[] = ['zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
        const dezenas: string[] = ['dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
        const dezenasMultiplo: string[] = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
        const centenas: string[] = ['', 'cem', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];

        if (n === 1_000_000) return 'um milhão';

        function escreverNumeroMilhar(num: number): string {
            let texto: string = '';
            const centena: number = Math.floor(num / 100);
            const dezena: number = Math.floor((num % 100) / 10);
            const unidade: number = num % 10;

            if (centena > 0) {
                texto += centena === 1 && (dezena > 0 || unidade > 0) ? 'cento' : centenas[centena];
            }

            if (dezena === 1) {
                texto += texto ? ' e ' : '';
                texto += dezenas[unidade];
            } else {
                if (dezena > 1) {
                    texto += texto ? ' e ' : '';
                    texto += dezenasMultiplo[dezena];
                }
                if (unidade > 0) {
                    texto += texto ? ' e ' : '';
                    texto += unidades[unidade];
                }
            }

            if (!texto && unidade === 0) return 'zero';
            return texto;
        }

        const milhar: number = Math.floor(n / 1000);
        const resto: number = n % 1000;

        let resultado: string = '';
        if (milhar > 0) {
            if (milhar === 1) resultado += 'mil';
            else resultado += escreverNumeroMilhar(milhar) + ' mil';
        }

        if (resto > 0) {
            resultado += ' e ' + escreverNumeroMilhar(resto);
        }

        return resultado;
    }

    const numeroExtenso = computed(() => escreverNumero(numero.value));
</script>

<style scoped>
    input[type='number']::-webkit-inner-spin-button {
        margin: 0;
    }
</style>
