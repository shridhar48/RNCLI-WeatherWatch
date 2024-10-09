// WeeklyWeatherForecast.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import WeeklyWeatherForecast from '../components/WeeklyWeatherForecast';
import { DEFAULT_LOCATION } from '../screens/constants';

const mockGetWeatherImage = jest.fn(
  (weatherCode: number) => `https://example.com/weather/${weatherCode}.png`
);

jest.mock('./getWeatherImage', () =>
  jest.fn((code: number) => mockGetWeatherImage(code))
);

describe('WeeklyWeatherForecast', () => {
  const weatherData: WeatherData = {
    temperature_2m_max: [28.5, 27.7, 28.2, 29.3, 27.8, 28.8, 27.5],
    temperature_2m_min: [21.2, 21.1, 21.1, 20.6, 20.6, 20.9, 21],
    time: [
      '2024-10-09',
      '2024-10-10',
      '2024-10-11',
      '2024-10-12',
      '2024-10-13',
      '2024-10-14',
      '2024-10-15',
    ],
    weathercode: ['95', '95', '95', '80', '95', '95', '80'],
  };

  const selectedLocation = DEFAULT_LOCATION;

  it('renders correctly with valid weather data', () => {
    const { getByText, getAllByRole } = render(
      <WeeklyWeatherForecast
        weatherData={weatherData}
        selectedLocation={selectedLocation}
      />
    );

    // Check if the location is rendered
    expect(getByText('Location: Bengaluru')).toBeTruthy();

    // Check current temperature
    expect(getByText('Current Temperature: 25°C')).toBeTruthy();

    // Check average temperature
    expect(getByText('Average Temperature: 26°C')).toBeTruthy();

    // Check weekly forecast
    expect(getByText('Weekly Forecast:')).toBeTruthy();

    // Check for 7 days forecast
    const forecastItems = getAllByRole('image');
    expect(forecastItems).toHaveLength(7);

    // Verify the mocked weather image URL calls
    weatherData.weathercode.forEach((code) => {
      expect(mockGetWeatherImage).toHaveBeenCalledWith(code);
    });
  });

  it('returns null when no weather data is provided', () => {
    const { queryByText } = render(
      <WeeklyWeatherForecast
        weatherData={null as any}
        selectedLocation={selectedLocation}
      />
    );

    expect(queryByText('Bengaluru')).not.toBeTruthy();
  });
});
