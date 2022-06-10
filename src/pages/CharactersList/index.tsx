import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Loading } from "../../components/Loading";
import { useCharacters } from "../../hooks/Usecharacters";
import "../CharactersList/styles.scss";

export function CharactersList() {
  const { characters } = useCharacters();

  const navigate = useNavigate();

  
  if (characters.length === 0) {
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
      <ul className="list-character">
        {characters.map((Chars) => (
          <li key={Chars.id}>
            <img
              onClick={() => navigate(`characterBio/${Chars.id}`)}
              src={`${Chars.thumbnail.path}.${Chars.thumbnail.extension}`}
              alt=""
            />
            <div>
              <p className="name-character-list">{Chars.name}</p>
              <p className="bio">{Chars.description}</p>
            </div>
          </li>
        ))}
      </ul>
      <Footer />
    </>
  );
}
