import { defineStore } from 'pinia';

interface SettingsState {
    theme: 'light' | 'dark';
    fontSize: 'text-sm' | 'text-base' | 'text-lg';
    fontFamily: 'sans' | 'serif' | 'mono' | 'atkinson-hyperlegible-next' | 'parisienne' | 'caveat';
}

export const useSettingsStore = defineStore('settings', {
    state: (): SettingsState => ({
        theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'light',
        fontSize: (localStorage.getItem('fontSize') as 'text-sm' | 'text-base' | 'text-lg') || 'text-base',
        fontFamily: (localStorage.getItem('fontFamily') as 'sans' | 'serif' | 'mono' | 'atkinson-hyperlegible-next' | 'parisienne' | 'caveat') || 'sans',
    }),

    actions: {
        applyTheme(): void {
            const html = document.documentElement;
            if (this.theme === 'dark') {
                html.classList.add('dark');
            } else {
                html.classList.remove('dark');
            }
        },

        toggleTheme(): void {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', this.theme);
            this.applyTheme();
        },

        applyFont(): void {
            const html = document.documentElement;

            const allFontSizes: SettingsState['fontSize'][] = ['text-sm', 'text-base', 'text-lg'];
            allFontSizes.forEach((sizeClass) => html.classList.remove(sizeClass));
            html.classList.add(this.fontSize);

            const allFontFamilies: string[] = ['font-sans', 'font-serif', 'font-mono', 'font-atkinson-hyperlegible-next', 'font-parisienne', 'font-caveat'];
            allFontFamilies.forEach((fontClass) => html.classList.remove(fontClass));
            html.classList.add(`font-${this.fontFamily}`);
        },

        setFontSize(size: SettingsState['fontSize']): void {
            this.fontSize = size;
            localStorage.setItem('fontSize', size);
            this.applyFont();
        },

        setFontFamily(family: SettingsState['fontFamily']): void {
            this.fontFamily = family;
            localStorage.setItem('fontFamily', family);
            this.applyFont();
        },

        initializeSettings(): void {
            this.applyTheme();
            this.applyFont();
        },
    },
});
