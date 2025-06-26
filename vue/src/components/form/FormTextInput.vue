<template>
    <div>
        <label :for="id" class="block text-gray-800 text-sm font-semibold mb-2 dark:text-gray-200">{{ label }}</label>
        <input type="text" :id="id" :placeholder="placeholder" v-model="internalValue" class="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400" />
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue';

    const props = defineProps<{
        label: string;
        placeholder?: string;
        modelValue: string | number | null | undefined;
        id: string;
    }>();

    const emit = defineEmits(['update:modelValue']);

    const internalValue = computed({
        get: () => props.modelValue,
        set: (value) => emit('update:modelValue', value),
    });
</script>
