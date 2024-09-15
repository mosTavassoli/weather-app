import { fetchLocation, fetchWeather } from "../api/fetch-weather";
import { LocationQueryParam, WeatherQueryParam } from "../types/types";

export const weatherService = async (queryParam: WeatherQueryParam) => {
  return await fetchWeather(queryParam);
};

export const locationService = async (queryParam: LocationQueryParam) => {
  return await fetchLocation(queryParam);
};
