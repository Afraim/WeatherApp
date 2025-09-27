import { useState } from "react";

export default function UnitsToggle({ units, onChange }) {
  const [open, setOpen] = useState(false);

  const toggleSystem = () => {
    const newUnits = units === "metric" ? "imperial" : "metric";
    onChange(newUnits);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-1 bg-white/10 rounded flex items-center gap-2"
      >
        Units ▾
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white/10 rounded-lg shadow-lg p-2 z-10">
          <button
            onClick={toggleSystem}
            className="block w-full text-left px-3 py-2 rounded hover:bg-white/20"
          >
            {units === "metric" ? "Switch to Imperial" : "Switch to Metric"}
          </button>

          <div className="mt-2 text-sm text-gray-200">
            <div className="mb-1">Temperature</div>
            <div className="ml-3">{units === "metric" ? "Celsius (°C)" : "Fahrenheit (°F)"}</div>

            <div className="mt-2 mb-1">Wind Speed</div>
            <div className="ml-3">{units === "metric" ? "km/h" : "mph"}</div>

            <div className="mt-2 mb-1">Precipitation</div>
            <div className="ml-3">{units === "metric" ? "Millimeters (mm)" : "Inches (in)"}</div>
          </div>
        </div>
      )}
    </div>
  );
}
