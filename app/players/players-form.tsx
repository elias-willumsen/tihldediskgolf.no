"use client";

import { useState } from "react";

const studyOptions = [
  "DATA",
  "DIGSEC",
  "DIGFOR",
  "DIGTRANS",
  "INFOMASJONSBEHANDLING",
  "ANDRE ",
] as const;

export default function PlayerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    const response = await fetch("/api/players", {
      method: "POST",
      body: formData,
    });
    setIsSubmitting(false);
    if (response.ok) location.reload();
    else alert("Failed to create player");
  }

  return (
    <form
      action={handleSubmit}
      className="rounded border p-4 space-y-3 dark:border-gray-800"
    >
      <div className="font-medium">Add player</div>
      <div className="grid gap-2 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-sm">Name</span>
          <input
            name="name"
            required
            className="rounded border px-2 py-1 dark:border-gray-800 bg-transparent"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm">Age</span>
          <input
            name="age"
            type="number"
            min={1}
            required
            className="rounded border px-2 py-1 dark:border-gray-800 bg-transparent"
          />
        </label>
        <label className="flex flex-col gap-1 sm:col-span-2">
          <span className="text-sm">Study</span>
          <select
            name="study"
            className="rounded border px-2 py-1 dark:border-gray-800 bg-transparent"
          >
            {studyOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
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
