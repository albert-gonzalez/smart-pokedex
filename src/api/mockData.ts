import { MockedResponse } from "@apollo/client/testing";
import { SEARCH_POKEMON_QUERY } from "../components/Explore/Search";
import { GET_POKEMON_DETAILS_BY_NUM } from "../components/Pokemon/PokemonCard";

export const mocks: MockedResponse<any>[] = [
  {
    request: {
      query: GET_POKEMON_DETAILS_BY_NUM,
      variables: {
        num: 25,
      },
    },
    result: {
      data: {
        getPokemonDetailsByNumber: {
          __typename: "DexDetails",
          sprite: "sprite.jpg",
          backSprite: "backSprite.jpg",
          shinySprite: "shinySprite.jpg",
          shinyBackSprite: "shinyBackSprite.jpg",
          num: 25,
          species: "pikachu",
          baseSpecies: null,
          color: "Yellow",
          weight: 6,
          height: 0.4,
          types: ["Electric", "Other"],
          abilities: {
            __typename: "AbilitiesEntry",
            first: "Static",
            second: null,
            special: null,
            hidden: "Lightning Rod",
          },
          flavorTexts: [
            {
              __typename: "FlavorEntry",
              flavor: "When Pikachu meet...",
              game: "Shield",
            },
            {
              __typename: "FlavorEntry",
              flavor:
                "Pikachu that can generate powerful electricity have cheek sacs that are extra soft and super stretchy.",
              game: "Sword",
            },
            {
              __typename: "FlavorEntry",
              flavor:
                "This forest-dwelling Pokémon stores electricity in its cheeks, so you'll feel a tingly shock if you touch it.",
              game: "Let's Go Eevee",
            },
            {
              __typename: "FlavorEntry",
              flavor:
                "This forest-dwelling Pokémon stores electricity in its cheeks, so you'll feel a tingly shock if you touch it.",
              game: "Let's Go Pikachu",
            },
          ],
          baseStats: {
            __typename: "StatsEntry",
            hp: "hp 35",
            attack: "attack 55",
            defense: "defense 40",
            speed: "speed 90",
            specialattack: "special attack 50",
            specialdefense: "special defense 50",
          },
          baseStatsTotal: "total 320",
          evolutions: [
            {
              __typename: "DexDetails",
              num: 26,
              species: "raichu",
              baseSpecies: null,
            },
            {
              __typename: "DexDetails",
              num: 26,
              species: "raichu-alola",
              baseSpecies: "Raichu",
            },
          ],
          preevolutions: [
            {
              __typename: "DexDetails",
              num: 172,
              species: "pichu",
              baseSpecies: null,
            },
          ],
          eggGroups: ["Electric Egg", "Another Egg"],
        },
      },
    },
  },
  {
    request: {
      query: SEARCH_POKEMON_QUERY,
      variables: {
        search: "rai",
      },
    },
    result: {
      data: {
        getDexEntries: [
          {
            num: 26,
            species: "Raichu",
            baseSpecies: "",
          },
        ],
      },
    },
  },
  {
    request: {
      query: SEARCH_POKEMON_QUERY,
      variables: {
        search: "fire",
      },
    },
    result: {
      data: {
        getDexEntries: [
          {
            num: 26,
            species: "Raichu",
            baseSpecies: "",
          },
        ],
      },
    },
  },
];
