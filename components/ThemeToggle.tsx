"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;
  const isDark = resolvedTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";
  const label = isMounted ? (isDark ? "Light mode" : "Dark mode") : "Theme";

  return (
    <button
      type="button"
      onClick={() => isMounted && setTheme(nextTheme)}
      aria-pressed={isMounted ? isDark : undefined}
      className="rounded-lg border px-3 py-1 text-sm hover:bg-gray-50 dark:hover:bg-gray-900"
      suppressHydrationWarning
    >
      {label}
    </button>
  );
}
