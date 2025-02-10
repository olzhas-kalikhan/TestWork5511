"use client";

import { useFavoriteCities } from "@/hooks/use-favorite-cities";
import CityWeatherCard from "../city-weather-card";
import { getCityKey } from "@/utils";

export default function FavoriteCities() {
  const favoriteCities = useFavoriteCities((state) => state.favoriteCities);

  console.log(favoriteCities);

  return (
    <div className="d-flex flex-wrap">
      {favoriteCities.map((city) => (
        <div key={getCityKey(city)} className="w-25 px-2">
          <CityWeatherCard cityData={city} />
        </div>
      ))}
    </div>
  );
}
