<template>
    <div v-if="show" @click.self="close" class="fixed inset-0 bg-white dark:bg-gray-900 bg-opacity-50 flex justify-center items-center">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-md m-4">
            <div class="flex justify-between items-center border-b pb-3 mb-4 dark:border-gray-600">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ title }}</h3>
                <button @click="close" class="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
                    <X class="w-6 h-6" />
                </button>
            </div>
            <div>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { X } from 'lucide-vue-next';

    defineProps<{
        show: boolean;
        title: string;
    }>();

    const emit = defineEmits(['close']);

    const close = () => {
        emit('close');
    };
</script>
