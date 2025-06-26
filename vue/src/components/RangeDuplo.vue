<template>
    <div class="campos-pesquisa">
        <section class="range-value-input flex justify-between items-center mb-2">
            <p class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ label }}</p>
            <p class="valores-input text-sm text-gray-700 dark:text-gray-300 font-semibold">
                <span class="valor_input">{{ novoValorInicial }}</span> - <span class="valor_input">{{ novoValorFinal }}</span>
            </p>
        </section>

        <section class="campos-input campo-range relative h-2 flex items-center">
            <div class="absolute w-full h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>

            <div class="linha-progresso absolute h-1 rounded-full bg-indigo-500 dark:bg-indigo-400" :style="progressStyle"></div>

            <input type="range" :min="min" :max="max" v-model.number="novoValorInicial" @input="updateRange" class="Periodo absolute w-full h-full appearance-none bg-transparent outline-none z-10" />
            <input type="range" :min="min" :max="max" v-model.number="novoValorFinal" @input="updateRange" class="Periodo absolute w-full h-full appearance-none bg-transparent outline-none z-10" />
        </section>
    </div>
</template>

<script lang="ts" setup>
    import { ref, computed, watch } from 'vue';

    const props = defineProps<{
        label: string;
        min: number;
        max: number;
        valorInicial: number;
        valorFinal: number;
    }>();

    const emit = defineEmits(['update:valorInicial', 'update:valorFinal']);

    const novoValorInicial = ref(props.valorInicial);
    const novoValorFinal = ref(props.valorFinal);

    watch(
        () => props.valorInicial,
        (newVal) => {
            novoValorInicial.value = newVal;
        }
    );
    watch(
        () => props.valorFinal,
        (newVal) => {
            novoValorFinal.value = newVal;
        }
    );

    const updateRange = () => {
        emit('update:valorInicial', novoValorInicial.value);
        emit('update:valorFinal', novoValorFinal.value);
    };

    const progressStyle = computed(() => {
        const range = props.max - props.min;
        const visualStart = Math.min(novoValorInicial.value, novoValorFinal.value);
        const visualEnd = Math.max(novoValorInicial.value, novoValorFinal.value);

        const left = ((visualStart - props.min) / range) * 100;
        const width = ((visualEnd - visualStart) / range) * 100;

        return {
            left: `${left}%`,
            width: `${width}%`,
        };
    });
</script>

<style scoped>
    .Periodo {
        pointer-events: none;
        background: transparent;
    }

    input[type='range']::-webkit-slider-thumb {
        -webkit-appearance: none;
        pointer-events: auto;
        height: 18px;
        width: 18px;
        border-radius: 50%;
        background: #6366f1;
        cursor: grab;
        position: relative;
        z-index: 20;
        border: 2px solid #fff;
        box-shadow:
            0 1px 3px rgba(0, 0, 0, 0.1),
            0 1px 2px rgba(0, 0, 0, 0.06);
        transition:
            background 0.2s ease-in-out,
            box-shadow 0.2s ease-in-out;
    }

    input[type='range']::-moz-range-thumb {
        pointer-events: auto;
        height: 18px;
        width: 18px;
        border-radius: 50%;
        background: #6366f1;
        cursor: grab;
        position: relative;
        z-index: 20;
        border: 2px solid #fff;
        box-shadow:
            0 1px 3px rgba(0, 0, 0, 0.1),
            0 1px 2px rgba(0, 0, 0, 0.06);
        transition:
            background 0.2s ease-in-out,
            box-shadow 0.2s ease-in-out;
    }

    /* Hover effect para o thumb */
    input[type='range']::-webkit-slider-thumb:hover {
        background: #4f46e5;
        box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.3);
    }

    .dark input[type='range']::-webkit-slider-thumb {
        background: #818cf8;
        border: 2px solid #1f2937;
    }

    .dark input[type='range']::-webkit-slider-thumb:hover {
        background: #6366f1;
        box-shadow: 0 0 0 4px rgba(129, 140, 248, 0.3);
    }

    input[type='range']::-moz-range-thumb:hover {
        background: #4f46e5;
        box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.3);
    }

    .dark input[type='range']::-moz-range-thumb {
        background: #818cf8;
        border: 2px solid #1f2937;
    }

    .dark input[type='range']::-moz-range-thumb:hover {
        background: #6366f1;
        box-shadow: 0 0 0 4px rgba(129, 140, 248, 0.3);
    }

    .linha-progresso {
        z-index: 15;
    }
</style>
