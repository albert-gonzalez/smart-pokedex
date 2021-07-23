import { StyleSheet, StyleSheetProperties } from "react-native";
import { colors } from "./variables";

const commonViewStyles = {
  backgroundColor: colors.background,
  padding: 20,
};

export const commonStyles = StyleSheet.create({
  scrollView: {
    ...commonViewStyles,
    height: "100%",
  },
  listView: {
    ...commonViewStyles,
    paddingVertical: 0,
    paddingHorizontal: 20,
    height: "100%",
  },
  view: {
    ...commonViewStyles,
    display: "flex",
    alignItems: "center",
  },
  centeredView: {
    ...commonViewStyles,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});
