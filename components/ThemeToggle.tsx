"use client";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const nextTheme = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      className="rounded-lg border px-3 py-1 text-sm hover:bg-gray-50 dark:hover:bg-gray-900"
    >
      {theme === "dark" ? "Light mode" : "Dark mode"}
    </button>
  );
}
