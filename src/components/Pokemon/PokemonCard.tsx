import React, { useState } from "react";
import {
  Image,
  ScrollView,
  SectionListData,
  StyleSheet,
  Text,
  TextStyle,
  TouchableHighlight,
  View,
} from "react-native";
import { useQuery, gql } from "@apollo/client";
import type { Query } from "@favware/graphql-pokemon/generated/ts/graphql-pokemon";
import { Item, SectionList } from "../List/SectionList";
import { colors, fontSizes } from "../../styles/variables";
import { FlavorTexts } from "./FlavorTexts";
import { getNameWithNum } from "../../mappers/pokemon";
import { Loading } from "../Loading/Loading";
import { commonStyles } from "../../styles/common";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { getPokemonData } from "./Data";
import { openPokemonScreen } from "../Navigation/rootNavigation";
import { useEffect } from "react";

export const GET_POKEMON_DETAILS_BY_NUM = gql`
  query Pokemon($num: Int!) {
    getPokemonByDexNumber(
      number: $num
      reverseFlavorTexts: true
      takeFlavorTexts: 4
    ) {
      sprite
      backSprite
      shinySprite
      shinyBackSprite
      num
      species
      baseSpecies
      color
      weight
      height
      types
      abilities {
        first
        second
        special
        hidden
      }
      flavorTexts {
        flavor
        game
      }
      baseStats {
        hp
        attack
        defense
        speed
        specialattack
        specialdefense
      }
      baseStatsTotal
      evolutions {
        num
        species
        baseSpecies
      }
      preevolutions {
        num
        species
        baseSpecies
      }
      eggGroups
    }
  }
`;

interface PokemonCardInput {
  title?: string;
  num: number;
}

export const PokemonCard = ({ num, title }: PokemonCardInput) => {
  const navigator = useNavigation() as any;
  const ref: React.MutableRefObject<ScrollView> = React.useRef(null) as any;
  const isFocused = useIsFocused();
  const [normalImageSelected, setNormalImageSelected] = useState(true);

  if (!isFocused) {
    ref.current?.scrollTo({ y: 0 });
  }

  const { loading, error, data } = useQuery<Query>(GET_POKEMON_DETAILS_BY_NUM, {
    variables: {
      num,
    },
  });

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return (
      <View style={commonStyles.centeredView}>
        <Text style={styles.title}>Ops! Pokémon Not Found. Try another!</Text>
      </View>
    );
  }
  if (!data) {
    return <Text style={commonStyles.scrollView}>Error! Empty Data</Text>;
  }

  const pokemon = data.getPokemonByDexNumber;

  const list: SectionListData<Item>[] = getPokemonData(pokemon, (number) =>
    openPokemonScreen(number, navigator)
  );

  return (
    <ScrollView testID="pokemonCard" style={commonStyles.scrollView} ref={ref}>
      {title ? (
        <Text testID="title" style={styles.title}>
          {title}
        </Text>
      ) : undefined}
      <View style={styles.view}>
        <View testID="imageViewer" style={styles.imageViewer}>
          <Image
            testID="image"
            style={styles.image}
            source={{
              uri: normalImageSelected ? pokemon.sprite : pokemon.shinySprite,
            }}
          />
          <Image
            testID="backImage"
            style={styles.image}
            source={{
              uri: normalImageSelected
                ? pokemon.backSprite
                : pokemon.shinyBackSprite,
            }}
          />
        </View>
        <View style={styles.imageButtons}>
          <TouchableHighlight
            testID="normalImageButton"
            underlayColor="rgba(255, 255, 255, 0.2)"
            onPress={() => setNormalImageSelected(true)}
          >
            <Text
              style={[
                styles.normalImageButton,
                normalImageSelected ? styles.selectedButton : {},
              ]}
            >
              Normal
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            testID="shinyImageButton"
            underlayColor="rgba(255, 255, 255, 0.2)"
            onPress={() => setNormalImageSelected(false)}
          >
            <Text
              style={[
                styles.shinyImageButton,
                !normalImageSelected ? styles.selectedButton : {},
              ]}
            >
              Shiny
            </Text>
          </TouchableHighlight>
        </View>
        <Text testID="species" style={styles.species}>
          {getNameWithNum(pokemon)}
        </Text>
        <FlavorTexts flavorTexts={pokemon.flavorTexts} />
      </View>
      <SectionList sections={list} />
    </ScrollView>
  );
};

const imageButtonStyles: TextStyle = {
  padding: 10,
  backgroundColor: "rgba(255, 255, 255, .1)",
  shadowOffset: { width: 2, height: 2 },
  shadowColor: colors.shadow,
  borderWidth: 1,
  borderColor: colors.text,
  width: 140,
  textAlign: "center",
  fontSize: fontSizes.m,
  color: colors.text,
};

const styles = StyleSheet.create({
  view: {
    display: "flex",
    alignItems: "center",
  },
  imageViewer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: colors.imageViewer,
    width: "100%",
    justifyContent: "center",
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    shadowOffset: { width: -1, height: -1 },
    shadowColor: "grey",
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    margin: 20,
  },
  imageButtons: {
    flexDirection: "row",
    marginBottom: 20,
  },
  normalImageButton: {
    ...imageButtonStyles,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  shinyImageButton: {
    ...imageButtonStyles,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  selectedButton: {
    backgroundColor: "rgba(255, 255, 255, .25)",
  },
  title: {
    color: colors.text,
    fontSize: fontSizes.xxl,
    textAlign: "center",
    marginBottom: 20,
  },
  species: {
    color: colors.text,
    fontSize: fontSizes.xl,
    textTransform: "capitalize",
    marginBottom: 20,
  },
});
