import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Loading } from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import { useComics } from "../../hooks/UseComics";
import "./styles.scss";

export function Comics() {
  const { comics } = useComics();
  console.log(comics);
  const navigate = useNavigate();

  if (comics.length === 0) {
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
      <ul className="list-comics">
        {comics.map((comic) => (
          <li className="card-comics" key={comic.id}>
            <img
              onClick={() => navigate(`comicInfo/${comic.id}`)}
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt=""
            />
            <div>
              <p className="name">{comic.title}</p>
              <p className="bio">{comic.description}</p>
            </div>
          </li>
        ))}
      </ul>

      <Footer />
    </>
  );
}
