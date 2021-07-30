import React, { useCallback, useRef } from "react";
import { useState } from "react";
import { Keyboard, StyleSheet } from "react-native";
import { TextInput, View } from "react-native";
import { colors } from "../../styles/variables";
import { getCurrentRoute, navigate } from "../Navigation/rootNavigation";
import debounce from "debounce";
import { Routes } from "../Navigation/routes";

export const Header = () => {
  const [searchInputText, setSearchInputText] = useState("");
  const ref: React.MutableRefObject<TextInput> = useRef(null) as any;

  const debouncedSearch = useCallback(
    debounce((text: string) => {
      if (getCurrentRoute() !== Routes.Search) {
        return;
      }

      navigate(Routes.Explore, {
        params: { search: text },
        screen: Routes.Search,
      });
    }, 500),
    []
  );

  const search = (text: string) => {
    Keyboard.dismiss();
    navigate(Routes.Explore, {
      params: { search: text },
      screen: Routes.Search,
    });
  };

  return (
    <View testID="header" style={styles.bar}>
      <TextInput
        testID="headerSearch"
        ref={ref}
        style={styles.input}
        placeholder="Search Pokémon by number, name or type"
        onChangeText={(text) => {
          setSearchInputText(text);
          debouncedSearch(text);
        }}
        onSubmitEditing={(e) => search(e.nativeEvent.text)}
        autoCorrect={false}
        autoCompleteType="off"
        returnKeyType="search"
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
