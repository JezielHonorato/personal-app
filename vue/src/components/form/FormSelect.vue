<template>
    <div>
        <label :for="id" class="block text-gray-800 text-sm font-semibold mb-2 dark:text-gray-200">{{ label }}</label>
        <select :id="id" v-model="selectValue" class="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
            <option :value="undefined">{{ placeholder }}</option>
            <option v-for="item in options" :key="item.id" :value="item.id">{{ item.nome }}</option>
        </select>

        <p v-if="carregando" class="text-xs text-gray-500 mt-2 dark:text-gray-400">Carregando...</p>
        <p v-if="erro" class="text-xs text-red-600 mt-2 dark:text-red-500">{{ erro }}</p>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue';

    const props = defineProps<{
        id: string;
        label: string;
        placeholder?: string;
        modelValue: string | number | null | undefined;
        options: { id: number; nome: string }[];
        carregando: boolean;
        erro: string | null;
    }>();

    const emit = defineEmits(['update:modelValue']);

    const selectValue = computed({
        get: () => props.modelValue,
        set: (value) => emit('update:modelValue', value),
    });
</script>
