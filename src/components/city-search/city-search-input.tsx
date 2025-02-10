"use client";

import { Form } from "react-bootstrap";
import CitiesList from "./cities-list";
import { debounce } from "@/utils";
import { useCitySuggestions } from "./use-city-suggestions";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { getCoordinates } from "@/server/weather";
import { useQuery } from "@tanstack/react-query";

export default function CitySearchInput() {
  const setSuggestions = useCitySuggestions((state) => state.setSuggestions);
  const setActiveCity = useCitySuggestions((state) => state.setActiveCity);

  const [searchTerm, setSearchTerm] = useState("");

  const { data: citiesData } = useQuery({
    queryKey: ["cities", searchTerm],
    queryFn: () => getCoordinates(searchTerm),
    enabled: Boolean(searchTerm),
  });

  const setSearchTermDebounced = useMemo(
    () => debounce(setSearchTerm, 500),
    []
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTermDebounced(e.target?.value ?? "");
  };

  useEffect(() => {
    if (citiesData && citiesData.length > 0) {
      setSuggestions(citiesData);
    } else {
      setSuggestions([]);
      setActiveCity(null);
    }
  }, [citiesData, setActiveCity, setSuggestions]);

  return (
    <>
      <Form.Control placeholder="Search City..." onChange={handleInputChange} />
      <CitiesList />
    </>
  );
}
