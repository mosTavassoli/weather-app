import { Request, Response } from "express";
import { locationService, weatherService } from "../services/weather.service";
import {
  isLocationQueryParamValid,
  isWeatherQueryParamValid,
} from "../types/type-assertion";

export const getWeather = async (req: Request, res: Response) => {
  try {
    const queryParam = req.query;
    isWeatherQueryParamValid(queryParam);
    const data = await weatherService(queryParam);
    res.json(data);
  } catch (error: unknown) {
    handleError(res, error);
  }
};

export const getLocation = async (req: Request, res: Response) => {
  try {
    const queryParam = req.query;
    isLocationQueryParamValid(queryParam);
    const location = await locationService(queryParam);
    res.json(location);
  } catch (error: unknown) {
    handleError(res, error);
  }
};

function handleError(res: Response, error: unknown) {
  if (error instanceof Error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(500).json({ error: "An unexpected error occurred" });
  }
}
