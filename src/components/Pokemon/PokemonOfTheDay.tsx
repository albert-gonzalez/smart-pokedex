import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PokemonCard } from "./PokemonCard";
import { useState } from "react";
import { Loading } from "../Loading/Loading";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

const POKE_DAY_KEY = "@poke_day";
const MAX_POKEMON_NUMBER = 898;

interface PokemonOfTheDayValue {
  num: number;
  date: string;
}

export const PokemonOfTheDay = () => {
  const isFocused = useIsFocused();

  let [pokemonOfTheDay, setPokemonOfTheDay] = useState(-1);

  useEffect(() => {
    getPokemonOfTheDay().then(setPokemonOfTheDay);
  }, [isFocused]);

  if (pokemonOfTheDay < 0 || !isFocused) {
    return <Loading />;
  }

  return <PokemonCard title="Pokémon of the Day" num={pokemonOfTheDay} />;
};

const storePokemonOfTheDay = async (num: number) => {
  try {
    const data = JSON.stringify({ num, date: new Date().toDateString() });
    await AsyncStorage.setItem(POKE_DAY_KEY, data);
  } catch (e) {
    // saving error
  }
};

const getPokemonOfTheDay = async (): Promise<number> => {
  try {
    const data = await AsyncStorage.getItem(POKE_DAY_KEY);

    if (data !== null) {
      const parsedData: PokemonOfTheDayValue = JSON.parse(data);

      if (parsedData.date === new Date().toDateString()) {
        return parsedData.num;
      }
    }

    const randomPokemonNum = Math.round(Math.random() * MAX_POKEMON_NUMBER);
    storePokemonOfTheDay(randomPokemonNum);

    return randomPokemonNum;
  } catch (e) {
    // error reading value
  }

  return -1;
};
