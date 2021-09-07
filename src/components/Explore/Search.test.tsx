import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { openPokemonScreen } from "../Navigation/rootNavigation";
import { Search, SEARCH_POKEMON_QUERY } from "./Search";
import { mocks } from "../../api/mockData";

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");
jest.mock("react-native/Libraries/LogBox/LogBox");
jest.mock("../Navigation/rootNavigation.ts");

describe("Search", () => {
  let search: string = "25";
  const searchScreen = () => <Search search={search} />;
  const Tab = createBottomTabNavigator();

  afterEach(() => {
    cleanup();
  });

  const renderSearch = () =>
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Test" component={searchScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </MockedProvider>
    );

  test("renders correctly", async () => {
    const { getByTestId } = renderSearch();

    await waitFor(() => expect(getByTestId("search")).toBeTruthy());
  });
  test("shows all pokemon if the search is empty", async () => {
    search = "";
    const { getByTestId, getByText } = renderSearch();

    await waitFor(() => expect(getByTestId("search")).toBeTruthy());

    expect(getByText("1. Bulbasaur")).toBeTruthy();
    expect(getByText("4. Charmander")).toBeTruthy();
    expect(getByText("7. Squirtle")).toBeTruthy();
  });

  test("filters by number if the search is a number", async () => {
    search = "25";
    const { getByTestId, getByText } = renderSearch();

    await waitFor(() => expect(getByTestId("search")).toBeTruthy());

    expect(() => getByText("1. Bulbasaur")).toThrowError();
    expect(getByText("25. Pikachu")).toBeTruthy();
  });

  test("filters by name if the search is a string", async () => {
    search = "rai";
    const { getByTestId, getByText } = renderSearch();

    await waitFor(() => expect(getByTestId("search")).toBeTruthy());

    expect(() => getByText("1. Bulbasaur")).toThrowError();
    expect(getByText("26. Raichu")).toBeTruthy();
  });

  test("filters by type if the search is a type and the result is concatenated with the graphql search", async () => {
    search = "fire"; // THE MOCKED GRAPHQL REQUEST RETURNS RAICHU WITH "fire" SEARCH
    const { getByTestId, queryByText } = renderSearch();

    await waitFor(() => expect(getByTestId("search")).toBeTruthy());

    expect(queryByText("1. Bulbasaur")).toBeNull();
    expect(queryByText("4. Charmander")).toBeTruthy();
    expect(queryByText("26. Raichu")).toBeTruthy();
  });

  test("opens the pokemon screen when a element of the list is pressed", async () => {
    search = "26";
    const { getByTestId, getByText } = renderSearch();

    await waitFor(() => expect(getByTestId("search")).toBeTruthy());

    fireEvent.press(getByText("26. Raichu"));

    expect(openPokemonScreen).toHaveBeenCalledWith(26, expect.anything());
  });
});
