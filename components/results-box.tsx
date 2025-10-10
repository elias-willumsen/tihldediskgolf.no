"use client";

import * as React from "react";
import Tabs from "@/components/ui/tabs";

type RoundRow = {
  player: string;
  score: number; // total kast
  toPar: number; // +/- par
  course: string;
  date: string; // YYYY-MM-DD
};

const DATA: Record<string, RoundRow[]> = {
  r1: [
    {
      player: "Ola",
      score: 62,
      toPar: +2,
      course: "Dragvoll",
      date: "2025-09-18",
    },
    {
      player: "Kari",
      score: 58,
      toPar: -2,
      course: "Dragvoll",
      date: "2025-09-18",
    },
    {
      player: "Nils",
      score: 60,
      toPar: 0,
      course: "Dragvoll",
      date: "2025-09-18",
    },
  ],
  r2: [
    {
      player: "Ola",
      score: 55,
      toPar: -5,
      course: "Follo",
      date: "2025-10-01",
    },
    {
      player: "Kari",
      score: 57,
      toPar: -3,
      course: "Follo",
      date: "2025-10-01",
    },
    {
      player: "Nils",
      score: 62,
      toPar: +2,
      course: "Follo",
      date: "2025-10-01",
    },
  ],
  r3: [
    {
      player: "Ola",
      score: 61,
      toPar: +1,
      course: "Rotvoll",
      date: "2025-10-05",
    },
    {
      player: "Kari",
      score: 59,
      toPar: -1,
      course: "Rotvoll",
      date: "2025-10-05",
    },
    {
      player: "Nils",
      score: 63,
      toPar: +3,
      course: "Rotvoll",
      date: "2025-10-05",
    },
  ],
};

const TABS = [
  { id: "r1", label: "Runde 1" },
  { id: "r2", label: "Runde 2" },
  { id: "r3", label: "Runde 3" },
];

export default function ResultsBox() {
  const [tab, setTab] = React.useState<string>(TABS[0].id);
  const rows = DATA[tab] ?? [];

  return (
    <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl ring-1 ring-white/10">
      <div className="mb-4 flex items-center justify-between">
        <Tabs tabs={TABS} value={tab} onValueChange={setTab} />
      </div>

      <div className="rounded-xl border border-white/10 bg-black/20 p-3 shadow-inner">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead className="sticky top-0">
              <tr className="text-left text-xs uppercase tracking-wide text-white/70">
                <th className="px-3 py-2 font-medium">Spiller</th>
                <th className="px-3 py-2 font-medium">Score</th>
                <th className="px-3 py-2 font-medium">± Par</th>
                <th className="px-3 py-2 font-medium">Bane</th>
                <th className="px-3 py-2 font-medium">Dato</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={i}
                  className="border-t border-white/10 hover:bg-white/[0.06] transition-colors"
                >
                  <td className="px-3 py-2">{r.player}</td>
                  <td className="px-3 py-2">{r.score}</td>
                  <td
                    className={`px-3 py-2 ${
                      r.toPar < 0
                        ? "text-emerald-300"
                        : r.toPar > 0
                        ? "text-rose-300"
                        : "text-white/80"
                    }`}
                  >
                    {r.toPar > 0 ? `+${r.toPar}` : r.toPar}
                  </td>
                  <td className="px-3 py-2">{r.course}</td>
                  <td className="px-3 py-2">{r.date}</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-3 py-6 text-center text-white/60"
                  >
                    Ingen data for denne fanen enda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-white/60">
          <span>
            Viser <strong className="text-white">{rows.length}</strong>{" "}
            resultater
          </span>
          <span>TIHLDE Diskgolf · {new Date().getFullYear()}</span>
        </div>
      </div>
    </div>
  );
}
