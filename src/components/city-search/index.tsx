"use client";

import CitySearchInput from "./city-search-input";
import ActiveCityWeatherCard from "./active-city-weather-card";

export default function CitySearch() {
  return (
    <div className="w-50 h-100 m-auto">
      <div className="mb-4">
        <ActiveCityWeatherCard />
      </div>
      <div>
        <CitySearchInput />
      </div>
    </div>
  );
}
