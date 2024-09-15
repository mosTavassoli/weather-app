import "../config/config";
import { isWeatherForecastValid } from "../types/type-assertion";
import {
  LocationQueryParam,
  WeatherForecast,
  WeatherQueryParam,
} from "../types/types";
import NodeGeocoder, { Geocoder, Options } from "node-geocoder";

const WEATHER_URL = process.env.WEATHER_URL;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const MAPBOX_API_KEY = process.env.MAPBOX_API_KEY;

if (!WEATHER_URL || !WEATHER_API_KEY || !MAPBOX_API_KEY) {
  throw new Error("Missing required environment variables");
}

const options: Options = {
  provider: "mapbox",
  apiKey: MAPBOX_API_KEY,
};
const geocoder: Geocoder = NodeGeocoder(options);

export const fetchWeather = async (
  queryParam: WeatherQueryParam
): Promise<WeatherForecast> => {
  const { lon, lat } = queryParam;

  const response = await fetch(
    `${WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
  );
  if (!response.ok) {
    throw new Error(
      `Weather API error: ${response.status} ${response.statusText}`
    );
  }
  const data = await response.json();
  isWeatherForecastValid(data);
  return data;
};

export const fetchLocation = async (queryParam: LocationQueryParam) => {
  const data = await geocoder.geocode(queryParam.location);
  if (!data.length) {
    throw new Error("No results found for the given location");
  }
  return data;
};
