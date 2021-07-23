import { gql, useLazyQuery } from "@apollo/client";
import { Query } from "@favware/graphql-pokemon";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useMemo } from "react";
import { SectionListData, Text } from "react-native";
import { StyleSheet, View } from "react-native";
import {
  filterPokemonByNumAndMapToItem,
  filterPokemonByTypeAndMapToItem,
  filterValidPokemonAndMapToItem,
  mapGenerationsToSections,
} from "../../mappers/pokemon";
import { commonStyles } from "../../styles/common";
import { colors, fontSizes } from "../../styles/variables";
import { Item, SectionList } from "../List/SectionList";
import { Loading } from "../Loading/Loading";
import { Pokemon, pokemonGenerations } from "../Pokemon/Data";

interface SearchInput {
  search: string;
}

const SEARCH_POKEMON = gql`
  query ($search: String!) {
    getDexEntries(pokemon: $search, reverse: true, take: 20) {
      num
      species
      baseSpecies
    }
  }
`;

export const Search = ({ search }: SearchInput) => {
  const navigator = useNavigation();
  const changePokemon = (pokemon: number) => {
    navigator.navigate("Pokemon", { pokemon, search: "" });
  };

  const allPokemon = useMemo(
    () => mapGenerationsToSections(pokemonGenerations, changePokemon),
    []
  );

  const [searchPokemon, { called, loading, data, error }] = useLazyQuery<Query>(
    SEARCH_POKEMON,
    {
      variables: {
        search,
      },
    }
  );

  if (search.length < 1) {
    return renderPokemonList(allPokemon);
  }

  const numberSearch = parseInt(search);

  if (!isNaN(numberSearch)) {
    const pokemonByNumber = [
      {
        title: "Results",
        data: filterPokemonByNumAndMapToItem(
          pokemonGenerations,
          numberSearch,
          changePokemon
        ),
      },
    ];

    return renderPokemonList(pokemonByNumber);
  }

  if (!called) {
    searchPokemon();

    return <Loading />;
  }

  if (called && loading) return <Loading />;
  if (called && error)
    return (
      <View style={commonStyles.centeredView}>
        <Text style={styles.searchText}>
          Ops! No Pokémon found. Try another search!
        </Text>
      </View>
    );
  if (!data) return <Loading />;

  let pokemonByType: Item[] = [];

  if (search.length > 1) {
    pokemonByType = filterPokemonByTypeAndMapToItem(
      pokemonGenerations,
      search,
      changePokemon
    );
  }

  const queryResultsAndPokemonByType: SectionListData<Item>[] = [
    {
      title: "Results",
      data: filterValidPokemonAndMapToItem(
        data.getDexEntries as unknown as Pokemon[],
        changePokemon
      ).concat(pokemonByType),
    },
  ];

  return renderPokemonList(queryResultsAndPokemonByType);
};

const renderPokemonList = (pokemon: SectionListData<Item>[]) => (
  <View style={commonStyles.listView}>
    <SectionList native={true} sections={pokemon} />
  </View>
);

const styles = StyleSheet.create({
  searchText: {
    color: colors.text,
    fontSize: fontSizes.xl,
    textAlign: "center",
  },
});
