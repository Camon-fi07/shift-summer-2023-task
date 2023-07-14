import { Link } from "react-router-dom";
import logoImage from "assets/logo.png";
import style from "./style.module.scss";
import { useContext } from "react";
import { OrderStatusContext } from "utils/context/orderStatus";
import { OrderStatus } from "utils/consts/orderStatus";
export const Head = () => {
  const [orderStatusNow, setOrderStatusNow] = useContext(OrderStatusContext)!;
  return (
    <header className={style.head}>
      <Link onClick={() => setOrderStatusNow(OrderStatus.choosingSession)} className={style.logo} to="/">
        <img src={logoImage} alt="" />
      </Link>
      <Link className={style.login} to="/auth-page">
        Войти
      </Link>
    </header>
  );
};
