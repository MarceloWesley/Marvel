import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Loading } from "../../components/Loading";
import { comicsProps, publicKey, hash, time } from "../../hooks/UseComics";
import "./styles.scss";

const baseURL = "https://gateway.marvel.com:443/v1/public/comics/";

export function CharacterSingleComicsInfo() {
  const [selectedCharacterComicsInfo, setSelectedCharacterComicsInfo] =
    useState<comicsProps[]>([]);
  const { comicsId } = useParams();

  useEffect(() => {
    axios
      .get(`${baseURL}${comicsId}?ts=${time}&apikey=${publicKey}&hash=${hash}`)
      .then((response) =>
        setSelectedCharacterComicsInfo(response.data.data.results)
      );
  }, [comicsId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDay();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const sep = "/";
    return [day, month, year].join(sep);
  };

  console.log(selectedCharacterComicsInfo);

  if (selectedCharacterComicsInfo.length === 0) {
    return (
      <>
        <Header />
        <Loading />
      </>
    );
  }

  const writersFilter = selectedCharacterComicsInfo[0].creators.items.map(
    (creator, index) => {
      if (creator.role === "writer") {
        return creator.name;
      }
    }
  );

  const Writers = writersFilter.filter((element) => element !== undefined);

  const pencilerFilter = selectedCharacterComicsInfo[0].creators.items.map(
    (creator) => {
      if (creator.role === "penciller") {
        return creator.name;
      } else if (creator.role === "penciller (cover)") {
        return creator.name;
      }
    }
  );
  const Penciler = pencilerFilter.filter((element) => element != undefined);
  console.log(Writers);

  const Data = formatDate(selectedCharacterComicsInfo[0].dates[0]?.date);

  return (
    <>
      <Header />
      <section>
        <div className="img-container">
          <img
            src={`${selectedCharacterComicsInfo[0].thumbnail.path}.${selectedCharacterComicsInfo[0].thumbnail.extension}`}
            alt=""
          />
        </div>

        <div className="info-container">
          <h1>{selectedCharacterComicsInfo[0].title}</h1>
          <div className="info1-character-single-comics">
            <div>
              <span>Published</span>
              <p>{Data}</p>
            </div>
          </div>
          <div className="info2-character-single-comics">
            <div className="writer">
              <span>Writer</span>
              <p>{Writers.length === 0 ? "Not Found" : Writers}</p>
            </div>

            <div className="penciler">
              <span>Penciler</span>
              <p>{Penciler.length === 0 ? "Not Found" : Penciler}</p>
            </div>

            <div className="cover-artist">
              <span>Cover Artist</span>
              <p>{Penciler.length === 0 ? "Not Found" : Penciler}</p>
            </div>
          </div>

          <div className="description">
            <span>Description</span>
            <p>
              {selectedCharacterComicsInfo[0].description === "" ||
              selectedCharacterComicsInfo[0].description === null
                ? "Not Found"
                : selectedCharacterComicsInfo[0].description}
            </p>
          </div>

          <div className="links">
            <p>
              Acesse os{" "}
              <a
                href={selectedCharacterComicsInfo[0].urls[0].url}
                target="_blank"
                rel="noreferrer"
              >
                detalhes
              </a>{" "}
              dessa Comic
            </p>
          </div>
        </div>
      </section>
      <div className="spacer">
        <p></p>
      </div>
      <Footer />
    </>
  );
}
