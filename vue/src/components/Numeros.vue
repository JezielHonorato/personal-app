<template>
    <div class="mt-5 min-h-screen w-full bg-white dark:bg-gray-900">
        <div class="bg-gray-100 dark:bg-gray-800 p-4 max-w-2xl mx-auto rounded-lg shadow-md">
            <h1 class="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-300">Conversor e Analisador Numérico</h1>

            <input v-model="numeroStr" type="text" class="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 border dark:border-gray-700 mb-4 text-gray-800 dark:text-gray-200" placeholder="Digite um número..." />

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800 dark:text-gray-200">
                <div class="bg-white dark:bg-gray-700 rounded p-4">
                    <h2 class="font-semibold text-lg mb-2">Conversões</h2>
                    <div class="space-y-2">
                        <div class="flex justify-between items-center">
                            <p class="break-all"><strong>Binário:</strong> {{ numeroBinario }}</p>
                            <button @click="copiarConteudo(numeroBinario)" class="ml-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none">
                                <Copy class="w-4 h-4" />
                            </button>
                        </div>
                        <div class="flex justify-between items-center">
                            <p class="break-all"><strong>Hexadecimal:</strong> {{ numeroHexadecimal }}</p>
                            <button @click="copiarConteudo(numeroHexadecimal)" class="ml-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none">
                                <Copy class="w-4 h-4" />
                            </button>
                        </div>
                        <div class="flex justify-between items-center">
                            <p class="break-all"><strong>Octal:</strong> {{ numeroOctal }}</p>
                            <button @click="copiarConteudo(numeroOctal)" class="ml-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none">
                                <Copy class="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div class="bg-white dark:bg-gray-700 rounded p-4">
                    <h2 class="font-semibold text-lg mb-2">Fatores</h2>
                    <div class="flex justify-between items-center">
                        <p>{{ numeroDecomposto }}</p>
                        <button @click="copiarConteudo(numeroDecomposto)" class="ml-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none">
                            <Copy class="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div class="bg-white dark:bg-gray-700 rounded p-4 md:col-span-2">
                    <h2 class="font-semibold text-lg mb-2">Número por Extenso</h2>
                    <div class="flex justify-between items-center">
                        <p>{{ numeroExtenso }}</p>
                        <button @click="copiarConteudo(numeroExtenso)" class="ml-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-6a2 2 0 00-2 2z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7v6a2 2 0 01-2 2h-6a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2zM8 7V5a2 2 0 012-2h6a2 2 0 012 2v2M8 7H6a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2v-2"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed, type Ref } from 'vue';
    import { Copy } from 'lucide-vue-next';

    const numeroStr: Ref<string> = ref('0');

    const numeroBinario = computed(() => {
        try {
            return parseInt(numeroStr.value, 10).toString(2) || '0';
        } catch (e) {
            return 'Entrada inválida';
        }
    });

    const numeroHexadecimal = computed(() => {
        try {
            return parseInt(numeroStr.value, 10).toString(16).toUpperCase() || '0';
        } catch (e) {
            return 'Entrada inválida';
        }
    });

    const numeroOctal = computed(() => {
        try {
            return parseInt(numeroStr.value, 10).toString(8) || '0';
        } catch (e) {
            return 'Entrada inválida';
        }
    });

    const numeroExtenso = computed(() => escreverNumeroPorExtenso(numeroStr.value));

    const numeroDecomposto = computed(() => {
        const valor = parseInt(numeroStr.value, 10);
        if (isNaN(valor)) return 'Entrada inválida';

        if (valor < 2) return 'O número precisa ser maior ou igual a 2.';

        const fatores = [];
        let tempValor = valor;

        while (tempValor % 2 === 0) {
            fatores.push(2);
            tempValor /= 2;
        }

        for (let i = 3; i * i <= tempValor; i += 2) {
            while (tempValor % i === 0) {
                fatores.push(i);
                tempValor /= i;
            }
        }

        if (tempValor > 2) {
            fatores.push(tempValor);
        }

        if (fatores.length === 1) {
            return 'O número é primo.';
        }

        return fatores.join(' x ');
    });

    function escreverNumeroPorExtenso(nStr: string): string {
        const n = nStr.replace(/[^0-9]/g, '');

        if (n === '0') return 'zero';
        if (n.length > 24) return 'Número muito grande para ser processado.';

        const unidades = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
        const dezenas = ['', 'dez', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
        const dezenasEspeciais = ['dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
        const centenas = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];
        const escalas = ['', 'mil', 'milhões', 'bilhões', 'trilhões', 'quatrilhões', 'quintilhões', 'sextilhões'];
        const escalasSingular = ['', 'mil', 'milhão', 'bilhão', 'trilhão', 'quatrilhão', 'quintilhão', 'sextilhão'];

        function converterCentena(numStr: string): string {
            const num = Number(numStr);
            let parte = '';
            const c = Math.floor(num / 100);
            const r = num % 100;

            if (c === 1 && r === 0) parte += 'cem';
            else if (c > 0) parte += centenas[c];

            if (c > 0 && r > 0) parte += ' e ';

            if (r > 0 && r < 20) {
                parte += r < 10 ? unidades[r] : dezenasEspeciais[r - 10];
            } else if (r >= 20) {
                const dezena = Math.floor(r / 10);
                const unidade = r % 10;
                parte += dezenas[dezena];
                if (unidade > 0) parte += ' e ' + unidades[unidade];
            }
            return parte;
        }

        let resultado = '';
        let i = 0;

        let nReversed = n.split('').reverse().join('');

        while (i * 3 < n.length) {
            let blocoStr = nReversed
                .substring(i * 3, i * 3 + 3)
                .split('')
                .reverse()
                .join('');
            const bloco = Number(blocoStr);

            if (bloco > 0) {
                let parte = converterCentena(bloco.toString());

                if (i === 1) {
                    parte = bloco === 1 ? 'mil' : parte + ' mil';
                } else if (i > 1) {
                    const escala = bloco === 1 ? escalasSingular[i] : escalas[i];
                    parte += ' ' + escala;
                }

                if (resultado) {
                    const ultimoBloco = Number(nReversed.substring(0, 3).split('').reverse().join(''));
                    if (i > 0 && ultimoBloco > 0 && ultimoBloco < 100) {
                        resultado = parte + ' e ' + resultado;
                    } else {
                        resultado = parte + ' ' + resultado;
                    }
                } else {
                    resultado = parte;
                }
            }
            i++;
        }

        return resultado.trim();
    }

    async function copiarConteudo(texto: string) {
        try {
            await navigator.clipboard.writeText(texto);
            alert('Copiado para a área de transferência!');
        } catch (err) {
            console.error('Falha ao copiar: ', err);
        }
    }
</script>

<style scoped>
    input[type='text']::-webkit-inner-spin-button,
    input[type='text']::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
</style>
