import md5 from "md5";
import {
  ReactNode,
  useContext,
  useEffect,
  useState,
  createContext,
} from "react";
import axios from "axios";

const baseURL = "https://gateway.marvel.com:443/v1/public/comics?";
export const publicKey = "4e8df3f1729ebfa42bcb2844cbc8facf";
export const privateKey = process.env.REACT_APP_PRIVATEKEY || 'not found'
export const time = Number(new Date());
export const hash = md5(time + privateKey + publicKey);

export interface comicsProps {
  id: number;
  title: string;
  description: string;
  thumbnail: {
    extension: string;
    path: string;
  };
  creators: {
    items: Array<{ name: string; role: string }>;
  };
  dates: Array<{ type: string; date: string }>;
  urls: Array<{ type: string; url: string }>;
  startYear: number;
  endYear: number;
}

interface comicsData {
  comics: comicsProps[];
}

interface comicsProviderProps {
  children: ReactNode;
}

const comicsContext = createContext<comicsData>({} as comicsData);
export function ComicsProvider({ children }: comicsProviderProps) {
  const [comics, setComics] = useState<comicsProps[]>([]);

  useEffect(() => {
    axios
      .get(`${baseURL}ts=${time}&apikey=${publicKey}&hash=${hash}`)
      .then((response) => setComics(response.data.data.results));
  }, []);

  return (
    <comicsContext.Provider value={{ comics }}>
      {children}
    </comicsContext.Provider>
  );
}

export function useComics() {
  const context = useContext(comicsContext);
  return context;
}
