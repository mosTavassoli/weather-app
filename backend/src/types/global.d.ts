declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    WEATHER_API_KEY?: string;
    WEATHER_URL?: string;
    MAPBOX_API_KEY?:string
    MAPBOX_URL?:string
  }
}
