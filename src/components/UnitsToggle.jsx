import { useState } from "react";

export default function UnitsToggle({ units, onChange }) {
  // units = "metric" | "imperial"
  return (
    <div className="flex items-center gap-2 text-sm">
      <button
        onClick={() => onChange("metric")}
        className={`px-3 py-1 rounded ${units === "metric" ? "bg-white/10" : "bg-white/4"}`}
      >
        °C
      </button>
      <button
        onClick={() => onChange("imperial")}
        className={`px-3 py-1 rounded ${units === "imperial" ? "bg-white/10" : "bg-white/4"}`}
      >
        °F
      </button>
    </div>
  );
}
