import { useNavigate } from "react-router-dom";
import { CreateCinemaPaymentDo } from "utils/types/film";
import { postRequest } from "utils/helpers/postRequest";
import { pathToBack } from "utils/consts/pathToBack";
import { OrderStatus } from "utils/consts/orderStatus";
import { OrderInfo } from "utils/types/orderInfo";
import style from "./style.module.scss";
import ShiftBank from "assets/SHIFTcard.svg";
import { orderStatusContext } from "utils/context/orderStatus";
import { useContext, useEffect, useState } from "react";
import { filmAndUserInfoContext } from "utils/context/filmAndUserInfo";

export const BankPage = () => {
  const [filmAndUserInfo, setFilmAndUserInfo] = useContext(filmAndUserInfoContext)!;
  const [pan, setPan] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    setFilmAndUserInfo((prevValue) => {
      prevValue.debitCard.pan = pan;
      prevValue.debitCard.expireDate = expireDate;
      prevValue.debitCard.cvv = cvv;
      return prevValue;
    });
  }, [pan, expireDate, cvv]);

  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = useContext(orderStatusContext)!;
  return (
    <div className={style.bankPage}>
      <div className={style.container}>
        <h2 className={style.title}>Введите данные карты для оплаты</h2>
        <form className={style.card}>
          <div className={style.logo}>
            <img src={ShiftBank} alt="" />
          </div>
          <div className={style.cardData}>
            <div className={style.property}>
              <h2 className={style.name}>Номер*</h2>
              <input value={pan} onChange={(event) => setPan(event.target.value)} className={style.value} type="text" />
            </div>
            <div className={style.property}>
              <h2 className={style.name}>Срок*</h2>
              <input
                value={expireDate}
                onChange={(event) => setExpireDate(event.target.value)}
                className={style.value}
                type="text"
              />
            </div>
            <div className={style.property}>
              <h2 className={style.name}>CVV*</h2>
              <input value={cvv} onChange={(event) => setCvv(event.target.value)} className={style.value} type="text" />
            </div>
          </div>
        </form>
        <button
          type="button"
          onClick={() => {
            postRequest<CreateCinemaPaymentDo, OrderInfo>(`${pathToBack}/cinema/payment`, filmAndUserInfo)
              .then((res) => {
                console.log(res);
                sessionStorage.setItem("result", JSON.stringify(res));
                setOrderStatus(OrderStatus.responseDisplay);
                navigate(-1);
              })
              .catch((err) => {
                console.log(err, JSON.parse(JSON.stringify({ success: false })));
                sessionStorage.setItem("result", JSON.stringify({ success: false }));
                setOrderStatus(OrderStatus.responseDisplay);
                navigate(-1);
              });
          }}
          className={style.send}
        >
          <span>Оплатить</span>
        </button>
      </div>
    </div>
  );
};
