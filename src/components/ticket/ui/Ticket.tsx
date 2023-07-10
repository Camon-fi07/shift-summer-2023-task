import { useEffect, useState } from "react";
import { ageRating } from "utils/consts/ageRating";
import { TicketInfo } from "../types/ticketInfo";
import ticketIcon from "assets/ticket.svg";
import style from "./style.module.scss";
import { getSeanseInfo } from "utils/helpers/changeDate";

export const Ticket = (props: TicketInfo) => {
  const [price, setPrice] = useState(0);
  useEffect(() => {
    setPrice(0);
    props.places.forEach((element) => {
      setPrice(price + element.cost);
    });
  }, [props.places]);
  return (
    <div className={style.ticket}>
      <div className={style.information}>
        <span className={style.title}>{props.hallName} зал</span>
        <div className={style.parametr}>
          <span className={style.description}>Фильм:</span>
          <span className={style.value}>
            {props.filmName} ({ageRating[props.ageRating]})
          </span>
        </div>
        <div className={style.parametr}>
          <span className={style.description}>Дата и время:</span>
          <span className={style.value}>
            {getSeanseInfo(props.date)} {props.time}
          </span>
        </div>
        <div className={style.parametr}>
          <span className={style.description}>Места:</span>
          <div className={style.places}>
            {props.places.map((element) => (
              <span className={style.value}>
                {element.row} ряд - {element.place}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className={style.purchase}>
        <div className={`${style.parametr}`}>
          <span>Сумма: </span>
          <span>{price} руб</span>
        </div>
        <button className={style.buyButton}>
          <span>Купить</span>
          <img src={ticketIcon} alt="" />
        </button>
      </div>
    </div>
  );
};
