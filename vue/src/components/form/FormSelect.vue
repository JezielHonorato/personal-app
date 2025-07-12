<template>
    <div>
        <label :for="id" class="flex justify-between text-gray-800 text-sm font-semibold mb-2 dark:text-gray-200">
            {{ label }}:
            <span v-if="cadastro" @click="cadastrar" class="text-blue-600 hover:text-blue-700 underline">Cadastrar novo {{ label }}</span>
        </label>
        <select :id="id" v-model="selectValue" :class="['shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:border-transparent transition duration-200 ease-in-out dark:bg-gray-700 dark:text-gray-100', erro ? 'border-red-500 focus:ring-red-500 dark:border-red-400' : 'border-gray-300 focus:ring-blue-500 dark:border-gray-600']">
            <option :value="null">{{ carregando ? 'Carregando...' : erro ? erro : placeholder }}</option>
            <option v-for="item in options" :key="item.id" :value="item.id">{{ item.nome }}</option>
        </select>
    </div>
</template>

<script setup lang="ts">
    import router from '@/router';
    import { computed } from 'vue';

    const props = defineProps<{
        id: string;
        label: string;
        placeholder: string;
        modelValue: string | number | null;
        options: { id: number; nome: string }[];
        carregando: boolean;
        erro: string | null;
        cadastro?: string;
    }>();

    const cadastrar = (): void => {
        router.push({ name: props.cadastro });
    };
    const emit = defineEmits(['update:modelValue']);

    const selectValue = computed({
        get: () => props.modelValue,
        set: (value) => emit('update:modelValue', value),
    });
</script>
