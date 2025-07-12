<template>
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FormSearchInput id="titulo" label="Título ou Autor" placeholder="Pesquisar..." v-model="queryNome" />

        <FormSelect class="flex-grow" id="genero" label="Gênero:" placeholder="Todos os Gêneros" :options="generos" v-model="selectGenero" :carregando="carregandoGeneros" :erro="erroGeneros" />

        <FormSelect class="flex-grow" id="pais" label="País:" placeholder="Todos os Países" :options="paises" v-model="selectPais" :carregando="carregandoPaises" :erro="erroPaises" />

        <FormRangeDuplo label="Período:" :min="anoMin" :max="anoMax" v-model:valorInicial="rangeAnoInicial" v-model:valorFinal="rangeAnoFinal" />
    </section>
</template>

<script lang="ts" setup>
    import { ref, watch, onMounted } from 'vue';
    import { FormSelect, FormRangeDuplo, FormSearchInput } from '@/components/form/';
    import { useGeneros } from '@/features/biblioteca/generos/composables/useGeneros';
    import { usePaises } from '@/features/biblioteca/paises/composables/usePaises';
    const emit = defineEmits(['pesquisa']);

    const queryNome = ref<string>('');
    const selectGenero = ref<number | null>(null);
    const selectPais = ref<number | null>(null);

    const anoMin = 1800;
    const anoMax = new Date().getFullYear();

    const rangeAnoInicial = ref<number>(anoMin);
    const rangeAnoFinal = ref<number>(anoMax);
    const { generos, carregando: carregandoGeneros, erro: erroGeneros, getGeneros } = useGeneros();
    const { paises, carregando: carregandoPaises, erro: erroPaises, getPaises } = usePaises();

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
        getGeneros();
        getPaises();
        emitSearch();
    });

    watch([queryNome, selectGenero, selectPais, rangeAnoInicial, rangeAnoFinal], emitSearch, { deep: true });
</script>
