"use client";
import { useAnimation } from "@/app/animation-provider";

export default function AnimationToggle() {
  const { isEnabled, setIsEnabled } = useAnimation();
  return (
    <button
      type="button"
      onClick={() => setIsEnabled(!isEnabled)}
      className="rounded-lg border px-3 py-1 text-sm hover:bg-gray-50 dark:hover:bg-gray-900"
      aria-pressed={isEnabled}
      title="Toggle background animation"
    >
      {isEnabled ? "Animation off" : "Animation on"}
    </button>
  );
}
