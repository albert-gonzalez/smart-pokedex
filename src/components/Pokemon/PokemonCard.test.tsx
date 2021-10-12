import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react-native";
import { PokemonCard } from "./PokemonCard";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MockedProvider } from "@apollo/client/testing";
import { openPokemonScreen } from "../Navigation/rootNavigation";
import { mocks } from "../../api/mockData";
import "core-js";

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");
jest.mock("react-native/Libraries/LogBox/LogBox");
jest.mock("../Navigation/rootNavigation.ts");

describe("PokemonCard", () => {
  const pokemonScreen = () => <PokemonCard num={25} />;
  const Tab = createBottomTabNavigator();

  afterEach(() => {
    cleanup();
  });

  const renderPokemonCard = () =>
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Test" component={pokemonScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </MockedProvider>
    );

  test("renders correctly", async () => {
    const { getByTestId } = renderPokemonCard();

    await waitFor(() => expect(getByTestId("pokemonCard")).toBeTruthy());
  });

  test("shows query data", async () => {
    const { getByTestId, getByText } = renderPokemonCard();

    await waitFor(() => expect(getByTestId("pokemonCard")).toBeTruthy());

    expect(getByText("25. pikachu")).toBeTruthy();
    expect(getByText("When Pikachu meet..."));
    expectImages(getByTestId, ["sprite.jpg", "backSprite.jpg"]);
    expectGeneralValues(getByText);
    expectStats(getByText);
    expectEggGroups(getByText);
    expectAbilities(getByText);
    expectEvolutions(getByText);
  });

  test("navigates when clicking an evolution", async () => {
    const { getByTestId, getByText } = renderPokemonCard();

    await waitFor(() => expect(getByTestId("pokemonCard")).toBeTruthy());

    const evolution = getByText("26. raichu");

    fireEvent.press(evolution);
    expect(openPokemonScreen).toBeCalledWith(26, expect.anything());
  });

  test("changes to shiny images when clicking shiny button and back to normal images when clicking normal button", async () => {
    const { getByTestId, getByText } = renderPokemonCard();

    await waitFor(() => expect(getByTestId("pokemonCard")).toBeTruthy());

    const shinyButton = getByTestId("shinyImageButton");
    const normalButton = getByTestId("normalImageButton");

    fireEvent.press(shinyButton);

    expectImages(getByTestId, ["shinySprite.jpg", "shinyBackSprite.jpg"]);

    fireEvent.press(normalButton);

    expectImages(getByTestId, ["sprite.jpg", "backSprite.jpg"]);
  });
});

const expectImages = async (getByTestId: any, [front, back]: string[]) => {
  expect(getByTestId("image").props.source.uri).toEqual(front);
  expect(getByTestId("backImage").props.source.uri).toEqual(back);
};

const expectGeneralValues = (getByText: any) => {
  expect(getByText("25")).toBeTruthy();
  expect(getByText("pikachu")).toBeTruthy();
  expect(getByText("Yellow")).toBeTruthy();
  expect(getByText("0.4 meters")).toBeTruthy();
  expect(getByText("6 Kg.")).toBeTruthy();
  expect(getByText("Electric, Other")).toBeTruthy();
};

const expectStats = (getByText: any) => {
  expect(getByText("attack 55")).toBeTruthy();
  expect(getByText("hp 35")).toBeTruthy();
  expect(getByText("defense 40")).toBeTruthy();
  expect(getByText("speed 90")).toBeTruthy();
  expect(getByText("special attack 50")).toBeTruthy();
  expect(getByText("special defense 50")).toBeTruthy();
  expect(getByText("total 320")).toBeTruthy();
};

const expectEggGroups = (getByText: any) => {
  expect(getByText("Electric Egg")).toBeTruthy();
  expect(getByText("Another Egg")).toBeTruthy();
};

const expectAbilities = (getByText: any) => {
  expect(getByText("Static")).toBeTruthy();
  expect(getByText("Lightning Rod")).toBeTruthy();
};

const expectEvolutions = (getByText: any) => {
  expect(getByText("172. pichu")).toBeTruthy();
  expect(getByText("26. raichu")).toBeTruthy();
};
