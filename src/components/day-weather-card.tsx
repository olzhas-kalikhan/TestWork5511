"use client";

import { getWeatherIconUrl } from "@/utils";
import { Card, Image, ListGroup } from "react-bootstrap";

export default function DayWeatherCard({
  weatherDate,
  weatherDescription,
  weatherIcon,
  temp,
  temp_min,
  temp_max,
}: {
  weatherDate: string;
  weatherDescription: string;
  weatherIcon: string;
  temp: number;
  temp_min: number;
  temp_max: number;
}) {
  return (
    <Card className="h-100 px-3 py-4">
      <Card.Body className="p-0">
        <Card.Title className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <div className="rounded-circle bg-info">
              <Image
                alt={weatherDescription}
                src={getWeatherIconUrl(weatherIcon)}
                width={40}
                height={40}
              />
            </div>
            <h1 className="ms-2 mb fs-4">{weatherDate}</h1>
          </div>
        </Card.Title>
        <ListGroup>
          <ListGroup.Item className="d-flex justify-content-between">
            <span>Temp </span>
            <span>{temp.toFixed(2)} C</span>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between">
            <span>Min Temp </span>
            <span>{temp_min} C</span>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between">
            <span>Max Temp </span>
            <span>{temp_max} C</span>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
