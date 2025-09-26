const BASE = "https://api.openweathermap.org/data/2.5";
const GEO = "https://api.openweathermap.org/geo/1.0";

const KEY = import.meta.env.VITE_OWM_API_KEY;

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText} - ${text}`);
  }
  return res.json();
}

export async function getWeatherByCity(city) {
  // current weather (includes coordinates)
  const url = `${BASE}/weather?q=${encodeURIComponent(city)}&appid=${KEY}&units=metric`;
  return fetchJSON(url);
}

export async function getForecastByCity(city) {
  const url = `${BASE}/forecast?q=${encodeURIComponent(city)}&appid=${KEY}&units=metric`;
  return fetchJSON(url);
}

export async function getGeoDirect(query, limit = 5) {
  const url = `${GEO}/direct?q=${encodeURIComponent(query)}&limit=${limit}&appid=${KEY}`;
  return fetchJSON(url);
}

export async function getOneCall(lat, lon) {
  // exclude minutely & alerts to reduce size
  const url = `${BASE}/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${KEY}`;
  return fetchJSON(url);
}

export function getIconUrl(icon) {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}
