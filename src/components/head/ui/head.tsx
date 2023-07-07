import { Link } from "react-router-dom";
import logoImage from "./images/logo.png";
import "./style.scss";
export const Head = () => {
  return (
    <header className="head">
      <div className="head__img">
        <img src={logoImage} alt="" />
      </div>
      <div className="head__login">
        <Link to="/">Войти</Link>
      </div>
    </header>
  );
};
