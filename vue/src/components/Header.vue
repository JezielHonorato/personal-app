<template>
    <header class="flex justify-between items-center p-4 bg-white dark:bg-gray-900 border-b dark:border-gray-700">
        <nav class="flex gap-4 text-gray-800 dark:text-gray-200">
            <RouterLink to="/">Início</RouterLink>
            <RouterLink to="/livros">Livros</RouterLink>
        </nav>

        <div class="flex items-center gap-2">
            <button @click="settings.toggleTheme()" class="p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200" :aria-label="`Mudar para tema ${settings.theme === 'light' ? 'escuro' : 'claro'}`">
                <Sun v-if="settings.theme === 'light'" class="w-5 h-5" />
                <Moon v-else class="w-5 h-5" />
            </button>

            <select v-model="fontFamily" class="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200" aria-label="Selecionar família da fonte">
                <option value="sans">Sans</option>
                <option value="serif">Serif</option>
                <option value="mono">Mono</option>
                <option value="parisienne">Parisienne</option>
                <option value="atkinson-hyperlegible-next">Atkinson</option>
                <option value="caveat">Caveat</option>
            </select>

            <select v-model="fontSize" class="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200" aria-label="Selecionar tamanho da fonte">
                <option value="text-sm">Pequena</option>
                <option value="text-base">Média</option>
                <option value="text-lg">Grande</option>
            </select>
        </div>
    </header>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import { useSettingsStore } from '@/stores/useSettingsStore';
    import { Sun, Moon } from 'lucide-vue-next';

    const settings = useSettingsStore();

    const fontFamily = computed({
        get: () => settings.fontFamily,
        set: (value) => settings.setFontFamily(value),
    });

    const fontSize = computed({
        get: () => settings.fontSize,
        set: (value) => settings.setFontSize(value),
    });
</script>
