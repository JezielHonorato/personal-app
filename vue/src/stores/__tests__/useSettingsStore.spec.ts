import { setActivePinia, createPinia } from 'pinia';
import { useSettingsStore } from '../useSettingsStore';
import { describe, it, expect, beforeEach } from 'vitest';

describe('useSettingsStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('deve iniciar com o tema "light" como padrão', () => {
        const settings = useSettingsStore();

        expect(settings.theme).toBe('light');
    });

    it('deve alternar o tema de "light" para "dark" ao chamar toggleTheme', () => {
        const settings = useSettingsStore();
        expect(settings.theme).toBe('light');

        settings.toggleTheme();
        expect(settings.theme).toBe('dark');
    });

    it('deve alternar o tema de "dark" de volta para "light"', () => {
        const settings = useSettingsStore();
        settings.toggleTheme();
        expect(settings.theme).toBe('dark');

        settings.toggleTheme();
        expect(settings.theme).toBe('light');
    });
});
