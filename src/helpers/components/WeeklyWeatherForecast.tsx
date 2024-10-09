// WeeklyWeatherForecast.tsx
import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import getWeatherImage from '../getWeatherImage';
import { calculateAverageTemperature } from './weeklyWeatherForecastUtils';

const WeeklyWeatherForecast: React.FC<WeeklyWeatherForecastProps> = ({
  weatherData,
  selectedLocation,
}) => {
  if (!weatherData) return null;

  const averageTemperature = calculateAverageTemperature(
    weatherData.temperature_2m_max
  );

  return (
    <View style={{ flex: 1, width: '100%', height: '100%', padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
        {'Location: ' + (selectedLocation?.name ?? '')}
      </Text>

      <Text style={{ fontSize: 16 }}>
        Current Temperature: {weatherData.temperature_2m_max[0]}°C
      </Text>

      <Text style={{ fontSize: 16 }}>
        Average Temperature: {averageTemperature}°C
      </Text>

      <Text style={{ fontSize: 16, fontWeight: 'bold', marginVertical: 10 }}>
        Weekly Forecast:
      </Text>

      {weatherData.temperature_2m_max.map((temp, index) => (
        <View key={index} style={{ marginBottom: 10 }}>
          <Text>{`Day ${index + 1}: ${temp}°C`}</Text>
          <Image
            style={{
              height: 100,
              width: Dimensions.get('window').width,
              marginTop: 5,
            }}
            resizeMode={'contain'}
            source={{ uri: getWeatherImage(weatherData.weathercode[index]) }}
          />
        </View>
      ))}
    </View>
  );
};

export default WeeklyWeatherForecast;
