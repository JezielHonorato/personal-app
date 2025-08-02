<template>
    <div>
        <label :for="id" class="block text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200"> {{ label }}: </label>
        <input type="file" :id="id" :accept="accept" @change="atualizar" class="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 dark:file:bg-blue-800 dark:file:text-blue-200 dark:hover:file:bg-blue-700" />

        <div v-if="previewUrl || fileName" class="mt-4 p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 flex items-center justify-between">
            <div class="flex items-center">
                <img v-if="previewUrl" :src="previewUrl" alt="Pré-visualização do arquivo" class="w-16 h-16 object-cover rounded mr-4 border border-gray-200 dark:border-gray-600" />
                <div v-if="fileName" class="text-sm break-all text-gray-700 dark:text-gray-300">
                    <p class="font-semibold break-words">{{ fileName }}</p>
                    <p v-if="fileSize">{{ (fileSize / 1024).toFixed(2) }} KB</p>
                </div>
            </div>
            <button @click="removerArquivo" type="button" class="ml-4 p-1 rounded-full text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                <X class="h-5 w-5" />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { X } from 'lucide-vue-next';

    const props = defineProps<{
        id: string;
        label: string;
        accept?: string;
        modelValue: File | null;
    }>();

    const emit = defineEmits(['update:modelValue']);

    const previewUrl = ref<string | null>(null);
    const fileName = ref<string | null>(null);
    const fileSize = ref<number | null>(null);

    function atualizar(event: Event): void {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0] || null;

        if (file) {
            fileName.value = file.name;
            fileSize.value = file.size;

            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    previewUrl.value = e.target?.result as string;
                };
                reader.readAsDataURL(file);
            } else {
                previewUrl.value = null;
            }
        } else {
            limparPreview();
        }

        emit('update:modelValue', file);
    }

    const removerArquivo = () => {
        const inputElement = document.getElementById(props.id) as HTMLInputElement;
        if (inputElement) {
            inputElement.value = '';
        }
        limparPreview();
        emit('update:modelValue', null);
    };

    function limparPreview() {
        previewUrl.value = null;
        fileName.value = null;
        fileSize.value = null;
    }
</script>
