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

import { DEFAULT_LOCATION } from './constants';
import WeeklyWeatherForecast from '../components/WeeklyWeatherForecast';
import getWeatherImage from '../helpers/getWeatherImage';

const HomeScreen = () => {
  const [location, setLocation] = useState<string>(''); // type as string
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null); // type as WeatherData or null
  const [searchResults, setSearchResults] = useState<Location[]>([]); // type as array of Location
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [showNoData, setShowNoData] = useState(false);

  useEffect(() => {
    selectLocation(DEFAULT_LOCATION);
  }, []);

  const searchLocation = async () => {
    try {
      const results = await fetchLocation(location);
      if (results && results.length > 0) {
        setSearchResults(results);
        setShowNoData(false);
      } else {
        setSearchResults([]);
        setShowNoData(true);
      }
    } catch (error) {
      console.error('error :', error);
      setSearchResults([]);
      setShowNoData(true);
    }
  };

  const selectLocation = async (location: Location) => {
    setSelectedLocation(location);
    try {
      const weather = await fetchWeather(location.latitude, location.longitude);
      setWeatherData(weather);
      setSearchResults([]);
    } catch (error) {
      setWeatherData(null);
      setSearchResults([]);
      setShowNoData(true);
      console.error('error :', error);
    }
  };

  return (
    <View style={{ width: '100%', height: '100%', padding: 10 }}>
      <TextInput
        placeholder='Search location'
        value={location}
        onChangeText={setLocation}
      />
      <Button title='Search' onPress={searchLocation} />
      {showNoData && (
        <View>
          <Text>No results found</Text>
        </View>
      )}
      {searchResults && searchResults.length > 0 && !showNoData && (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Button title={item.name} onPress={() => selectLocation(item)} />
          )}
        />
      )}

      {weatherData && !showNoData && (
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
