import { ChangeEvent, useState } from "react";
import { LocationData, ForecastType } from "../types/types";
import { useFetchAddress } from "../hooks/useFetchAddress";
import { useFetchWeather } from "../hooks/useFetchWeather";
import { WeatherCard } from "./WeatherCard";

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
      const { list } = weatherPrediction
      return list.reduce((acc: ForecastType[], curr) => {
        const date = curr.dt_txt.split(' ')[0]
        if (!acc.find((forecast) => forecast.date === date)) {
          acc.push({
            date,
            temp: curr.main.temp,
            description: curr.weather[0].description,
            iconUrl: `${process.env.REACT_APP_ICON_URL}/${curr.weather[0].icon}.png`
          });
        }
        return acc
      }, [])
    }
  }
  const forecast = generateFiveDaysForecast();


  return (
    <div className="relative w-1/2 m-auto">
      <input type='text'
        placeholder="Weather in your city/place ..."
        value={location}
        className="w-full mt-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 p-5"
        onChange={handleInputChange} />
      {addressError &&
        <p>{addressError}</p>
      }
      {weatherError &&
        <p>{weatherError}</p>
      }
      {isLoading &&
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
        </div>
      }
      {isOpen && suggestedAddress.length > 0 &&
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto ">
          {suggestedAddress.map((address: any) =>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" key={address.extra.id}
              onClick={() => selectedAddressHandler(address)}>{address.formattedAddress}</li>
          )}
        </ul>
      }
      {forecast && (
        <div className="w-full flex flex-col md:flex-row mt-5 gap-2">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <WeatherCard forecast={forecast[0]} isToday />
          </div>
          <div className="w-full md:w-1/2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {forecast.slice(1, -1).map((day) => (
                <WeatherCard key={day.date} forecast={day} />
              ))}
            </div>
            <div className="mt-2 flex justify-center">
              <div className="w-full sm:w-1/2">
                <WeatherCard forecast={forecast[forecast.length - 1]} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}