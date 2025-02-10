import { CityData } from "@/types";
import { create } from "zustand";

interface CitySuggestionsState {
  suggestions: CityData[];
  activeCityIndex: number | null;
  setSuggestions: (suggestions: CityData[]) => void;
  setActiveCity: (index: number | null) => void;
}

export const useCitySuggestions = create<CitySuggestionsState>()((set) => ({
  suggestions: [],
  activeCityIndex: null,
  setActiveCity: (index) => set(() => ({ activeCityIndex: index })),
  setSuggestions: (suggestions) => set(() => ({ suggestions })),
}));

const activeCitySelector = (state: CitySuggestionsState) => {
  if (
    state.activeCityIndex !== null &&
    state.suggestions[state.activeCityIndex]
  )
    return state.suggestions[state.activeCityIndex];
  return null;
};

export const useActiveCity = () => useCitySuggestions(activeCitySelector);
