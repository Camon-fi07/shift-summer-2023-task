import { Link } from "react-router-dom";
import logoImage from "assets/logo.png";
import style from "./style.module.scss";
export const Head = () => {
  return (
    <header className={style.head}>
      <div className={style.img}>
        <img src={logoImage} alt='' />
      </div>
      <div className={style.login}>
        <Link to='/'>Войти</Link>
      </div>
    </header>
  );
};
