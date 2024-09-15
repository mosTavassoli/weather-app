import { ChangeEvent, useState } from "react";
import { LocationData } from "../types/types";
import { useFetchAddress } from "../hooks/useFetchAddress";
import { useFetchWeather } from "../hooks/useFetchWeather";
import { ForecastDisplay } from "./ForecastDisplay";
import { SuggestedAddressList } from "./SuggestedAddressList";
import { generateFiveDaysForecast } from "../utils/generateFiveDaysForecast";
import { Loading } from "./Loading";

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

  const forecast = generateFiveDaysForecast(weatherPrediction);

  return (
    <div className="relative w-1/2 m-auto">
      <input type='text'
        placeholder="Weather in your city/place ..."
        value={location}
        className="w-full mt-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 p-5"
        onChange={handleInputChange} />
      {addressError && <p>{addressError}</p>}
      {weatherError && <p>{weatherError}</p>}
      {isLoading && <Loading />}
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