import { Link } from "react-router-dom";
import { Image } from "../../image/Image";
import logoImage from "./images/logo.png";
import "./style.scss";
export const Head = () => {
  return (
    <header className="head">
      <Image path={logoImage} width={20} height={3} />
      <Link color="white" to="/filmPage/2">
        To
      </Link>
      <div className="head__login">Логин</div>
    </header>
  );
};
