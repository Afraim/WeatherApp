import { useState } from "react";
import { Check } from "lucide-react";

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
        <i className="fa-solid fa-gear"></i>
        Units ▾
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-black/90 rounded-lg shadow-lg p-2 z-10">
          <button
            onClick={toggleSystem}
            className="block w-full text-left px-3 py-2 rounded hover:bg-white/20"
          >
            {units === "metric" ? "Switch to Imperial" : "Switch to Metric"}
          </button>

          {/* Temperature */}
          <div className="mb-2">
            <div className="text-sm text-gray-300 mb-1">Temperature</div>
            <div className="space-y-1">
              <button
                onClick={() => toggleUnit("metric")}
                className={`flex items-center justify-between w-full text-left px-3 py-2 rounded transition ${
                  units === "metric" ? "bg-white/20" : "hover:bg-white/10"
                }`}
              >
                <span>Celsius (°C)</span>
                {units === "metric" && <Check className="w-4 h-4 text-white" />}
              </button>
              <button
                onClick={() => toggleUnit("imperial")}
                className={`flex items-center justify-between w-full text-left px-3 py-2 rounded transition ${
                  units === "imperial" ? "bg-white/20" : "hover:bg-white/10"
                }`}
              >
                <span>Fahrenheit (°F)</span>
                {units === "imperial" && <Check className="w-4 h-4 text-white" />}
              </button>
            </div>
          </div>

          {/* Wind Speed */}
          <div className="mb-2">
            <div className="text-sm text-gray-300 mb-1">Wind Speed</div>
            <div className="space-y-1">
              <button
                onClick={() => toggleUnit("metric")}
                className={`flex items-center justify-between w-full text-left px-3 py-2 rounded transition ${
                  units === "metric" ? "bg-white/20" : "hover:bg-white/10"
                }`}
              >
                <span>km/h</span>
                {units === "metric" && <Check className="w-4 h-4 text-white" />}
              </button>
              <button
                onClick={() => toggleUnit("imperial")}
                className={`flex items-center justify-between w-full text-left px-3 py-2 rounded transition ${
                  units === "imperial" ? "bg-white/20" : "hover:bg-white/10"
                }`}
              >
                <span>mph</span>
                {units === "imperial" && <Check className="w-4 h-4 text-white" />}
              </button>
            </div>
          </div>

          {/* Precipitation */}
          <div>
            <div className="text-sm text-gray-300 mb-1">Precipitation</div>
            <div className="space-y-1">
              <button
                onClick={() => toggleUnit("metric")}
                className={`flex items-center justify-between w-full text-left px-3 py-2 rounded transition ${
                  units === "metric" ? "bg-white/20" : "hover:bg-white/10"
                }`}
              >
                <span>Millimeters (mm)</span>
                {units === "metric" && <Check className="w-4 h-4 text-white" />}
              </button>
              <button
                onClick={() => toggleUnit("imperial")}
                className={`flex items-center justify-between w-full text-left px-3 py-2 rounded transition ${
                  units === "imperial" ? "bg-white/20" : "hover:bg-white/10"
                }`}
              >
                <span>Inches (in)</span>
                {units === "imperial" && <Check className="w-4 h-4 text-white" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
