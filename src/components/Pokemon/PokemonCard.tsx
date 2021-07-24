import * as React from "react";
import {
  Image,
  ScrollView,
  SectionListData,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useQuery, gql } from "@apollo/client";
import type { Query } from "@favware/graphql-pokemon";
import { Item, SectionList } from "../List/SectionList";
import { colors, fontSizes } from "../../styles/variables";
import { FlavorTexts } from "./FlavorTexts";
import { getNameWithNum } from "../../mappers/pokemon";
import { Loading } from "../Loading/Loading";
import { commonStyles } from "../../styles/common";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { getPokemonData } from "./Data";
import { openPokemonScreen } from "../Navigation/rootNavigation";

export const GET_POKEMON_DETAILS_BY_NUM = gql`
  query Pokemon($num: Int!) {
    getPokemonDetailsByNumber(pokemon: $num, skip: 0, take: 4, reverse: true) {
      sprite
      backSprite
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

  const pokemon = data.getPokemonDetailsByNumber;

  const list: SectionListData<Item>[] = getPokemonData(pokemon, (number) =>
    openPokemonScreen(number, navigator)
  );

  return (
    <ScrollView testID="pokemonCard" style={commonStyles.scrollView} ref={ref}>
      {title ? <Text style={styles.title}>{title}</Text> : undefined}
      <View style={styles.view}>
        <View style={styles.imageViewer}>
          <Image style={styles.image} source={{ uri: pokemon.sprite }} />
          <Image style={styles.image} source={{ uri: pokemon.backSprite }} />
        </View>
        <Text style={styles.species}>{getNameWithNum(pokemon)}</Text>
        <FlavorTexts flavorTexts={pokemon.flavorTexts} />
      </View>
      <SectionList sections={list} />
    </ScrollView>
  );
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
