import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { ForecastType, LocationData } from "../types/types";
import { useFetchAddress } from "../hooks/useFetchAddress";
import { useFetchWeather } from "../hooks/useFetchWeather";
import { ForecastDisplay } from "./ForecastDisplay";
import { SuggestedAddressList } from "./SuggestedAddressList";
import { generateFiveDaysForecast } from "../utils/generateFiveDaysForecast";
import { Loading } from "./Loading";

export const Weather = () => {
  const [location, setLocation] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const [forecast, setForecast] = useState<ForecastType[]>([]);

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

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleFocus = useCallback(() => {
    if (location.trim()) {
      setIsOpen(true);
    }
  }, [location])

  useEffect(() => {
    if (weatherPrediction) {
      const newForecast = generateFiveDaysForecast(weatherPrediction);
      setForecast(newForecast);
    } else {
      setForecast([]);
    }
  }, [weatherPrediction]);

  return (
    <div className="relative w-1/2 m-auto">
      <input type='text'
        placeholder="Weather in your city/place ..."
        value={location}
        className="w-full mt-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 p-5"
        onChange={handleInputChange}
        onFocus={handleFocus}
      />
      {addressError && <p>{addressError}</p>}
      {weatherError && <p>{weatherError}</p>}
      {isLoading && <Loading />}
      {isOpen && suggestedAddress.length > 0 &&
        <SuggestedAddressList
          suggestedAddress={suggestedAddress}
          selectedAddressHandler={selectedAddressHandler}
          onClose={handleClose}
        />
      }
      {forecast && forecast.length > 0 && (
        <ForecastDisplay forecast={forecast} />
      )}
    </div>
  )
}