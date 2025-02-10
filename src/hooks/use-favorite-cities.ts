import { CityData } from "@/types";
import { getCityKey } from "@/utils";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoriteCity = CityData;
interface FavoriteCitiesState {
  favoriteCities: FavoriteCity[];
}
interface FavoriteCitiesActions {
  setFavoriteCities: (favoriteCities: FavoriteCity[]) => void;
  addFavoriteCity: (newCity: FavoriteCity) => void;
  removeFavoriteCity: (cityToRemove: CityData) => void;
}

type FavoriteCitiesStore = FavoriteCitiesState & FavoriteCitiesActions;

export const useFavoriteCities = create<FavoriteCitiesStore>()(
  persist(
    (set) => ({
      favoriteCities: [],
      setFavoriteCities: (favoriteCities) => set(() => ({ favoriteCities })),
      addFavoriteCity: (newCity) =>
        set((state) => {
          const existing = state.favoriteCities.find(
            (city) => getCityKey(city) === getCityKey(newCity)
          );
          if (existing) return state;
          return {
            ...state,
            favoriteCities: [...state.favoriteCities, newCity],
          };
        }),
      removeFavoriteCity: (cityToRemove) =>
        set((state) => {
          return {
            ...state,
            favoriteCities: state.favoriteCities.filter(
              (city) => getCityKey(city) !== getCityKey(cityToRemove)
            ),
          };
        }),
    }),
    { name: "favorite-cities-store" }
  )
);

export const useIsFavoriteCity = (city: CityData) =>
  useFavoriteCities((state) =>
    state.favoriteCities.some((c) => getCityKey(c) === getCityKey(city))
  );
