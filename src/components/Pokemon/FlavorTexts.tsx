import React from "react";
import { FlavorEntry } from "@favware/graphql-pokemon/generated/ts/graphql-pokemon";
import { Text, View } from "react-native";
import { Card } from "../Card/Card";
import { StyleSheet } from "react-native";
import { colors, fontSizes } from "../../styles/variables";

interface FlavorEntries {
  flavorTexts: readonly FlavorEntry[];
}

export const FlavorTexts = ({ flavorTexts }: FlavorEntries) => (
  <Card>
    <TextList flavorTexts={flavorTexts} />
  </Card>
);

const TextList = ({ flavorTexts }: FlavorEntries) => {
  const storedTexts: string[] = [];
  return (
    <View style={styles.textList}>
      {flavorTexts
        .filter((flavorTexts) => {
          const isAlreadyStored = storedTexts.includes(flavorTexts.flavor);

          storedTexts.push(flavorTexts.flavor);

          return !isAlreadyStored;
        })
        .map((flavorText, index) => (
          <FlavorText key={index} flavorText={flavorText} />
        ))}
    </View>
  );
};

const FlavorText = ({ flavorText }: { flavorText: FlavorEntry }) => (
  <Text style={styles.text}>{flavorText.flavor}</Text>
);

const styles = StyleSheet.create({
  textList: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  text: {
    color: colors.text,
    marginBottom: 10,
    fontSize: fontSizes.m,
    lineHeight: 22,
    textAlign: "justify",
  },
});
