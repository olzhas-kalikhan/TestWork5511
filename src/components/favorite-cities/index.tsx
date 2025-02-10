"use client";

import { useFavoriteCities } from "@/hooks/use-favorite-cities";
import { WeatherCard, WeatherCardPlaceholder } from "../city-weather-card";
import { getCityKey } from "@/utils";
import { getWeather } from "@/server/weather";
import { useQuery } from "@tanstack/react-query";

export default function FavoriteCities() {
  const favoriteCities = useFavoriteCities((state) => state.favoriteCities);

  const { data: cityWeatherData, isFetching } = useQuery({
    queryKey: ["citiesWeatherData", favoriteCities],
    queryFn: () => getWeather(favoriteCities),
    enabled: favoriteCities.length > 0,
  });

  if (isFetching)
    return (
      <div className="d-flex flex-wrap">
        {favoriteCities.map((city) => (
          <div key={getCityKey(city)} className="w-25 px-2">
            <WeatherCardPlaceholder />
          </div>
        ))}
      </div>
    );

  if (!cityWeatherData || cityWeatherData.length === 0) return null;

  return (
    <div className="d-flex flex-wrap">
      {favoriteCities.map((city, i) => (
        <div key={getCityKey(city)} className="w-25 px-2">
          <WeatherCard cityWeather={cityWeatherData[i]} cityData={city} />
        </div>
      ))}
    </div>
  );
}
