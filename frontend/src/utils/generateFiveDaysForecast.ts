import { ForecastType, WeatherForecast } from "../types/types";

export const generateFiveDaysForecast = (
  weatherPrediction: WeatherForecast | null
): ForecastType[] => {
  if (!weatherPrediction || !weatherPrediction.list) {
    return [];
  }

  const { list } = weatherPrediction;
  const forecastMap = new Map<
    string,
    ForecastType & { tempSum: number; count: number }
  >();

  list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0] as string;
    const time = item.dt_txt.split(" ")[1];
    const weatherItem = item.weather[0];

    if (!weatherItem) return;

    const existingForecast = forecastMap.get(date);

    if (!existingForecast) {
      forecastMap.set(date, {
        date,
        temp: item.main.temp,
        temp_min: item.main.temp_min,
        temp_max: item.main.temp_max,
        description: weatherItem.description,
        iconUrl: `${process.env.REACT_APP_ICON_URL}/${weatherItem.icon}.png`,
        tempSum: item.main.temp,
        count: 1,
      });
    } else {
      existingForecast.temp_min = Math.min(
        existingForecast.temp_min,
        item.main.temp_min
      );
      existingForecast.temp_max = Math.max(
        existingForecast.temp_max,
        item.main.temp_max
      );
      existingForecast.tempSum += item.main.temp;
      existingForecast.count += 1;

      if (time === "12:00:00") {
        existingForecast.description = weatherItem.description;
        existingForecast.iconUrl = `${process.env.REACT_APP_ICON_URL}/${weatherItem.icon}.png`;
      }
    }
  });

  return Array.from(forecastMap.values()).map(
    ({ tempSum, count, ...forecast }) => ({
      ...forecast,
      temp: tempSum / count,
    })
  );
};
