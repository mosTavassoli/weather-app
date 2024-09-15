import { useState } from "react";
import { WeatherForecast, WeatherLocationType } from "../types/types";
import { fetchWeather } from "../api/apis";

export const useFetchWeather = () => {
  const [weatherPrediction, setWeatherPrediction] =
    useState<WeatherForecast | null>(null);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const getWeather = async (location: WeatherLocationType) => {
    try {
      const data = await fetchWeather(location);
      setWeatherPrediction(data);
    } catch (e: unknown) {
      setWeatherError(
        e instanceof Error ? e.message : "An unknown error occurred"
      );
      setWeatherPrediction(null);
    }
  };
  return {
    weatherPrediction,
    weatherError,
    setWeatherError,
    getWeather,
    setWeatherPrediction,
  };
};
