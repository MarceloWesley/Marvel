import axios from "axios";
import md5 from "md5";
import "./styles.scss";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { Loading } from "../../components/Loading";
import {
  charactersprops,
  privateKey,
  publicKey,
} from "../../hooks/Usecharacters";
import { Footer } from "../../components/Footer";

export const time = Number(new Date());
export const hash = md5(time + privateKey + publicKey);
const baseURL = "https://gateway.marvel.com:443/v1/public/characters/";

export function CharacterBio() {
  const [selectedCharacter, setSelectedCharacter] = useState<charactersprops[]>(
    []
  );

  const { charId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${baseURL}${charId}?ts=${time}&apikey=${publicKey}&hash=${hash}`)
      .then((response) => setSelectedCharacter(response.data.data.results));
  }, [charId]);

  console.log(selectedCharacter);

  if (selectedCharacter.length === 0) {
    return (
      <>
        <Header />
        <Loading />
      </>
    );
  }
  console.log(selectedCharacter[0].urls[1].url);
  return (
    <>
      <Header />
      <section>
        <div className="img-container">
          <img
            src={`${selectedCharacter[0].thumbnail.path}.${selectedCharacter[0].thumbnail.extension}`}
            alt=""
          />
        </div>

        <div className="bio-container">
          <div className="name-description">
            <div className="name">
              <span>Name</span>
              <p>{selectedCharacter[0].name}</p>
            </div>
            <div className="description">
              <span>Description</span>
              <p>
                {selectedCharacter[0].description
                  ? selectedCharacter[0].description
                  : "Descrição Não encontrada"}
              </p>
            </div>
          </div>

          <ul>
            <li>
              <a
                href=""
                onClick={() =>
                  navigate(`characterSingleSerie/${selectedCharacter[0].name}`)
                }
              >
                Series
              </a>
            </li>
            <li>
              <a
                onClick={() =>
                  navigate(`characterSingleComics/${selectedCharacter[0].name}`)
                }
                href=""
              >
                Comics
              </a>
            </li>
          </ul>

          <div className="links">
            <p>
              You can access the {" "}
              <a
                href={
                  selectedCharacter[0].urls.length === 3
                    ? selectedCharacter[0].urls[0].url
                    : selectedCharacter[0].urls[0].url
                }
                target="_blank"
                rel="noreferrer"
              >
                Biography
              </a>{" "}
              As well as the {" "}
              <a
                href={
                  selectedCharacter[0].urls.length === 3
                    ? selectedCharacter[0].urls[1].url
                    : selectedCharacter[0].urls[0].url
                }
                target="_blank"
                rel="noreferrer"
              >
                Wiki
              </a>{" "}
              and this{" "}
              <a
                href={
                  selectedCharacter[0].urls.length === 3
                    ? selectedCharacter[0].urls[2].url
                    : selectedCharacter[0].urls[1].url
                }
                target="_blank"
                rel="noreferrer"
              >
                character’s comic books
              </a>{" "}
           
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
