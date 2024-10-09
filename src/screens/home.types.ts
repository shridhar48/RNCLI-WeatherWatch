interface Location {
  id: number; // or number, depending on the API response
  name: string;
  latitude: number;
  longitude: number;
  admin1?: string;
  admin1_id?: number;
  admin2?: string;
  admin2_id?: number;
  country?: string;
  country_code?: string;
  country_id?: number;
  elevation?: number;
  feature_code?: string;
  population?: number;
  timezone?: string;
}

interface WeatherData {
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weathercode: WeatherCode[];
  time: string[];
}

type WeatherCode =
  | '0'
  | '1'
  | '2'
  | '3'
  | '45'
  | '48'
  | '51'
  | '53'
  | '55'
  | '56'
  | '57'
  | '61'
  | '63'
  | '65'
  | '66'
  | '67'
  | '71'
  | '73'
  | '75'
  | '77'
  | '80'
  | '81'
  | '82'
  | '85'
  | '86'
  | '95'
  | '96'
  | '99';
