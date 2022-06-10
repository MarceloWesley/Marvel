import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Loading } from "../../components/Loading";
import { comicsProps, publicKey } from "../../hooks/UseComics";
import { hash, time } from "../CharacterBio";
import "./styles.scss";

const baseURL = `https://gateway.marvel.com:443/v1/public/characters/`;

export function CharacterSingleComics() {
  const [selectedCharacterComics, setSelectedCharacterComics] = useState<
    comicsProps[]
  >([]);

  const { charId, charName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `${baseURL}${charId}/comics?ts=${time}&apikey=${publicKey}&hash=${hash}`
      )
      .then((response) =>
        setSelectedCharacterComics(response.data.data.results)
      );
  }, [charId]);

  console.log(selectedCharacterComics);

  if (selectedCharacterComics.length === 0) {
    return (
      <>
        <Header />
        <Loading />
      </>
    );
  }

  return (
    <>
      <Header />
      <h1 className="title-comic">Comics que {charName} participou</h1>
      <ul className="list-single-comic">
        {selectedCharacterComics.map((characterComics) => (
          <li className="card-character-comics" key={characterComics.id}>
            <img
              onClick={() =>
                navigate(`characterSingleComicsInfo/${characterComics.id}`)
              }
              src={`${characterComics.thumbnail.path}.${characterComics.thumbnail.extension}`}
              alt=""
            />
            <div>
              <p className="name">{characterComics.title}</p>
              <p className="bio">{characterComics.description}</p>
            </div>
          </li>
        ))}
      </ul>

      <Footer />
    </>
  );
}
