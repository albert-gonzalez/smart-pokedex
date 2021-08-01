import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react-native";
import { GET_POKEMON_DETAILS_BY_NUM, PokemonCard } from "./PokemonCard";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { openPokemonScreen } from "../Navigation/rootNavigation";

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");
jest.mock("react-native/Libraries/LogBox/LogBox");
jest.mock("../Navigation/rootNavigation.ts");

describe("PokemonCard", () => {
  const pokemonScreen = () => <PokemonCard num={25} />;
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
            sprite: "sprite.jpg",
            backSprite: "backSprite.jpg",
            shinySprite: "shinySprite.jpg",
            shinyBackSprite: "shinyBackSprite.jpg",
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
                flavor: "When Pikachu meet...",
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

  afterEach(() => {
    cleanup();
  });

  const renderPokemonCard = () =>
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <NavigationContainer>
          <Tab.Navigator tabBarOptions={{}}>
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

    expect(getByText("When Pikachu meet..."));
    expectImages(getByTestId, ["sprite.jpg", "backSprite.jpg"]);
    expectGeneralValues(getByText);
    expectStats(getByText);
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

const expectAbilities = (getByText: any) => {
  expect(getByText("Static")).toBeTruthy();
  expect(getByText("Lightning Rod")).toBeTruthy();
};

const expectEvolutions = (getByText: any) => {
  expect(getByText("172. pichu")).toBeTruthy();
  expect(getByText("26. raichu")).toBeTruthy();
};
