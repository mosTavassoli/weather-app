import { ForecastType } from "../types/types";
import React from "react";

interface WeatherCardProps {
  forecast: ForecastType;
  isToday?: boolean;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ forecast, isToday = false }) => {
  const { date, iconUrl, temp, description } = forecast;
  const formattedDate = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });

  return (
    <div className={`'w-full p-2 border rounded-md`}>
      <h3 className="text-lg font-semibold"> {isToday ? 'Today' : formattedDate} </h3>
      <img
        src={iconUrl}
        alt={description}
        className="mx-auto" />
      <p className="text-xl font-bold"> {Math.round(temp)}°C </p>
      <p
        className="text-sm"> {description} </p>
    </div>
  )
};
