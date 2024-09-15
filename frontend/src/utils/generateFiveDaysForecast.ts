import {ForecastType, WeatherForecast} from "../types/types";

export const generateFiveDaysForecast = (weatherPrediction: WeatherForecast | null) => {

  if (weatherPrediction) {
    const {list} = weatherPrediction;
    const forecastMap = new Map<string, ForecastType>();

    list.forEach((item) => {
      const date = item.dt_txt.split(' ')[0] as string;
      const existingForecast = forecastMap.get(date) as ForecastType;

      if (!existingForecast) {
        const weatherItem = item.weather[0];
        if (!weatherItem) {
          return;
        }
        forecastMap.set(date, {
          date,
          temp: item.main.temp,
          temp_min: item.main.temp_min,
          temp_max: item.main.temp_max,
          description: weatherItem.description,
          iconUrl: `${process.env.REACT_APP_ICON_URL}/${weatherItem.icon}.png`
        });
      } else {
        existingForecast.temp_min = Math.min(existingForecast.temp_min, item.main.temp_min);
        existingForecast.temp_max = Math.max(existingForecast.temp_max, item.main.temp_max);
      }
    });

    return Array.from(forecastMap.values());
  }
  return [];
};