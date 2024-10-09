import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import { fetchLocation, fetchWeather } from './homeServiceUtils';
import getWeatherImage from '../getWeatherImage';
import { DEFAULT_LOCATION } from './constants';
import WeeklyWeatherForecast from '../components/WeeklyWeatherForecast';

const HomeScreen = () => {
  const [location, setLocation] = useState<string>(''); // type as string
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null); // type as WeatherData or null
  const [searchResults, setSearchResults] = useState<Location[]>([]); // type as array of Location
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );

  useEffect(() => {
    selectLocation(DEFAULT_LOCATION);
  }, []);

  const searchLocation = async () => {
    const results = await fetchLocation(location);
    setSearchResults(results);
  };

  const selectLocation = async (location: Location) => {
    setSelectedLocation(location);
    const weather = await fetchWeather(location.latitude, location.longitude);
    console.log('weather :', weather);
    setWeatherData(weather);
    setSearchResults([]);
  };

  return (
    <View style={{ width: '100%', height: '100%', padding: 10 }}>
      <TextInput
        placeholder='Search location'
        value={location}
        onChangeText={setLocation}
      />
      <Button title='Search' onPress={searchLocation} />

      {searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Button title={item.name} onPress={() => selectLocation(item)} />
          )}
        />
      )}

      {weatherData && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <WeeklyWeatherForecast
            weatherData={weatherData}
            selectedLocation={selectedLocation}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;
