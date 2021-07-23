import React, { Dispatch, SetStateAction } from "react";

interface SearchContextInput {
  search: string;
  changeSearch: Dispatch<SetStateAction<string>>;
  pokemon: number;
  changePokemon: Dispatch<SetStateAction<number>>;
}

export const SearchContext = React.createContext({
  search: "",
  changeSearch: () => {},
  pokemon: -1,
  changePokemon: () => {},
} as SearchContextInput);
