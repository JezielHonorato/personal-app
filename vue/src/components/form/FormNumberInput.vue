<template>
    <div>
        <label :for="id" class="block text-sm font-semibold mb-2 dark:text-gray-200 text-gray-800"> {{ label }}: </label>
        <input type="number" :id="id" :placeholder="placeholder" v-model="inputValue" class="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" />
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue';

    const props = defineProps<{
        id: string;
        label: string;
        placeholder?: string;
        modelValue: number | null;
    }>();

    const emit = defineEmits(['update:modelValue']);

    const inputValue = computed({
        get: () => props.modelValue,
        set: (value) => {
            emit('update:modelValue', isNaN(Number(value)) ? null : Number(value));
        },
    });
</script>
