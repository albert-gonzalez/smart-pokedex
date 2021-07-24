import React from "react";
import {
  act,
  cleanup,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react-native";
import { GET_POKEMON_DETAILS_BY_NUM, PokemonCard } from "./PokemonCard";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { PokemonOfTheDay } from "./PokemonOfTheDay";
import { clear, getItem, setItem } from "../../storage/storage";
import MockDate from "mockdate";

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");
jest.mock("react-native/Libraries/LogBox/LogBox");
jest.mock("../Navigation/rootNavigation.ts");
jest.mock("../../storage/storage.ts");

describe("PokemonOfTheDay", () => {
  const pokemonScreen = () => <PokemonOfTheDay />;
  const originalRandom = Math.random;
  const Tab = createBottomTabNavigator();

  const mocks: MockedResponse<any>[] = [
    {
      request: {
        query: GET_POKEMON_DETAILS_BY_NUM,
        variables: {
          num: 25,
        },
      },
      result: {
        data: {
          getPokemonDetailsByNumber: {
            __typename: "DexDetails",
            sprite: "https://play.pokemonshowdown.com/sprites/ani/pikachu.gif",
            backSprite:
              "https://play.pokemonshowdown.com/sprites/ani-back/pikachu.gif",
            num: 25,
            species: "pikachu",
            baseSpecies: null,
            color: "Yellow",
            weight: 6,
            height: 0.4,
            types: ["Electric", "Other"],
            abilities: {
              __typename: "AbilitiesEntry",
              first: "Static",
              second: null,
              special: null,
              hidden: "Lightning Rod",
            },
            flavorTexts: [
              {
                __typename: "FlavorEntry",
                flavor:
                  "When Pikachu meet, they'll touch their tails together and exchange electricity through them as a form of greeting.",
                game: "Shield",
              },
              {
                __typename: "FlavorEntry",
                flavor:
                  "Pikachu that can generate powerful electricity have cheek sacs that are extra soft and super stretchy.",
                game: "Sword",
              },
              {
                __typename: "FlavorEntry",
                flavor:
                  "This forest-dwelling Pokémon stores electricity in its cheeks, so you'll feel a tingly shock if you touch it.",
                game: "Let's Go Eevee",
              },
              {
                __typename: "FlavorEntry",
                flavor:
                  "This forest-dwelling Pokémon stores electricity in its cheeks, so you'll feel a tingly shock if you touch it.",
                game: "Let's Go Pikachu",
              },
            ],
            baseStats: {
              __typename: "StatsEntry",
              hp: "hp 35",
              attack: "attack 55",
              defense: "defense 40",
              speed: "speed 90",
              specialattack: "special attack 50",
              specialdefense: "special defense 50",
            },
            baseStatsTotal: "total 320",
            evolutions: [
              {
                __typename: "DexDetails",
                num: 26,
                species: "raichu",
                baseSpecies: null,
              },
              {
                __typename: "DexDetails",
                num: 26,
                species: "raichu-alola",
                baseSpecies: "Raichu",
              },
            ],
            preevolutions: [
              {
                __typename: "DexDetails",
                num: 172,
                species: "pichu",
                baseSpecies: null,
              },
            ],
          },
        },
      },
    },
  ];

  beforeEach(() => {
    Math.random = () => 25 / 898; // Pikachu number
    MockDate.set(0);
  });

  afterEach(() => {
    Math.random = originalRandom;
    MockDate.reset();
    clear();
    cleanup();
  });

  const renderPokemonOfTheDay = () => {
    return render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <NavigationContainer>
          <Tab.Navigator tabBarOptions={{}}>
            <Tab.Screen name="Test" component={pokemonScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </MockedProvider>
    );
  };

  test("renders correctly", async () => {
    const { getByTestId } = renderPokemonOfTheDay();

    await waitFor(() => expect(getByTestId("pokemonCard")).toBeTruthy());
    expect(getItem).toHaveBeenCalled();
    expect(setItem).toHaveBeenCalledWith(
      "@poke_day",
      JSON.stringify({
        num: 25,
        date: "Thu Jan 01 1970",
      })
    );
  });

  test("calls setItem only once if the page renders twice the same day", async () => {
    let { getByTestId } = renderPokemonOfTheDay();
    await waitFor(() => expect(getByTestId("pokemonCard")).toBeTruthy());

    ({ getByTestId } = renderPokemonOfTheDay());

    await waitFor(() => expect(getByTestId("pokemonCard")).toBeTruthy());
    expect(getItem).toBeCalledTimes(2);
    expect(setItem).toBeCalledTimes(1);
  });

  test("calls setItem twice if the page renders again on a different day", async () => {
    let { getByTestId } = renderPokemonOfTheDay();
    await waitFor(() => expect(getByTestId("pokemonCard")).toBeTruthy());

    ({ getByTestId } = renderPokemonOfTheDay());

    MockDate.set(86400000);

    await waitFor(() => expect(getByTestId("pokemonCard")).toBeTruthy());
    expect(getItem).toBeCalledTimes(2);
    expect(setItem).toBeCalledTimes(2);
  });
});
