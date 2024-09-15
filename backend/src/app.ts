import cors from "cors";
import "./config/config";
import morgan from "morgan";
import express, { Express } from "express";
import { getLocation, getWeather } from "./controllers/weather.controller";

const app: Express = express();
app.use(cors());
app.use(morgan("dev"));
const PORT = process.env.PORT || 8080;

app.get("/weather", getWeather);
app.get("/search", getLocation);

app.listen(PORT, () => {
  console.info(`Server Starts On Port: ${PORT}`);
});
