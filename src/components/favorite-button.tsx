"use client"

import {
  useFavoriteCities,
  useIsFavoriteCity,
} from "@/hooks/use-favorite-cities";
import { CityData } from "@/types";
import { Button } from "react-bootstrap";

export default function FavoriteButton({ cityData }: { cityData: CityData }) {
  const isFavoriteCity = useIsFavoriteCity(cityData);
  const addFavoriteCity = useFavoriteCities((state) => state.addFavoriteCity);
  const removeFavoriteCity = useFavoriteCities(
    (state) => state.removeFavoriteCity
  );

  const handleClick = () => {
    if (isFavoriteCity) removeFavoriteCity(cityData);
    else addFavoriteCity(cityData);
  };

  return (
    <Button
      className="rounded-circle d-flex justify-content-center align-items-center"
      variant={isFavoriteCity ? "primary" : "secondary"}
      style={{ width: 40, height: 40 }}
      onClick={handleClick}
    >
      <i className="bi bi-star-fill"></i>
    </Button>
  );
}
