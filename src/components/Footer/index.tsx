import "./styles.scss";
import { InstagramLogo } from "phosphor-react";
import { FacebookLogo } from "phosphor-react";
import { TwitterLogo } from "phosphor-react";
import { useNavigate } from "react-router-dom";

export function Footer() {
  const navigate = useNavigate()
  return (
    <footer>
      <div className="footer-container">
        <a href="#Header">
          <div className="logo" onClick={() => navigate('/')}>
            <strong className="marvel">MARVEL</strong>
            <strong className="studio">STUDIOS</strong>
            <p>Data provided by <a href="https://developer.marvel.com/">Marvel</a>. © 2014 Marvel</p>
          </div>
        </a>

        <div className="marvel-social-medias">
          <span>Marvel Social Medias</span>
          <ul>
            <li><a href="https://www.instagram.com/marvel/" target={"_blank"} rel="noreferrer" ><InstagramLogo size={35}/></a></li>
            <li><a href="https://twitter.com/MarvelBR" target={"_blank"} rel="noreferrer"><TwitterLogo size={35}/></a></li>
            <li><a href="https://www.facebook.com/MarvelBR" target={"_blank"} rel="noreferrer"><FacebookLogo size={35}/></a></li>
          </ul>
        </div>

        <div className="dev-social-medias">
          <span>Dev Social Medias</span>
          <ul>
            <li><a href="https://www.instagram.com/marcelo_olyscott/" target={"_blank"} rel="noreferrer"><InstagramLogo size={35}/></a></li>
            <li><a href="https://twitter.com/MarceloOliscott" target={"_blank"} rel="noreferrer"><TwitterLogo size={35}/></a></li>
            <li><a href="https://www.facebook.com/profile.php?id=100004307259256" target={"_blank"} rel="noreferrer"><FacebookLogo size={35}/></a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
