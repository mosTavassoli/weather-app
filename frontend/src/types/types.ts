export type LocationData = {
  latitude: number;
  longitude: number;
  formattedAddress: string;
  country: string;
  countryCode: string;
  state: string;
  extra: {
    id: string;
    bbox: [number, number, number, number];
  };
  provider: string;
};

export type WeatherLocationType = {
  latitude: number;
  longitude: number;
};

export type WeatherForecast = {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
};

export type ForecastItem = {
  dt: number;
  main: MainWeather;
  weather: Weather[];
  visibility: number;
  pop: number;
  dt_txt: string;
};

type MainWeather = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
};

type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type ForecastType = {
  date: string;
  temp: number;
  description: string;
  iconUrl: string;
  temp_min: number;
  temp_max: number;
};
