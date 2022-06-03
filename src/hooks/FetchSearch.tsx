import axios from "axios";
import { hash, publicKey, time } from "./Usecharacters";

const charURL =
  "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=";

const comicsURL =
  "https://gateway.marvel.com:443/v1/public/comics?titleStartsWith=";

const seriesURL =
  "https://gateway.marvel.com:443/v1/public/series?titleStartsWith=";

export const FetchSearch = () => {
  const getCharacter = async (name: string) => {
    const { data } = await axios.get(
      `${charURL}${name}&ts=${time}&apikey=${publicKey}&hash=${hash}`
    );

    return data;
  };

  const getComics = async (name: string) => {
    const { data } = await axios.get(
      `${comicsURL}${name}&ts=${time}&apikey=${publicKey}&hash=${hash}`
    );

    return data;
  };

  const getSeries = async (name: string) => {
    const { data } = await axios.get(
      `${seriesURL}${name}&ts=${time}&apikey=${publicKey}&hash=${hash}`
    );

    return data;
  };

  return { getCharacter, getComics, getSeries };
};
