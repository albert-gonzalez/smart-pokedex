import { gql, useLazyQuery } from "@apollo/client";
import { Query } from "@favware/graphql-pokemon";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useMemo } from "react";
import { SectionListData, Text } from "react-native";
import { StyleSheet, View } from "react-native";
import { mapPokemonToItem } from "../../mappers/pokemon";
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

  const pokemonList = useMemo(
    () =>
      pokemonGenerations.map((generation) => ({
        title: generation.title,
        data: generation.data.map((pokemon) =>
          mapPokemonToItem(pokemon, changePokemon)
        ),
      })),
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
    return (
      <View style={commonStyles.listView}>
        <SectionList native={true} sections={pokemonList} />
      </View>
    );
  }

  const numberSearch = parseInt(search);

  if (!isNaN(numberSearch)) {
    const filteredPokemon = [
      {
        title: "Results",
        data: pokemonList
          .flatMap((generation) => generation.data)
          .filter((pokemon) => pokemon.value.includes(numberSearch + "")),
      },
    ];
    return (
      <View style={commonStyles.scrollView}>
        <SectionList native={true} sections={filteredPokemon} />
      </View>
    );
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
          Ops! No Pokémons found. Try another search!
        </Text>
      </View>
    );
  if (!data) return <Loading />;

  let pokemonByType: Pokemon[] = [];

  if (search.length > 1) {
    pokemonByType = pokemonGenerations
      .flatMap((generation) => generation.data)
      .filter((pokemon) =>
        pokemon.types
          .join(", ")
          .toLocaleLowerCase()
          .includes(search.toLowerCase())
      );
  }
  const list: SectionListData<Item>[] = [
    {
      title: "Results",
      data: (data.getDexEntries as unknown as Pokemon[])
        .filter((pokemon) => pokemon.num >= 0 && !pokemon.baseSpecies)
        .concat(pokemonByType)
        .map((pokemon) => mapPokemonToItem(pokemon, changePokemon)),
    },
  ];

  return (
    <View style={commonStyles.scrollView}>
      <SectionList native={true} sections={list} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchText: {
    color: colors.text,
    fontSize: fontSizes.xl,
    textAlign: "center",
  },
});
