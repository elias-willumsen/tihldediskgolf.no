"use client";
import { useState } from "react";

export default function GameForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    const response = await fetch("/api/games", {
      method: "POST",
      body: formData,
    });
    setIsSubmitting(false);
    if (response.ok) location.reload();
    else alert("Failed to create game");
  }

  return (
    <form
      action={handleSubmit}
      className="rounded border p-4 space-y-3 dark:border-gray-800"
    >
      <div className="font-medium">Create game</div>
      <div className="grid gap-2 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-sm">Date</span>
          <input
            name="date"
            type="date"
            required
            className="rounded border px-2 py-1 dark:border-gray-800 bg-transparent"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm">Course</span>
          <input
            name="course"
            required
            className="rounded border px-2 py-1 dark:border-gray-800 bg-transparent"
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded bg-gray-900 px-3 py-1 text-white dark:bg-gray-100 dark:text-gray-900"
      >
        {isSubmitting ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
