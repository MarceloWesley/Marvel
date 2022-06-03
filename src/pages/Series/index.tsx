import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Loading } from "../../components/Loading";
import { useSeries } from "../../hooks/UseSeries";
import "./styles.scss";

export function Series() {
  const { series } = useSeries();
  console.log(series);
  const navigate = useNavigate();

  if (series.length === 0) {
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
      <ul className="list-series">
        {series.map((serie) => (
          <li className="card-series" key={serie.id}>
            <img
              onClick={() => navigate(`seriesInfo/${serie.id}`)}
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
    </>
  );
}
