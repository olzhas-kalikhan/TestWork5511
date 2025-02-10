import { ListGroup } from "react-bootstrap";
import { useCitySuggestions } from "./use-city-suggestions";

export default function CitiesList() {
  const suggestions = useCitySuggestions((state) => state.suggestions);
  const setActiveCity = useCitySuggestions((state) => state.setActiveCity);
  const activeCityIndex = useCitySuggestions((state) => state.activeCityIndex);

  if (suggestions.length === 0) return null;

  return (
    <ListGroup className="mt-1">
      {suggestions.map((cityData, i) => (
        <ListGroup.Item
          key={i}
          onClick={() => setActiveCity(i)}
          active={i === activeCityIndex}
        >
          {cityData.name}, {cityData.country}, (lon: {cityData.lon}, lat:{" "}
          {cityData.lat})
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
