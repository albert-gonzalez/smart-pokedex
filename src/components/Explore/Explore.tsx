import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { PokemonCard } from "../Pokemon/PokemonCard";
import { Search } from "./Search";

const Stack = createStackNavigator();

export const Explore = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Pokemon" component={PokemonScreen} />
    </Stack.Navigator>
  );
};

function SearchScreen({ route }: { route: any }) {
  return <Search search={route.params?.search || ""} />;
}

function PokemonScreen({ route }: { route: any }) {
  return <PokemonCard num={route.params?.pokemon || -1} />;
}
