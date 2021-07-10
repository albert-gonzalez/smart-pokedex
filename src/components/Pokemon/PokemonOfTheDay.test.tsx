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
import { mocks } from "../../api/mockData";

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");
jest.mock("react-native/Libraries/LogBox/LogBox");
jest.mock("../Navigation/rootNavigation.ts");
jest.mock("../../storage/storage.ts");

describe("PokemonOfTheDay", () => {
  const pokemonScreen = () => <PokemonOfTheDay />;
  const originalRandom = Math.random;
  const Tab = createBottomTabNavigator();

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
          <Tab.Navigator>
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
