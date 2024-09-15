import React from "react";
import { ForecastType } from "../types/types";

interface WeatherCardProps {
  isToday?: boolean;
  forecast: ForecastType;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ forecast, isToday = false }) => {
  const { date, iconUrl, temp, temp_min, temp_max, description } = forecast;
  const formattedDate = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });

  return (
    <div className={`${isToday ? 'md:w-1/2' : 'w-full'} w-full p-2 border rounded-md`}>
      <h3 className="text-lg uppercase font-bold">{isToday ? 'Today' : formattedDate}</h3>
      <h3 className="text-sm text-gray-600">{date}</h3>
      <img
        src={iconUrl}
        alt={description}
        className="mx-auto"
      />
      <p className="text-xl font-bold">{Math.round(temp)}°C</p>
      <p className="text-sm">
        <span className="text-blue-500">{Math.round(temp_min)}°C</span>-
        <span className="text-red-500">{Math.round(temp_max)}°C</span>
      </p>
      <p className="text-sm">{description}</p>
    </div>
  )
};
