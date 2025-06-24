import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';
import { useSettingsStore } from './stores/useSettingsStore';
import './style.css';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

const settingsStore = useSettingsStore();
settingsStore.initializeSettings();

app.mount('#app');
