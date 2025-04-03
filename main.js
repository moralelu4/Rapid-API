import './style.css'
import { setupCounter } from './counter.js'

const API_KEY = import.meta.env.VITE_API_KEY;
const GEOLOCATION_URL = 'https://ip-geo-location.p.rapidapi.com/ip/check?format=json';
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';

async function getData(url, options = {}) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

async function displayData() {
  const app = document.getElementById('app');
  
  // Datos de geolocalización
  const geoData = await getData(GEOLOCATION_URL, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': 'ip-geo-location.p.rapidapi.com'
    }
  });

  if (geoData) {
    const geoDiv = document.createElement('div');
    geoDiv.className = 'bg-white p-4 rounded-lg shadow mb-4';
    geoDiv.innerHTML = `
      <h3 class="text-xl font-bold mb-2">Geolocation Data</h3>
      <p>City: ${geoData.city?.name || 'N/A'}</p>
      <p>Country: ${geoData.country?.name || 'N/A'}</p>
    `;
    app.appendChild(geoDiv);
  }

  // Datos del clima (ejemplo con OpenWeatherMap)
  const weatherData = await getData(`${WEATHER_URL}?q=London&appid=${API_KEY}`);
  
  if (weatherData) {
    const weatherDiv = document.createElement('div');
    weatherDiv.className = 'bg-white p-4 rounded-lg shadow';
    weatherDiv.innerHTML = `
      <h3 class="text-xl font-bold mb-2">Weather Data</h3>
      <p>Temperature: ${weatherData.main?.temp ? (weatherData.main.temp - 273.15).toFixed(1) + '°C' : 'N/A'}</p>
      <p>Conditions: ${weatherData.weather?.[0]?.description || 'N/A'}</p>
    `;
    app.appendChild(weatherDiv);
  }
}

displayData();
setupCounter(document.getElementById('counter'));