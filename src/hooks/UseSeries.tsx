import axios from "axios";
import md5 from "md5";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const baseURL = "https://gateway.marvel.com:443/v1/public/series?";
export const publicKey = "4e8df3f1729ebfa42bcb2844cbc8facf";
export const privateKey = process.env.REACT_APP_PRIVATEKEY || 'not found'
export const time = Number(new Date());
export const hash = md5(time + privateKey + publicKey);

export interface seriesProps {
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
  startYear: number;
  endYear: number;
  urls: Array<{ type: string; url: string }>;
}

interface seriesData {
  series: seriesProps[];
}

interface seriesProvider {
  children: ReactNode;
}

const seriesContext = createContext<seriesData>({} as seriesData);

export function SeriesProvider({ children }: seriesProvider) {
  const [series, setSeries] = useState<seriesProps[]>([]);

  useEffect(() => {
    axios
      .get(`${baseURL}ts=${time}&apikey=${publicKey}&hash=${hash}`)
      .then((response) => setSeries(response.data.data.results));
  }, []);

  return (
    <seriesContext.Provider value={{ series }}>
      {children}
    </seriesContext.Provider>
  );
}

export function useSeries() {
  const context = useContext(seriesContext);
  return context;
}
