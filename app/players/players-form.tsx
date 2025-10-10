"use client";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";

export default function PlayerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    const name = String(formData.get("name") || "").trim();
    const age = Number(formData.get("age"));
    const study = String(formData.get("study"));
    const uuid = crypto.randomUUID();

    const { error } = await supabase.from("players").insert({
      name,
      age,
      study,
      uuid,
      created_by: (await supabase.auth.getUser()).data.user?.id ?? null,
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
      {/* ...inputs unchanged... */}
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
