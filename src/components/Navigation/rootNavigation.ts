import * as React from "react";
import { Routes } from "./routes";

export const navigationRef = React.createRef<any>();

export const navigate = (name: string, params?: any) => {
  navigationRef.current?.navigate(name, params);
};

export const getCurrentRoute = (): string => {
  return navigationRef.current?.getCurrentRoute().name ?? "";
};

export const openPokemonScreen = (pokemon: number, navigator: any) =>
  navigator.push?.(Routes.Pokemon, { pokemon }) ||
  navigator.navigate(Routes.Explore, {
    screen: Routes.Pokemon,
    params: { pokemon },
  });
