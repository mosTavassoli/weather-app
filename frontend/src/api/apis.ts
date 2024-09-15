import {
  isLocationDataValid,
  isWeatherForecastValid,
} from "../types/type-assertion";
import {
  LocationData,
  WeatherForecast,
  WeatherLocationType,
} from "../types/types";

const WEATHER_URL = process.env.REACT_APP_WEATHER_URL;

export const fetchWeather = async (
  location: WeatherLocationType
): Promise<WeatherForecast> => {
  try {
    const { longitude, latitude } = location;
    const data = await (
      await fetch(`${WEATHER_URL}/weather?lat=${latitude}&lon=${longitude}`)
    ).json();
    isWeatherForecastValid(data);
    return data;
  } catch (error: unknown) {
    throw error;
  }
};

export const getLocation = async (search: string): Promise<LocationData[]> => {
  try {
    const response = await fetch(`${WEATHER_URL}/search?location=${search}`);
    const data = await response.json();
    if (!response.ok) {
      if (data && data.error) {
        throw new Error(data.error);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
    isLocationDataValid(data);
    return data;
  } catch (error: unknown) {
    throw error;
  }
};
