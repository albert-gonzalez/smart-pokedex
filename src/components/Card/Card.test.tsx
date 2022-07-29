import React from "react";
import { render } from "@testing-library/react-native";
import { Card } from "./Card";
import { Text } from "react-native";

describe("Card", () => {
  test("renders correctly", () => {
    const { getByText } = render(
      <Card>
        <Text>This is a test card</Text>
      </Card>
    );

    const text = getByText("This is a test card");

    expect(text).toBeTruthy();
  });
});
