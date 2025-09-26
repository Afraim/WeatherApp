import { getIconUrl } from "../utils/api";
import { formatDateFromUnix } from "../utils/time";

export default function CurrentWeather({ data, units }) {
  // data from OneCall.current and weatherCurrent (city/country)
  const { current, cityInfo } = data;
  const temp = Math.round(current.temp);
  const feels = Math.round(current.feels_like);
  const icon = current.weather?.[0]?.icon;
  const desc = current.weather?.[0]?.description ?? "";

  return (
    <div className="bg-gradient-to-br from-white/6 to-white/3 rounded-2xl p-6 shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-white/70">Weather Now</div>
          <h2 className="text-3xl md:text-4xl font-bold">{cityInfo.name}, {cityInfo.country}</h2>
          <div className="text-sm text-white/70">{formatDateFromUnix(current.dt, data.timezone_offset)}</div>
          <div className="mt-3 text-lg capitalize">{desc}</div>
        </div>

        <div className="text-right">
          <img src={getIconUrl(icon)} alt={desc} className="w-24 h-24"/>
          <div className="text-5xl font-extrabold">{temp}°{units === "metric" ? "C" : "F"}</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-3 bg-white/4 rounded-md">
          <div className="text-xs text-white/70">Feels like</div>
          <div className="font-medium">{feels}°</div>
        </div>
        <div className="p-3 bg-white/4 rounded-md">
          <div className="text-xs text-white/70">Humidity</div>
          <div className="font-medium">{current.humidity}%</div>
        </div>
        <div className="p-3 bg-white/4 rounded-md">
          <div className="text-xs text-white/70">Wind</div>
          <div className="font-medium">{Math.round(current.wind_speed)} {units === "metric" ? "m/s" : "mph"}</div>
        </div>
        <div className="p-3 bg-white/4 rounded-md">
          <div className="text-xs text-white/70">Pressure</div>
          <div className="font-medium">{current.pressure} hPa</div>
        </div>
      </div>
    </div>
  );
}
