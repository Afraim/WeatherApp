import { formatTimeFromUnix } from "../utils/time";
import { getIconUrl } from "../utils/api";

export default function Hourly({ hourly, timezone_offset, units }) {
  if (!hourly || hourly.length === 0) return null;

  // Show next 8 items
  const list = hourly.slice(0, 8).map((h) => ({
    dt: h.dt,
    temp: h.main?.temp ?? 0,
    weather: h.weather ?? [],
    pop: h.pop ?? 0,
  }));

  return (
    <div className="bg-white/5 p-4 rounded-2xl shadow w-full lg:w-72">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold">Hourly forecast</h3>
        <span className="text-xs bg-white/10 px-2 py-1 rounded-md">
          Today
        </span>
      </div>

      {/* Forecast list */}
      <div className="flex flex-col divide-y divide-white/10">
        {list.map((h) => (
          <div
            key={h.dt}
            className="flex items-center justify-between py-3 text-sm"
          >
            {/* Time */}
            <div className="w-14 text-white/80">
              {formatTimeFromUnix(h.dt, timezone_offset)}
            </div>

            {/* Icon */}
            <img
              src={getIconUrl(h.weather?.[0]?.icon)}
              alt=""
              className="w-6 h-6"
            />

            {/* Temp */}
            <div className="font-medium">{Math.round(h.temp)}°</div>
          </div>
        ))}
      </div>
    </div>
  );
}
