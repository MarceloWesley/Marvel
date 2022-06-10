import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Loading } from "../../components/Loading";
import { useSearch } from "../../hooks/UseSearch";
import "./styles.scss";

export function SearchResults() {
  const {
    searchOption,
    searchCharacterValue,
    searchComicsValue,
    searchSeriesValue,
  } = useSearch();
  const navigate = useNavigate();
  function bioCharacter(id: number) {
    navigate(`/characterBio/${id}`, { replace: true });
  }
  function comicsInfo(id: number) {
    navigate(`/comics/comicInfo/${id}`, { replace: true });
  }

  function seriesInfo(id: number) {
    navigate(`/series/seriesInfo/${id}`, { replace: true });
  }
  console.log(searchCharacterValue);

  if (searchOption === "character") {
    if (searchCharacterValue.length === 0) {
      return (
        <>
          (
          <>
            <Header />
            <Loading />
          </>
          )
        </>
      );
    }

    return (
      <>
        (
        <>
          <Header />
          <ul className="list-search-result">
            {searchCharacterValue.map((char) => (
              <li key={char.id}>
                <img
                  onClick={() => bioCharacter(char.id)}
                  src={`${char.thumbnail.path}.${char.thumbnail.extension}`}
                  alt=""
                />
                <div>
                  <p className="name-character-list">{char.name}</p>
                  <p className="bio">{char.description}</p>
                </div>
              </li>
            ))}
          </ul>
          
          <Footer />
          <div className="spacer-2">

          </div>
        </>
        )
      </>
    );
  } else if (searchOption === "comics") {
    if (searchComicsValue.length === 0) {
      return (
        <>
          (
          <>
            <Header />
            <Loading />
          </>
          )
        </>
      );
    }

    return (
      <>
        (
        <>
          <Header />
          <ul className="list-search-result">
            {searchComicsValue.map((comic) => (
              <li key={comic.id}>
                <img
                  onClick={() => comicsInfo(comic.id)}
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt=""
                />
                <div>
                  <p className="name-character-list">{comic.title}</p>
                  <p className="bio">{comic.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="spacer">
            <p></p>
          </div>
          <Footer />
          <div className="spacer-2">

          </div>
        </>
        )
      </>
    );
  } else if (searchOption === "series") {
    if (searchSeriesValue.length === 0) {
      return (
        <>
          (
          <>
            <Header />
            <Loading />
          </>
          )
        </>
      );
    }

    return (
      <>
        (
        <>
          <Header />
          <ul className="list-search-result">
            {searchSeriesValue.map((serie) => (
              <li key={serie.id}>
                <img
                  onClick={() => seriesInfo(serie.id)}
                  src={`${serie.thumbnail.path}.${serie.thumbnail.extension}`}
                  alt=""
                />
                <div>
                  <p className="name-character-list">{serie.title}</p>
                  <p className="bio">{serie.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <Footer />
          <div className="spacer-2">

          </div>
        </>
        )
      </>
    );
  }
  return <></>;
}
