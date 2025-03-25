import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../../stores/useThemeStore';

export default function ThemeToggle() {
  const { theme, setTheme } = useThemeStore();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-circle btn-ghost text-xl hover:bg-base-300 transition"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
}
