"use server";

import { CityData, ForecastData, WeatherData } from "@/types";
import { getCityKey } from "@/utils";
import axios from "axios";
import { NotFoundError, ServerError } from "./errors";

export const getCoordinates = async (city: string, country?: string) => {
  const q = [city, country].filter(Boolean).join(",");
  try {
    const response = await axios.get<CityData[]>(
      `http://api.openweathermap.org/geo/1.0/direct?q=${q}&limit=1&appid=${process.env.OPEN_WEATHER_API_KEY}`
    );

    if (!response.data || response.data.length === 0) {
      throw new NotFoundError("Location not found");
    }

    const unique = new Set();
    let key = "";

    return response.data.filter((data) => {
      key = getCityKey(data);
      if (unique.has(key)) {
        return false;
      }
      unique.add(key);
      return true;
    });
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === 404
    )
      throw error;
    else throw new ServerError();
  }
};

export const getWeather = async (
  coordinates: {
    lat: number;
    lon: number;
  }[]
) => {
  try {
    const promises = coordinates.map(({ lat, lon }) =>
      axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPEN_WEATHER_API_KEY}`
      )
    );
    const responses = await Promise.all(promises);

    return responses.map(({ data }) => data);
  } catch {
    throw new ServerError();
  }
};

const getDailyForecast = (data: ForecastData["list"]) => {
  const averaged: Record<
    string,
    {
      total: number;
      count: number;
      temp: number;
      temp_min: number;
      temp_max: number;
      weatherIcon: string;
      weatherDescription: string;
    }
  > = {};
  let day: string;
  data.forEach((record) => {
    day = record.dt_txt.split(" ")[0];
    if (!averaged[day]) {
      averaged[day] = {
        total: record.main.temp,
        count: 1,
        temp: record.main.temp,
        temp_min: record.main.temp_min,
        temp_max: record.main.temp_max,
        weatherIcon: record.weather[0].icon,
        weatherDescription: record.weather[0].description,
      };
    } else {
      averaged[day].total += record.main.temp;
      averaged[day].count += 1;
      averaged[day].temp = averaged[day].total / averaged[day].count;
      averaged[day].temp_min = Math.min(
        averaged[day].temp_min,
        record.main.temp_min
      );
      averaged[day].temp_max = Math.max(
        averaged[day].temp_max,
        record.main.temp_max
      );
    }
  });
  return averaged;
};

export const getForecast = async ({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) => {
  try {
    const response = await axios.get<ForecastData>(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPEN_WEATHER_API_KEY}`
    );
    return getDailyForecast(response.data.list);
  } catch {
    throw new ServerError();
  }
};
