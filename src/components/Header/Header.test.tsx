import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Header } from "./Header";
import * as rootNavigation from "../Navigation/rootNavigation";
import { Routes } from "../Navigation/routes";

jest.mock("../Navigation/rootNavigation.ts");

describe("Header", () => {
  test("renders correctly", () => {
    const { getByTestId } = render(<Header />);

    const header = getByTestId("header");
    const headerSearch = getByTestId("headerSearch");

    expect(header).toBeTruthy();
    expect(headerSearch).toBeTruthy();
  });

  test("calls navigate on submitting", () => {
    const { getByTestId } = render(<Header />);

    const headerSearch = getByTestId("headerSearch");

    fireEvent(headerSearch, "submitEditing", {
      nativeEvent: { text: "Pikachu" },
    });

    expect(rootNavigation.navigate).toBeCalledWith("Explore", {
      params: { search: "Pikachu" },
      screen: "Search",
    });
  });

  test("calls navigate on changing text", () => {
    (rootNavigation as any).setCurrentRoute(Routes.Search);

    const { getByTestId } = render(<Header />);

    const headerSearch = getByTestId("headerSearch");

    fireEvent.changeText(headerSearch, "Pikachu");

    expect(rootNavigation.navigate).toBeCalledWith("Explore", {
      params: { search: "Pikachu" },
      screen: "Search",
    });
  });
});
