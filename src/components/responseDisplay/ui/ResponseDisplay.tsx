import { OrderStatus } from "utils/consts/orderStatus";
import { OrderInfo } from "utils/types/orderInfo";
import success from "assets/success.svg";
import failed from "assets/failed.svg";
import style from "./style.module.scss";
import { useContext } from "react";
import { filmAndUserInfoContext } from "utils/context/filmAndUserInfo";

export const ResponseDisplay = (props: { filmName: string; setOrderStatus: (newOrderStatus: OrderStatus) => void }) => {
  const result: OrderInfo | { success: boolean } = JSON.parse(sessionStorage.getItem("result")!);
  const [filmAndUserInfo, setFilmAndUserInfo] = useContext(filmAndUserInfoContext)!;
  return (
    <div className={style.responseDisplay}>
      <button
        type="button"
        onClick={() => props.setOrderStatus(OrderStatus.choosingSession)}
        className={style.closeButton}
      >
        +
      </button>
      <h2 className={style.title}>{result.success ? "Оплата прошла успешно !" : "Оплата не прошла"}</h2>
      <img className={style.img} src={result.success ? success : failed} alt="" />
      {result.success ? (
        <div className={style.information}>
          <div className={style.ticket}>
            <span>код билета</span>
            <span>{result.order.orderNumber}</span>
          </div>
          <div className={style.property}>
            <span className={style.description}>Фильм: </span>
            <span className={style.value}>{props.filmName}</span>
          </div>
          <div className={style.property}>
            <span className={style.description}>Дата и время: </span>
            <span className={style.value}>{`${filmAndUserInfo.seance.date} ${filmAndUserInfo.seance.time}`}</span>
          </div>
          <div className={style.property}>
            <span className={style.description}>Места: </span>
            <div className={style.places}>
              {filmAndUserInfo.tickets.map((element) => (
                <span className={style.value}>
                  {element.row} ряд - {element.column}
                </span>
              ))}
            </div>
            <span className={style.value}></span>
          </div>
          <span className={style.warning}>вся информация была продублирована в SMS</span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
