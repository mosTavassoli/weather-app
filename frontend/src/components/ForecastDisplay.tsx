import React from 'react';
import { WeatherCard } from './WeatherCard';
import { ForecastType } from "../types/types";

interface ForecastDisplayProps {
  forecast: ForecastType[];
}

export const ForecastDisplay: React.FC<ForecastDisplayProps> = ({ forecast }) => {

  const todayForecast = forecast[0]!;
  const lastDayForecast = forecast[forecast.length - 1]!;
  const firstDate = new Date(todayForecast.date);
  const lastDate = new Date(lastDayForecast.date);
  const dayDifference = (lastDate.getTime() - firstDate.getTime()) / (1000 * 3600 * 24);
  const isCompleteFiveDayForecast = dayDifference === 4 && forecast.length === 5;
  const daysToDisplay = isCompleteFiveDayForecast ? forecast.slice(1) : forecast.slice(1, -1);

  return (
    <div className="w-full flex flex-col md:flex-row mt-5">
      <div className="w-full md:w-1/2 mb-4 md:mb-0">
        <WeatherCard forecast={todayForecast} isToday />
      </div>
      <div className="w-full md:w-1/2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {daysToDisplay.map((day) => (
            <WeatherCard key={day.date} forecast={day} />
          ))}
        </div>
        {!isCompleteFiveDayForecast && (
          <div className="mt-2 flex justify-center">
            <div className="w-full sm:w-1/2">
              <WeatherCard forecast={lastDayForecast} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};