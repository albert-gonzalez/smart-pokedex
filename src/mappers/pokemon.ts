import { DexDetails, DexEntry } from "@favware/graphql-pokemon";

export const mapPokemonToItem = (
  pokemon: Partial<DexDetails | DexEntry>,
  changePokemon: any
) => ({
  value: getNameWithNum(pokemon),
  onClick: () => changePokemon(pokemon.num),
});

export const getNameWithNum = (pokemon: Partial<DexDetails | DexEntry>) =>
  `${pokemon.num}. ${pokemon.species}`;
