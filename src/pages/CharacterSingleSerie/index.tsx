import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Loading } from "../../components/Loading";
import { hash, publicKey, time } from "../../hooks/Usecharacters";
import { seriesProps } from "../../hooks/UseSeries";
import "./styles.scss";

const baseURL = `https://gateway.marvel.com:443/v1/public/characters/`;

export function CharacterSingleSerie() {
  const [selectedCharacterSeries, setSelectedCharacterSeries] = useState<
    seriesProps[]
  >([]);

  const { charId, charName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `${baseURL}${charId}/series?ts=${time}&apikey=${publicKey}&hash=${hash}`
      )
      .then((response) =>
        setSelectedCharacterSeries(response.data.data.results)
      );
  }, [charId]);

  console.log(selectedCharacterSeries);

  if (selectedCharacterSeries.length === 0) {
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
      <h1>Series que {charName} participou</h1>
      <ul className="list-single-serie">
        {selectedCharacterSeries.map((characterSerie) => (
          <li className="card-character-series" key={characterSerie.id}>
            <img
              onClick={() =>
                navigate(`CharactersingleSerieInfo/${characterSerie.id}`)
              }
              src={`${characterSerie.thumbnail.path}.${characterSerie.thumbnail.extension}`}
              alt=""
            />
            <div>
              <p className="name">{characterSerie.title}</p>
              <p className="bio">{characterSerie.description}</p>
            </div>
          </li>
        ))}
      </ul>

      <Footer />
    </>
  );
}
