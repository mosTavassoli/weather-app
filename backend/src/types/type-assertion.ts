import {
  LocationQueryParam,
  WeatherForecast,
  WeatherQueryParam,
} from "./types";

export function isWeatherQueryParamValid(
  queryParam: unknown
): asserts queryParam is WeatherQueryParam {
  if (
    typeof queryParam !== "object" ||
    queryParam === null ||
    !("lat" in queryParam) ||
    !("lon" in queryParam)
  ) {
    throw new Error("Invalid Weather Query Param: missing lat or lon");
  }

  const lat = parseFloat(queryParam.lat as string);
  const lon = parseFloat(queryParam.lon as string);

  if (isNaN(lat) || isNaN(lon)) {
    throw new Error(
      "Invalid Weather Query Param: lat and lon must be valid numbers"
    );
  }

  (queryParam as WeatherQueryParam).lat = lat;
  (queryParam as WeatherQueryParam).lon = lon;
}

export function isLocationQueryParamValid(
  queryParam: unknown
): asserts queryParam is LocationQueryParam {
  if (
    typeof queryParam !== "object" ||
    queryParam === null ||
    !("location" in queryParam) ||
    typeof queryParam["location"] !== "string" ||
    queryParam["location"].trim() === ""
  ) {
    throw new Error("Invalid Location Query Param");
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
}
