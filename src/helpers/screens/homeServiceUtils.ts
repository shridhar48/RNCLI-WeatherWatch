import axios from 'axios';

// Helper to fetch geolocation based on location name
const fetchLocation = async (location: string) => {
  const response = await axios.get(
    `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
  );
  console.log('response.data.results :', response.data.results);
  return response.data.results;
};

// Helper to fetch weather using latitude and longitude
const fetchWeather = async (latitude: number, longitude: number) => {
  const response = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode`
  );
  return response.data.daily;
};

export { fetchLocation, fetchWeather };
