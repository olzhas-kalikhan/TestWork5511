type MainWeatherData = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
};

type WeatherCondition = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type CityData = {
  country: string;
  lat: number;
  local_names: Record<string, string>;
  lon: number;
  name: string;
  state: string;
};

export type WeatherData = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: WeatherCondition[];
  main: MainWeatherData;
};

export type ForecastData = {
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    timezone: number;
  };
  list: {
    main: MainWeatherData;
    weather: WeatherCondition[];
    dt_txt: "2025-02-10 15:00:00";
  }[];
};
