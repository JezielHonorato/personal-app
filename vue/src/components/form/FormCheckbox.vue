<template>
    <div class="flex items-center">
        <input type="checkbox" :id="id" v-model="checkedValue" class="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
        <label :for="id" class="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {{ label }}
        </label>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue';

    const props = defineProps<{
        id: string;
        label: string;
        modelValue: boolean;
    }>();

    const emit = defineEmits(['update:modelValue']);

    const checkedValue = computed({
        get: () => props.modelValue,
        set: (value) => emit('update:modelValue', value),
    });
</script>
