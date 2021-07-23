import React from "react";
import { FlavorEntry } from "@favware/graphql-pokemon";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../styles/variables";

export const Card: React.FC = ({ children }) => (
  <View style={styles.card}>{children}</View>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: "hidden",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: colors.shadow,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    marginBottom: 30,
  },
});
