import { createContext, ReactNode, useContext, useState } from "react";
import { FetchSearch } from "./FetchSearch";
import { charactersprops } from "./Usecharacters";
import { comicsProps } from "./UseComics";
import { seriesProps } from "./UseSeries";

interface SearchPropsData {
  searchOption: string;
  searchValue: string;
  searchCharacterValue: charactersprops[];
  searchComicsValue: comicsProps[];
  searchSeriesValue: seriesProps[];
  setSearchOption: (type: string) => void;
  setSearchValue: (name: string) => void;
  setSearch: (name: string) => Promise<void>;
}

interface SearchProviderProps {
  children: ReactNode;
}

const SearchContext = createContext<SearchPropsData>({} as SearchPropsData);
export function SearchContextProvider({ children }: SearchProviderProps) {
  const [searchOption, setSearchOption] = useState<string>("character");
  const [searchCharacterValue, setsearchCharacterValue] = useState<
    charactersprops[]
  >([]);
  const [searchComicsValue, setSearchComicsValue] = useState<comicsProps[]>([]);
  const [searchSeriesValue, setSearchSeriesValue] = useState<seriesProps[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const { getCharacter, getComics, getSeries } = FetchSearch();
  console.log(searchOption);

  const setSearch = async (name: string) => {
    switch (searchOption) {
      case "character":
        const character = await getCharacter(name);
        setsearchCharacterValue(character.data.results);
        break;
      case "comics":
        const comics = await getComics(name);
        setSearchComicsValue(comics.data.results);
        break;
      case "series":
        const series = await getSeries(name);
        setSearchSeriesValue(series.data.results);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        searchOption,
        setSearchOption,
        setSearch,
        setSearchValue,
        searchValue,
        searchCharacterValue,
        searchComicsValue,
        searchSeriesValue,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  return context;
}
