import { Image } from "../../image/Image";
import logoImage from "./logo.png";
import "./style.scss";
export const Head = () => {
  return (
    <header className="head">
      <Image path={logoImage} width={20} height={3} />
      <div className="head__login">Логин</div>
    </header>
  );
};
