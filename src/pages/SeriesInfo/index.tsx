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

export function SeriesInfo() {
  const [selectedSeries, setSelectedSeries] = useState<seriesProps[]>([]);
  console.log(selectedSeries);
  const { seriesId } = useParams();

  useEffect(() => {
    axios
      .get(`${baseURL}${seriesId}?ts=${time}&apikey=${publicKey}&hash=${hash}`)
      .then((response) => setSelectedSeries(response.data.data.results));
  }, [seriesId]);

  if (selectedSeries.length === 0) {
    return (
      <>
        <Header />
        <Loading />
      </>
    );
  }

  const writersFilter = selectedSeries[0].creators.items.map(
    (creator, index) => {
      if (creator.role === "writer") {
        return creator.name;
      }
    }
  );

  const Writers = writersFilter.filter((element) => element !== undefined);

  const pencilerFilter = selectedSeries[0].creators.items.map((creator) => {
    if (creator.role === "penciller") {
      return creator.name;
    } else if (creator.role === "penciller (cover)") {
      return creator.name;
    }
  });
  const Penciler = pencilerFilter.filter((element) => element != undefined);
  console.log(Penciler);

  return (
    <>
      <Header />
      <section>
        <div className="img-container">
          <img
            src={`${selectedSeries[0].thumbnail.path}.${selectedSeries[0].thumbnail.extension}`}
            alt=""
          />
        </div>

        <div className="info-container">
          <h1>{selectedSeries[0].title}</h1>
          <div className="info1-series">
            <div>
              <span>Start Year</span>
              <p>{selectedSeries[0].startYear}</p>
            </div>

            <div>
              <span>End Year</span>
              <p>{selectedSeries[0].endYear}</p>
            </div>
          </div>
          <div className="info2-series">
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
            <span>description</span>
            <p>
              {selectedSeries[0].description === null
                ? "Description not found"
                : selectedSeries[0].description}
            </p>
          </div>

          <div className="links">
            <p>
            You can access the details of this{" "}
              <a
                href={selectedSeries[0].urls[0].url}
                target="_blank"
                rel="noreferrer"
              >
                serie
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
