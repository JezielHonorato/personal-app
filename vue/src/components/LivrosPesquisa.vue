<template>
    <section class="pesquisa-livros grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="campos-pesquisa">
			<FormSearchInput id="titulo" label="Título ou Autor" placeholder="Pesquisar..." v-model="queryNome" />
        </div>

        <div class="campos-pesquisa">
            <label for="categoria" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gênero:</label>
            <div class="campos-input relative flex items-center">
                <ChevronDown class="material-icons absolute left-3 text-gray-400 dark:text-gray-500" />
                <select v-model="selectGenero" class="select-campos pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200" id="categoria" name="categoria">
                    <option :value="null">Todos os Gêneros</option>
                    <option v-for="genre in availableGenres" :key="genre.id" :value="genre.id">{{ genre.nome }}</option>
                </select>
            </div>
        </div>

        <div class="campos-pesquisa">
            <label for="pais" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">País:</label>
            <div class="campos-input relative flex items-center">
                <ChevronDown class="material-icons absolute left-3 text-gray-400 dark:text-gray-500" />
                <select v-model="selectPais" class="select-campos pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200" id="pais" name="pais">
                    <option :value="null">Todos os Países</option>
                    <option v-for="country in availableCountries" :key="country.id" :value="country.id">{{ country.nome }}</option>
                </select>
            </div>
        </div>

        <div class="campos-pesquisa">
            <FormRangeDuplo label="Período:" :min="anoMin" :max="anoMax" v-model:valorInicial="rangeAnoInicial" v-model:valorFinal="rangeAnoFinal" />
        </div>
    </section>
</template>

<script lang="ts" setup>
    import { ref, watch, onMounted } from 'vue';
    import { ChevronDown, Search } from 'lucide-vue-next';
    import { FormCheckbox, FormFileInput, FormNumberInput, FormRangeDuplo, FormSearchInput, FormTextInput } from '@/components/form/';
    import { useGeneros, usePaises } from '@/composables/useLivrosDatabase';

    const emit = defineEmits(['pesquisa']);

    const queryNome = ref<string>('');
    const selectGenero = ref<number | null>(null);
    const selectPais = ref<number | null>(null);

    const anoMin = 1800;
    const anoMax = new Date().getFullYear();

    const rangeAnoInicial = ref<number>(anoMin);
    const rangeAnoFinal = ref<number>(anoMax);
    const { data: availableGenres, fetch: fetchGeneros } = useGeneros();
    const { data: availableCountries, fetch: fetchPaises } = usePaises();

    const emitSearch = () => {
        emit('pesquisa', {
            nome: queryNome.value,
            genero: selectGenero.value,
            pais: selectPais.value,
            anoInicial: rangeAnoInicial.value > rangeAnoFinal.value ? rangeAnoFinal.value : rangeAnoInicial.value,
            anoFinal: rangeAnoInicial.value < rangeAnoFinal.value ? rangeAnoFinal.value : rangeAnoInicial.value,
        });
    };

    onMounted(() => {
        fetchGeneros();
        fetchPaises();
        emitSearch();
    });

    watch([queryNome, selectGenero, selectPais, rangeAnoInicial, rangeAnoFinal], emitSearch, { deep: true });
</script>

<style scoped>
    .campos-input .material-icons {
        pointer-events: none;
    }
</style>
