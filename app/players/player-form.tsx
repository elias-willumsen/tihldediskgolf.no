"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const studyOptions = [
  "DATA",
  "DIGFOR",
  "DIGSEC",
  "INFORMASJONSBEHANDLING",
  "DIGTRANS",
  "ANNET",
] as const;

export default function PlayerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    const name = String(formData.get("name") || "").trim();
    const age = Number(formData.get("age"));
    const study = String(formData.get("study") || "OTHER");
    const uuid = crypto.randomUUID();

    const { error } = await supabase.from("players").insert({
      name,
      age,
      study,
      uuid,
    });

    setIsSubmitting(false);
    if (error) alert(error.message);
    else location.reload();
  }

  return (
    <form
      action={handleSubmit}
      className="rounded border p-4 space-y-3 dark:border-gray-800"
    >
      <div className="grid gap-2 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-sm">Name</span>
          <input
            name="name"
            required
            className="rounded border px-2 py-1 bg-transparent dark:border-gray-800"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm">Age</span>
          <input
            name="age"
            type="number"
            min={1}
            required
            className="rounded border px-2 py-1 bg-transparent dark:border-gray-800"
          />
        </label>
        <label className="flex flex-col gap-1 sm:col-span-2">
          <span className="text-sm">Study</span>
          <select
            name="study"
            className="rounded border px-2 py-1 bg-transparent dark:border-gray-800"
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
