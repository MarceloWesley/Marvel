import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import md5 from "md5";
import axios from "axios";
const baseURL = "https://gateway.marvel.com/v1/public/characters?";

export const publicKey = "4e8df3f1729ebfa42bcb2844cbc8facf";
export const privateKey = process.env.REACT_APP_PRIVATEKEY || 'not found'
export const time = Number(new Date());
export const hash = md5(time + privateKey + publicKey);


export interface charactersprops {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    extension: string;
    path: string;
  };
  stories?: string;
  urls: Array<{ type: string; url: string }>;
}

interface charactersData {
  characters: charactersprops[];
}

interface characterProviderProps {
  children: ReactNode;
}

const charactersContext = createContext<charactersData>({} as charactersData);
export function CharactersProvider({ children }: characterProviderProps) {
  const [characters, setCharacters] = useState<charactersprops[]>([]);

  useEffect(() => {
    axios
      .get(`${baseURL}ts=${time}&apikey=${publicKey}&hash=${hash}`)
      .then((response) => setCharacters(response.data.data.results));
  }, []);

  return (
    <charactersContext.Provider value={{ characters }}>
      {children}
    </charactersContext.Provider>
  );
}

export function useCharacters() {
  const context = useContext(charactersContext);
  return context;
}
