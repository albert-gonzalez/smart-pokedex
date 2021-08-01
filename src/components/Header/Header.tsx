import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput, View } from "react-native";
import { colors } from "../../styles/variables";
import { getCurrentRoute, navigate } from "../Navigation/rootNavigation";
import debounce from "debounce";
import { Routes } from "../Navigation/routes";

export const Header = () => {
  const [searchInputText, setSearchInputText] = useState("");
  const ref: React.MutableRefObject<HTMLElement & TextInput> = useRef(
    null
  ) as any;

  useEffect(() => {
    if (!ref.current?.addEventListener) {
      return;
    }

    const searchOnEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        debouncedOnSubmitSearch((e.currentTarget as any)?.value);
      }
    };

    ref.current.addEventListener("keydown", searchOnEnter);

    return () => ref.current.removeEventListener("keydown", searchOnEnter);
  }, [ref]);

  const debouncedOnChangeSearch = useCallback(
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

  const debouncedOnSubmitSearch = useCallback(
    debounce(
      (text: string) => {
        navigate(Routes.Explore, {
          params: { search: text },
          screen: Routes.Search,
        });
      },
      10,
      true
    ),
    []
  );

  return (
    <View testID="header" style={styles.bar}>
      <TextInput
        testID="headerSearch"
        ref={ref}
        style={styles.input}
        placeholder="Search Pokémon by number, name or type"
        onChangeText={(text) => {
          setSearchInputText(text);
          debouncedOnChangeSearch(text);
        }}
        onSubmitEditing={(e) => debouncedOnSubmitSearch(e.nativeEvent.text)}
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
