import React, { useCallback, useRef } from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput, View } from "react-native";
import { colors } from "../../styles/variables";
import { navigate } from "../Navigation/RootNavigation";
import debounce from "debounce";

export const Header = () => {
  const [searchInputText, setSearchInputText] = useState("");
  const ref: React.MutableRefObject<TextInput> = useRef(null) as any;

  const debouncedChangeSearch = useCallback(
    debounce((text: string) => {
      navigate("Explore", { params: { search: text }, screen: "Search" });
      ref.current.focus();
    }, 500),
    []
  );
  return (
    <View style={styles.bar}>
      <TextInput
        ref={ref}
        style={styles.input}
        placeholder="Search Pokémon by number, name or type"
        onChangeText={(text) => {
          setSearchInputText(text);
          debouncedChangeSearch(text);
        }}
        value={searchInputText}
      ></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    height: 60,
    padding: 10,
    display: "flex",
    alignItems: "center",
    backgroundColor: colors.stickyBgColor,
    borderBottomWidth: 1,
    borderBottomColor: colors.shadow,
    flexDirection: "row",
  },
  input: {
    height: "100%",
    backgroundColor: "white",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flex: 1,
  },
});
