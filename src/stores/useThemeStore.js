import { create } from 'zustand';

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem('comic-theme') || 'light',
  setTheme: (theme) => {
    localStorage.setItem('comic-theme', theme);
    set({ theme });
  },
}));
