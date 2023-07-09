import { useEffect, useState } from "react";
import { ageRating } from "utils/ageRating";
import { ticketInfo } from "../types/ticketInfo";
import style from "./style.module.scss";

export const Ticket = (props: ticketInfo) => {
  const [price, setPrice] = useState(0);
  console.log(props.places);
  // useEffect(() => {
  //   props.places.forEach((element) => {
  //     setPrice(price + element.cost);
  //   });
  // }, [props.places]);
  return (
    <div className={style.ticket}>
      <div className={style.information}>
        <span className={style.value}>{props.hallName} зал</span>
        <div className={style.parametr}>
          <span className={style.description}>Фильм:</span>
          <span className={style.value}>
            {props.filmName} ({ageRating[props.ageRating]})
          </span>
        </div>
        <div className={style.parametr}>
          <span className={style.description}>Дата и время:</span>
          <span className={style.value}>{props.date}</span>
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
        <div className={style.price}>
          <span>Сумма: </span>
          <span>{price}</span>
        </div>
        <button className={style.butButton}>
          <span></span>
          <img src="" alt="" />
        </button>
      </div>
    </div>
  );
};
