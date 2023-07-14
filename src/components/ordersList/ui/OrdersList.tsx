import { Orders } from "utils/types/orders";
import style from "./style.module.scss";

export const OrdersList = (props: Orders) => {
  return (
    <ul className={style.orders_list}>
      {props.orders.map((element) => (
        <li className={style.order}>
          <div className={style.date}>
            <span>{element.tickets[0].seance.date}</span>
            <span>{element.tickets[0].seance.time}</span>
          </div>
          <h2 className={style.name}>{element.filmName}</h2>
          <div className={style.tickets}>
            {element.tickets.map((element) => (
              <span className={style.place}>
                {element.row} ряд - {element.column}
              </span>
            ))}
          </div>
          <div className={style.order_info}>
            <div className={style.status}>
              <span>{element.status}</span>
            </div>
            <span className={style.order_number}>
              Код билета: <span>{element.orderNumber}</span>
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};
