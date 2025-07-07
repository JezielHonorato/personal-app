<template>
    <div class="flex items-center">
        <input type="checkbox" :id="id" :checked="modelValue" @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)" class="mr-2" />
        <label :for="id" class="text-sm font-semibold text-gray-800 dark:text-gray-200">{{ label }}</label>
    </div>
</template>

<script setup lang="ts">
    defineProps<{
        id: string;
        label: string;
        modelValue: boolean;
    }>();
	
    defineEmits(['update:modelValue']);
</script>
