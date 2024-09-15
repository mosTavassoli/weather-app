export type WeatherQueryParam = {
  lat: number;
  lon: number;
};

export type LocationQueryParam = {
  location: string;
};

export type WeatherForecast = {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
};

export type ForecastItem = {
  main: MainWeather;
  weather: Weather[];
  dt_txt: string;
};

type MainWeather = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
};

type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};
