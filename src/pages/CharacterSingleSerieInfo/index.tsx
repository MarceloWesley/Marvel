import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Loading } from "../../components/Loading";
import { publicKey } from "../../hooks/UseComics";
import { seriesProps } from "../../hooks/UseSeries";
import { hash, time } from "../CharacterBio";
import "./styles.scss";

const baseURL = "https://gateway.marvel.com:443/v1/public/series/";

export function CharactersingleSerieInfo() {
  const [selectedCharacterSerieInfo, setSelectedCharacterSerieInfo] = useState<
    seriesProps[]
  >([]);
  const { serieId } = useParams();

  useEffect(() => {
    axios
      .get(`${baseURL}${serieId}?ts=${time}&apikey=${publicKey}&hash=${hash}`)
      .then((response) =>
        setSelectedCharacterSerieInfo(response.data.data.results)
      );
  }, [serieId]);


  if (selectedCharacterSerieInfo.length === 0) {
    return (
      <>
        <Header />
        <Loading />
      </>
    );
  }

  const writersFilter = selectedCharacterSerieInfo[0].creators.items.map(
    (creator, index) => {
      if (creator.role === "writer") {
        return creator.name;
      }
    }
  );

  const Writers = writersFilter.filter((element) => element !== undefined);
  const writerString = Writers.join(' - ')

  const pencilerFilter = selectedCharacterSerieInfo[0].creators.items.map(
    (creator) => {
      if (creator.role === "penciller") {
        return creator.name;
      } else if (creator.role === "penciller (cover)") {
        return creator.name;
      }
    }
  );
  const Penciler = pencilerFilter.filter((element) => element != undefined);
  const pencilerString = Penciler.join(' - ')

  return (
    <>
      <Header />
      <section>
        <div className="img-container">
          <img
            src={`${selectedCharacterSerieInfo[0].thumbnail.path}.${selectedCharacterSerieInfo[0].thumbnail.extension}`}
            alt=""
          />
        </div>

        <div className="info-container">
          <h1>{selectedCharacterSerieInfo[0].title}</h1>
          <div className="info1-character-single-serie">
            <div>
              <span>Start Year</span>
              <p>{selectedCharacterSerieInfo[0].startYear}</p>
            </div>

            <div>
              <span>End Year</span>
              <p>{selectedCharacterSerieInfo[0].endYear}</p>
            </div>
          </div>
          <div className="info2-character-single-serie">
            <div className="writer">
              <span>Writer</span>
              <p>{Writers.length === 0 ? "Not Found" : writerString}</p>
            </div>

            <div className="penciler">
              <span>Penciler</span>
              <p>{Penciler.length === 0 ? "Not Found" : pencilerString}</p>
            </div>

            <div className="cover-artist">
              <span>Cover Artist</span>
              <p>{Penciler.length === 0 ? "Not Found" : pencilerString}</p>
            </div>
          </div>

          <div className="description">
            <span>Description</span>
            <p>
              {selectedCharacterSerieInfo[0].description === "" ||
              selectedCharacterSerieInfo[0].description === null
                ? "Not Found"
                : selectedCharacterSerieInfo[0].description}
            </p>
          </div>
          
          <div className="links">
            <p>
              you can acess the {" "}
              <a
                href={selectedCharacterSerieInfo[0].urls[0].url}
                target="_blank"
                rel="noreferrer"
              >
               details 
              </a>{" "}
              of this serie
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
