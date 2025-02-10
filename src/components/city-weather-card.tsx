"use client";

import { getWeather } from "@/server/weather";
import { CityData, WeatherData } from "@/types";
import { getWeatherIconUrl } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { Card, ListGroup, Placeholder } from "react-bootstrap";
import FavoriteButton from "./favorite-button";

export const WeatherCardPlaceholder = ({ className }: { className?: string }) => {
  return (
    <Card className={"h-100 px-3 py-4 " + className}>
      <Card.Body as={Card.Body} className="p-0">
        <Placeholder as={Card.Title} className="w-100 rounded">
          <Placeholder as="h1" className="ms-2 mb fs-2">
            Placeholder
          </Placeholder>
        </Placeholder>
        <ListGroup>
          {Array.from({ length: 4 }, (_, i) => (
            <Placeholder as={ListGroup.Item} key={`placeholder-${i}`}>
              <span>Placeholder</span>
            </Placeholder>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export const WeatherCard = ({
  cityWeather,
  cityData,
}: {
  cityWeather: WeatherData;
  cityData: CityData;
}) => {
  return (
    <Card className="h-100 px-3 py-4">
      <Card.Body className="p-0">
        <Card.Title className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <div className="rounded-circle bg-info">
              <Image
                alt={cityWeather.weather[0].description}
                src={getWeatherIconUrl(cityWeather.weather[0].icon)}
                width={40}
                height={40}
              />
            </div>
            <Link href={`/forecast/${cityData.country}/${cityData.name}`}>
              <h1 className="ms-2 mb fs-2">
                {cityData.name}, {cityData.country}
              </h1>
            </Link>
          </div>
          <FavoriteButton cityData={cityData} />
        </Card.Title>
        <ListGroup>
          <ListGroup.Item className="d-flex justify-content-between">
            <span>Temp </span>
            <span>{cityWeather.main.temp} C</span>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between">
            <span>Feels Like </span>
            <span>{cityWeather.main.feels_like} C</span>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between">
            <span>Min Temp </span>
            <span>{cityWeather.main.temp_min} C</span>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between">
            <span>Max Temp </span>
            <span>{cityWeather.main.temp_max} C</span>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default function CityWeatherCard({
  cityData,
}: {
  cityData?: CityData | null;
}) {
  const { data: cityWeatherData, isFetching } = useQuery({
    queryKey: ["cityWeatherData", cityData],
    queryFn: () => {
      return cityData ? getWeather([cityData]) : null;
    },
    enabled: Boolean(cityData),
  });

  if (isFetching) return <WeatherCardPlaceholder />;

  if (!cityData || !cityWeatherData?.[0])
    return <WeatherCardPlaceholder className="invisible" />;
  return <WeatherCard cityWeather={cityWeatherData[0]} cityData={cityData} />;
}
