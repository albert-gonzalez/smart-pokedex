import { DexDetails, DexEntry } from "@favware/graphql-pokemon";
import { Item } from "../components/List/SectionList";
import { Pokemon, PokemonGeneration } from "../components/Pokemon/Data";

type ChangePokemonFunction = (pokemon: number) => void;

export const mapPokemonToItem = (
  pokemon: Partial<DexDetails | DexEntry>,
  changePokemon: any
): Item => ({
  value: getNameWithNum(pokemon),
  onClick: () => changePokemon(pokemon.num),
});

export const getNameWithNum = (pokemon: Partial<DexDetails | DexEntry>) =>
  `${pokemon.num}. ${pokemon.species}`;

export const mapGenerationsToSections = (
  pokemonGenerations: PokemonGeneration[],
  changePokemon: ChangePokemonFunction
) =>
  pokemonGenerations.map((generation) => ({
    title: generation.title,
    data: generation.data.map((pokemon) =>
      mapPokemonToItem(pokemon, changePokemon)
    ),
  }));

export const filterPokemonByNumAndMapToItem = (
  pokemonGenerations: PokemonGeneration[],
  numberSearch: number,
  changePokemon: ChangePokemonFunction
) =>
  pokemonGenerations
    .flatMap((generation) => generation.data)
    .filter((pokemon) => (pokemon.num + "").includes(numberSearch + ""))
    .map((pokemon) => mapPokemonToItem(pokemon, changePokemon));

export const filterPokemonByTypeAndMapToItem = (
  pokemonGenerations: PokemonGeneration[],
  search: string,
  changePokemon: ChangePokemonFunction
) =>
  pokemonGenerations
    .flatMap((generation) => generation.data)
    .filter((pokemon) =>
      pokemon.types
        .join(", ")
        .toLocaleLowerCase()
        .includes(search.toLowerCase())
    )
    .map((pokemon) => mapPokemonToItem(pokemon, changePokemon));

export const filterValidPokemonAndMapToItem = (
  pokemon: Pokemon[],
  changePokemon: ChangePokemonFunction
) =>
  pokemon
    .filter((pokemon) => pokemon.num >= 0 && !pokemon.baseSpecies)
    .map((pokemon) => mapPokemonToItem(pokemon, changePokemon));
