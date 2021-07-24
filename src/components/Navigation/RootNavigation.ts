import * as React from "react";

export const navigationRef = React.createRef<any>();

export enum Routes {
  Explore = "Explore",
  PokemonOfTheDay = "PokemonOfTheDay",
  Search = "Search",
  Pokemon = "Pokemon",
}

export function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

export function getCurrentRoute(): string {
  return navigationRef.current?.getCurrentRoute().name ?? "";
}
