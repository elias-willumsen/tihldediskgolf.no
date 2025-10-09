"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

type Tab = {
  id: string;
  label: string;
};

type TabsProps = {
  tabs: Tab[];
  value: string;
  onValueChange: (id: string) => void;
  className?: string;
};

export default function Tabs({ tabs, value, onValueChange, className }: TabsProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-1 backdrop-blur-md dark:border-white/10">
        {tabs.map((t) => {
          const active = t.id === value;
          return (
            <Button
              key={t.id}
              variant={active ? "secondary" : "ghost"}
              size="sm"
              className={`rounded-xl px-4 py-2 transition-all ${
                active
                  ? "bg-white/70 text-black shadow-sm dark:bg-white/90"
                  : "hover:bg-white/10"
              }`}
              onClick={() => onValueChange(t.id)}
            >
              {t.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}