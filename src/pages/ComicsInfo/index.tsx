import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Loading } from "../../components/Loading";
import { comicsProps, publicKey } from "../../hooks/UseComics";
import { hash, time } from "../CharacterBio";
import "./styles.scss";

const baseURL = "https://gateway.marvel.com:443/v1/public/comics/";

export function ComicInfo() {
  const [selectedComic, setSelectedComic] = useState<comicsProps[]>([]);

  const { comicId } = useParams();

  useEffect(() => {
    axios
      .get(`${baseURL}${comicId}?ts=${time}&apikey=${publicKey}&hash=${hash}`)
      .then((response) => setSelectedComic(response.data.data.results));
  }, [comicId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDay();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const sep = "/";
    return [day, month, year].join(sep);
  };

  if (selectedComic.length === 0) {
    return (
      <>
        <Header />
        <Loading />
      </>
    );
  }

  console.log(selectedComic[0].creators.items);
  const writersFilter = selectedComic[0].creators.items.map(
    (creator, index) => {
      if (creator.role === "writer") {
        return creator.name;
      }
    }
  );

  const Writers = writersFilter.filter((element) => element !== undefined);

  const pencilerFilter = selectedComic[0].creators.items.map((creator) => {
    if (creator.role === "penciller (cover)") {
      return creator.name;
    }
  });
  const Penciler = pencilerFilter.filter((element) => element != undefined);

  const Data = formatDate(selectedComic[0].dates[0]?.date);
  return (
    <>
      <Header />
      <section>
        <div className="img-container">
          <img
            src={`${selectedComic[0].thumbnail.path}.${selectedComic[0].thumbnail.extension}`}
            alt=""
          />
        </div>

        <div className="info-container">
          <h1>{selectedComic[0].title}</h1>
          <div className="info1">
            <span>Published</span>
            <p>{Data}</p>
          </div>
          <div className="info2">
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
              {selectedComic[0].description === ""
                ? "Not Found"
                : selectedComic[0].description}
            </p>
          </div>

          <div className="links">
            <p>
            You can access {" "}
              <a
                href={selectedComic[0].urls[0].url}
                target="_blank"
                rel="noreferrer"
              >
                details
              </a>{" "}
               of this comic or the{" "}
              <a
                href={
                  selectedComic[0].urls.length === 2
                    ? selectedComic[0].urls[1].url
                    : selectedComic[0].urls[0].url
                }
                target="_blank"
                rel="noreferrer"
              >
                purchase
              </a>
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
