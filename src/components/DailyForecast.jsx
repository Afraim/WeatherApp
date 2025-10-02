import { dayShortFromUnix } from "../utils/time";
import { getIconUrl } from "../utils/api";

export default function DailyForecast({ daily, timezone_offset }) {
  // daily is array of days from onecall; show next 7
  return (
    <div className="bg-white/6 p-4 rounded-2xl">
      <h3 className="mb-3">7-day forecast</h3>
      <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
        {daily.slice(0, 6).map((d) => (
          <div key={d.dt} className="text-center p-2 bg-white/4 rounded-lg">
            <div className="text-xs">{dayShortFromUnix(d.dt, timezone_offset)}</div>
            <img src={getIconUrl(d.weather?.[0]?.icon)} alt="" className="w-12 h-12 mx-auto"/>
            <div className="text-sm font-medium">{Math.round(d.temp.max)}° / {Math.round(d.temp.min)}°</div>
          </div>
        ))}
      </div>
    </div>
  );
}
