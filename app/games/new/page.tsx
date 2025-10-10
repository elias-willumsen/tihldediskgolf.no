"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function NewGamePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    const date = String(formData.get("date") || "");
    const course = String(formData.get("course") || "").trim();

    const { data, error } = await supabase
      .from("games")
      .insert({ date, course })
      .select("id")
      .single();

    setIsSubmitting(false);
    if (error) alert(error.message);
    else router.push(`/games/${data!.id}`);
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
