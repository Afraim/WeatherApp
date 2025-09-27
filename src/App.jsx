import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import UnitsToggle from "./components/UnitsToggle";
import CurrentWeather from "./components/CurrentWeather";
import Hourly from "./components/Hourly";
import DailyForecast from "./components/DailyForecast";
import Loading from "./components/Loading";
import ErrorBox from "./components/ErrorBox";

import { getWeatherByCity, getForecastByCity, getGeoDirect } from "./utils/api";

export default function App() {
  const [units, setUnits] = useState("metric"); // "metric" or "imperial"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null); // { current, hourly, daily, timezone_offset, cityInfo }

  async function handleSearch(query) {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      // 1) get geo info (optional)
      let geo = null;
      try {
        const geoRes = await getGeoDirect(query, 1);
        if (Array.isArray(geoRes) && geoRes.length > 0) geo = geoRes[0];
      } catch (e) {
        geo = null;
      }

      // 2) get current weather
      const current = await getWeatherByCity(query);

      const lat = (geo && geo.lat) || current.coord.lat;
      const lon = (geo && geo.lon) || current.coord.lon;

      // 3) get 5-day forecast
      const forecast = await getForecastByCity(query);

      // 4) hourly = next 24 items
      const hourly = forecast.list.slice(0, 24);

      // 5) daily = compute max/min for each of next 5 days
      const daily = [];
      for (let i = 0; i < 5; i++) {
        const dayItems = forecast.list.slice(i * 8, (i + 1) * 8); // 8 * 3h = 24h
        if (dayItems.length === 0) continue;

        const temps = dayItems.map((d) => d.main.temp);
        daily.push({
          dt: dayItems[0].dt,              // timestamp of first item in day
          temp: {
            max: Math.max(...temps),
            min: Math.min(...temps),
            day: temps[0],                  // optional, first temp
          },
          weather: dayItems[0].weather,     // pick first item's weather
        });
      }

      const payload = {
        current: {
          ...current.main,
          weather: current.weather,
          wind: current.wind,
          clouds: current.clouds.all,
          visibility: current.visibility,
          sunrise: current.sys.sunrise,
          sunset: current.sys.sunset,
        },
        hourly,
        daily,
        timezone_offset: current.timezone || 0,
        cityInfo: {
          name: geo?.name || current.name,
          country: geo?.country || current.sys.country,
        },
      };

      setData(payload);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch weather");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gray-900 text-white">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-purple-900 font-bold">☀</div>
          <h1 className="text-xl md:text-2xl font-bold">Weather Now</h1>
        </div>

        <div className="flex items-center gap-4">
          <UnitsToggle units={units} onChange={(u) => setUnits(u)} />
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        <section className="mb-6">
          <h2 className="text-2xl md:text-3xl text-center">How's the sky looking today?</h2>
          <div className="mt-6">
            <SearchBar onSearch={handleSearch} />
          </div>
        </section>

        <section>
          {loading && <Loading />}

          {!loading && error && <ErrorBox message={error} />}

          {!loading && !data && !error && (
            <div className="text-center text-white/80 mt-8">
              <p>Search for a city to see the weather.</p>
            </div>
          )}

          {!loading && data && (
  <div className="space-y-6">
    {/* Top row: CurrentWeather + Hourly */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      {/* Current weather takes 2/3 */}
      <div className="lg:col-span-2">
        <CurrentWeather data={data} units={units} />
      </div>

      {/* Hourly sidebar (fixed height, scrollable if too tall) */}
      <div className="h-full">
        <Hourly
          hourly={data.hourly}
          timezone_offset={data.timezone_offset}
          units={units}
        />
      </div>
    </div>

    {/* Weather details row (independent of hourly height) */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="p-4 bg-gray-500/20 rounded-2xl text-center">
        <div className="text-xs text-white/70">Feels Like</div>
        <div className="text-lg font-semibold">
          {Math.round(data.current.feels_like)}°
        </div>
      </div>
      <div className="p-4 bg-gray-500/20 rounded-2xl text-center">
        <div className="text-xs text-white/70">Humidity</div>
        <div className="text-lg font-semibold">
          {data.current.humidity}%
        </div>
      </div>
      <div className="p-4 bg-gray-500/20 rounded-2xl text-center">
        <div className="text-xs text-white/70">Wind</div>
        <div className="text-lg font-semibold">
          {Math.round(data.current.wind?.speed)}{" "}
          {units === "metric" ? "m/s" : "mph"}
        </div>
      </div>
      <div className="p-4 bg-gray-500/20 rounded-2xl text-center">
        <div className="text-xs text-white/70">Precipitation</div>
        <div className="text-lg font-semibold">
          {data.hourly?.[0]?.pop
            ? `${Math.round(data.hourly[0].pop * 100)}%`
            : "—"}
        </div>
      </div>
    </div>

    {/* Daily forecast full width */}
    <DailyForecast
      daily={data.daily}
      timezone_offset={data.timezone_offset}
    />
  </div>
)}



        </section>

        <footer className="mt-12 text-center text-sm text-white/60">
          By - <a href="https://github.com/Afraim/WeatherApp" >Md. Afraim Bin Zahangir</a> | 2025
        </footer>
      </main>
    </div>
  );
}
