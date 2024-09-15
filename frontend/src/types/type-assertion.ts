import { ForecastItem, LocationData, WeatherForecast } from "./types";

export function isLocationDataValid(
  data: unknown
): asserts data is LocationData[] {
  if (!Array.isArray(data)) {
    throw new Error("Location data must be an array");
  }

  for (const item of data) {
    if (
      typeof item !== "object" ||
      item === null ||
      typeof item.latitude !== "number" ||
      typeof item.longitude !== "number" ||
      typeof item.formattedAddress !== "string"
    ) {
      throw new Error("Invalid item in location data array");
    }
  }
}

export function isWeatherForecastValid(
  data: unknown
): asserts data is WeatherForecast {
  if (
    typeof data !== "object" ||
    data === null ||
    !("cod" in data) ||
    !("message" in data) ||
    !("cnt" in data) ||
    !("list" in data) ||
    !Array.isArray(data["list"]) ||
    data.list.length === 0
  ) {
    throw new Error("Invalid Weather Forecast structure");
  }

  const mainData = data.list as ForecastItem[];

  for (const item of mainData) {
    if (
      typeof item !== "object" ||
      item === null ||
      !("main" in item) ||
      typeof item.main !== "object" ||
      !("weather" in item) ||
      typeof item.weather !== "object"
    ) {
      throw new Error("Invalid item in Forecast list array");
    }
  }
}
