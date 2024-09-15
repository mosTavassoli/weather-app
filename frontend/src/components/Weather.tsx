import { ChangeEvent, useState } from "react";
import { LocationData, ForecastType } from "../types/types";
import { useFetchAddress } from "../hooks/useFetchAddress";
import { useFetchWeather } from "../hooks/useFetchWeather";
import { ForecastDisplay } from "./ForecastDisplay";
import { SuggestedAddressList } from "./SuggestedAddressList";

export const Weather = () => {
  const [location, setLocation] = useState('')
  const [isOpen, setIsOpen] = useState(false);

  const {
    suggestedAddress,
    debounceFetchAddress,
    addressError,
    setSuggestedAddress,
    isLoading,
    setIsLoading,
    setAddressError
  } = useFetchAddress()

  const { weatherPrediction, getWeather, setWeatherPrediction, weatherError, setWeatherError } = useFetchWeather()

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLocation(value);
    setWeatherPrediction(null)
    setIsLoading(true)
    setSuggestedAddress([]);
    setAddressError(null)
    setWeatherError(null)
    if (!value.trim()) {
      setIsOpen(false);
      setSuggestedAddress([]);
      setIsLoading(false)
    } else {
      debounceFetchAddress(value);
      setIsOpen(true);
    }
  }


  const selectedAddressHandler = async (address: LocationData) => {
    const { latitude, longitude, formattedAddress } = address
    setLocation(formattedAddress)
    await getWeather({ latitude, longitude })
    setIsOpen(false)
    setSuggestedAddress([])
  }

  const generateFiveDaysForecast = () => {

    if (weatherPrediction) {
      const { list } = weatherPrediction;
      const forecastMap = new Map<string, ForecastType>();

      list.forEach((item) => {
        const date = item.dt_txt.split(' ')[0] as string;
        const existingForecast = forecastMap.get(date) as ForecastType;

        if (!existingForecast) {
          const weatherItem = item.weather[0];
          if (!weatherItem || typeof weatherItem.description !== 'string' || typeof weatherItem.icon !== 'string') {
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
  const forecast = generateFiveDaysForecast();

  return (
    <div className="relative w-1/2 m-auto">
      <input type='text'
        placeholder="Weather in your city/place ..."
        value={location}
        className="w-full mt-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 p-5"
        onChange={handleInputChange} />
      {addressError && <p>{addressError}</p>}
      {weatherError && <p>{weatherError}</p>}
      {isLoading &&
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
        </div>
      }
      {isOpen && suggestedAddress.length > 0 &&
        <SuggestedAddressList
          suggestedAddress={suggestedAddress}
          selectedAddressHandler={selectedAddressHandler} />
      }
      {forecast && (
        <ForecastDisplay forecast={forecast} />
      )}
    </div>
  )
}