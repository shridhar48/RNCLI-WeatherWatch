// fetchWeather.test.ts
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchWeather } from '../../screens/homeServiceUtils';

// Create an instance of the mock adapter
const mock = new MockAdapter(axios);

describe('fetchWeather', () => {
  afterEach(() => {
    mock.reset(); // Reset the mock after each test
  });

  it('fetches weather data successfully', async () => {
    const latitude = 12.9716;
    const longitude = 77.5946;

    // Mock the API response
    const mockWeatherData = {
      daily: {
        temperature_2m_max: [30, 32, 31],
        temperature_2m_min: [20, 21, 19],
        weathercode: [1, 2, 3],
      },
    };

    mock
      .onGet(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode`
      )
      .reply(200, mockWeatherData);

    const data = await fetchWeather(latitude, longitude);

    expect(data).toEqual(mockWeatherData.daily);
  });

  it('handles errors when the fetch fails', async () => {
    const latitude = 12.9716;
    const longitude = 77.5946;

    // Mock the API response with an error
    mock
      .onGet(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode`
      )
      .reply(500);

    await expect(fetchWeather(latitude, longitude)).rejects.toThrow(
      'Request failed with status code 500'
    );
  });
});
