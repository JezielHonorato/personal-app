<template>
	<header class="flex justify-between items-center p-4 bg-white dark:bg-gray-900 border-b dark:border-gray-700">
		<nav class="flex gap-4 text-gray-800 dark:text-gray-200">
			<RouterLink to="/">Início</RouterLink>
			<RouterLink to="/livros">Livros</RouterLink>
			<RouterLink to="/">Início</RouterLink>
		</nav>

		<div class="flex items-center gap-2">
			<button @click="settings.toggleTheme()" class="p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
				<Sun v-if="settings.theme === 'light'" class="w-5 h-5" />
				<Moon v-else class="w-5 h-5" />
			</button>

			<select v-model="settings.fontFamily" @change="settings.setFontFamily(settings.fontFamily)" class="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
				<option value="sans">Sans</option>
				<option value="serif">Serif</option>
				<option value="mono">Mono</option>
				<option value="parisienne">Parisienne</option>
				<option value="atkinson-hyperlegible-next">Atkinson Hyperlegible Next</option>
				<option value="caveat">Caveat</option>
			</select>

			<select v-model="settings.fontSize" @change="settings.setFontSize(settings.fontSize)" class="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
				<option value="text-sm">Pequena</option>
				<option value="text-base">Média</option>
				<option value="text-lg">Grande</option>
			</select>
		</div>
	</header>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useSettingsStore } from '@/stores/useSettingsStore';

import { Sun, Moon } from 'lucide-vue-next';

const settings = useSettingsStore();

onMounted(() => {
	settings.applyTheme();
	settings.applyFont();
});
</script>
