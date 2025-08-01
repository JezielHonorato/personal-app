<template>
    <div class="mt-5 min-h-screen w-full bg-white dark:bg-gray-900">
        <div class="bg-gray-100 dark:bg-gray-800 p-4 max-w-2xl mx-auto rounded-lg shadow-md">
            <h1 class="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-300">Conversor e Analisador Numérico</h1>

            <input v-model.number="numero" type="number" class="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 border dark:border-gray-700 mb-4 text-gray-800 dark:text-gray-200" placeholder="Digite um número..." />

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800 dark:text-gray-200">
                <div class="bg-white dark:bg-gray-700 rounded p-4">
                    <h2 class="font-semibold text-lg mb-2">Conversões</h2>
                    <p><strong>Binário:</strong> {{ numeroBinario }}</p>
                    <p><strong>Hexadecimal:</strong> {{ numeroHexadecimal }}</p>
                    <p><strong>Octal:</strong> {{ numeroOctal }}</p>
                </div>

                <div class="bg-white dark:bg-gray-700 rounded p-4">
                    <h2 class="font-semibold text-lg mb-2">Fatores</h2>
                    <p>{{ numeroDecomposto }}</p>
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
    const numeroExtenso = computed(() => escreverNumeroPorExtenso(numero.value));

    const numeroDecomposto = computed(() => {
        let valor = numero.value;
        const fatores = [];

        if (valor < 2) return 'O número precisa ser maior ou igual a 2.';
        

        while (valor % 2 === 0) {
            fatores.push(2);
            valor /= 2;
        }

        for (let i = 3; i * i <= valor; i += 2) {
            while (valor % i === 0) {
                fatores.push(i);
                valor /= i;
            }
        }

        if (valor > 2) {
            fatores.push(valor);
        }

        if (fatores.length === 1) {
            return 'O número é primo.';
        }

        return fatores.join(' x ');
    });
    function escreverNumeroPorExtenso(valor: number): string {
        if (valor === 0) return 'zero';
        if (valor < 0 || valor > 999999999999) return 'Fora do intervalo suportado';

        const unidades: string[] = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
        const dezenas: string[] = ['', 'dez', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
        const dezenasEspeciais: string[] = ['dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
        const centenas: string[] = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];
        const escalas: string[] = ['', 'mil', 'milhões', 'bilhões'];

        function converterCentena(num: number): string {
            let parte: string = '';
            const centena: number = Math.floor(num / 100);
            const resto: number = num % 100;

            if (centena === 1 && resto === 0) parte += 'cem';
            else if (centena > 0) parte += centenas[centena];

            if (centena > 0 && resto > 0) parte += ' e ';

            if (resto > 0 && resto < 20) {
                parte += resto < 10 ? unidades[resto] : dezenasEspeciais[resto - 10];
            } else if (resto >= 20) {
                const dezena = Math.floor(resto / 10);
                const unidade = resto % 10;
                parte += dezenas[dezena];

                if (unidade > 0) parte += ' e ' + unidades[unidade];
            }

            return parte;
        }

        let resultado: string = '';
        let i: number = 0;

        while (valor > 0) {
            const bloco = valor % 1000;

            if (bloco > 0) {
                let parte = converterCentena(bloco);

                if (bloco === 1 && i === 1) parte = 'mil';
                else if (bloco > 1 && i > 0) parte += ' ' + escalas[i];
                else if (bloco === 1 && i > 1) parte = 'um ' + escalas[i].replace('ões', 'ão');
                else if (i > 0) parte += ' ' + escalas[i];

                resultado = resultado ? parte + ' ' + resultado : parte;
            }
            valor = Math.floor(valor / 1000);
            i++;
        }

        const partes = resultado.split(' ');

        if (partes.length > 1 && partes[partes.length - 2] !== 'mil' && partes[partes.length - 2] !== 'milhões') {
            const ultimoGrupo = converterCentena(valor % 1000);

            if (ultimoGrupo) {
                const ultimaPalavra = partes[partes.length - 1];

                if (ultimaPalavra !== 'zero') {
                    resultado = resultado.replace(' ' + ultimaPalavra, ' e ' + ultimaPalavra);
                }
            }
        }

        return resultado;
    }
</script>

<style scoped>
    input[type='number']::-webkit-inner-spin-button {
        margin: 0;
    }
</style>
