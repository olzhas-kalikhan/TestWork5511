import { CityData } from "./types";

export const getCityKey = (city: CityData) => {
  return `${city.name}-${city.country}`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  ms: number
) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args) as T, ms);
  };
};

export const getWeatherIconUrl = (iconCode: string) =>
    `http://openweathermap.org/img/wn/${iconCode}@2x.png`;