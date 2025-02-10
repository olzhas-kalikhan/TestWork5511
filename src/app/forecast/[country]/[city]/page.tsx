import DayWeatherCard from "@/components/day-weather-card";
import FavoriteButton from "@/components/favorite-button";
import { getCoordinates, getForecast } from "@/server/weather";

export default async function Page({
  params,
}: {
  params: Promise<{ country: string; city: string }>;
}) {
  const { country, city } = await params;
  const cityData = await getCoordinates(city, country);
  const forecast = await getForecast(cityData[0]);

  return (
    <div>
      <div className="d-flex align-items-center">
        <h1 className="me-3">
          {city} | {country}
        </h1>
        <FavoriteButton cityData={cityData[0]} />
      </div>
      <div className="d-flex flex-wrap">
        {Object.entries(forecast).map(([date, weatherData]) => (
          <div key={date} className="w-25 px-2 py-2">
            <DayWeatherCard weatherDate={date} {...weatherData} />
          </div>
        ))}
      </div>
    </div>
  );
}
