import { useActiveCity } from "./use-city-suggestions";
import CityWeatherCard from "../city-weather-card";

export default function ActiveCityWeatherCard() {
  const activeCity = useActiveCity();

  return <CityWeatherCard cityData={activeCity} />;
}
