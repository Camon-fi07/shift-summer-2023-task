import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateCinemaPaymentDo } from "utils/types/film";
import { postRequest } from "utils/helpers/postRequest";
import { pathToBack } from "utils/consts/pathToBack";
import { OrderStatus } from "utils/consts/orderStatus";
import { OrderInfo } from "utils/types/orderInfo";
import { orderStatusContext } from "utils/context/orderStatus";
import { filmAndUserInfoContext } from "utils/context/filmAndUserInfo";
import { Field } from "components/field/ui/Field";
import { checkCvv, checkExpireDate, checkPan, getCurrentExpireDate, getCurrentPan } from "utils/helpers/validate";
import style from "./style.module.scss";
import ShiftBank from "assets/SHIFTcard.svg";

export const BankPage = () => {
  const [filmAndUserInfo, setFilmAndUserInfo] = useContext(filmAndUserInfoContext)!;
  const [pan, setPan] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = useContext(orderStatusContext)!;
  useEffect(() => {
    if (checkPan(pan) == "right" && checkExpireDate(expireDate) == "right" && checkCvv(cvv) == "right")
      setIsFormValid(true);
    else setIsFormValid(false);
    setFilmAndUserInfo((prevValue) => {
      prevValue.debitCard.pan = pan;
      prevValue.debitCard.expireDate = expireDate;
      prevValue.debitCard.cvv = cvv;
      return prevValue;
    });
  }, [pan, expireDate, cvv]);

  return (
    <div className={style.bankPage}>
      <div className={style.container}>
        <h2 className={style.title}>Введите данные карты для оплаты</h2>
        <div className={style.card}>
          <div className={style.logo}>
            <img src={ShiftBank} alt="" />
          </div>
          <div className={style.cardData}>
            <Field name="Номер*" value={pan} changeData={getCurrentPan} setValue={setPan} validate={checkPan} />
            <Field
              name="Срок*"
              value={expireDate}
              changeData={getCurrentExpireDate}
              setValue={setExpireDate}
              validate={checkExpireDate}
            />
            <Field name="CVV*" value={cvv} setValue={setCvv} validate={checkCvv} />
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            if (isFormValid) {
              postRequest<CreateCinemaPaymentDo, OrderInfo>(`${pathToBack}/cinema/payment`, filmAndUserInfo)
                .then((res) => {
                  sessionStorage.setItem("result", JSON.stringify(res));
                  setOrderStatus(OrderStatus.responseDisplay);
                  navigate(-1);
                })
                .catch((err) => {
                  let result = {} as OrderInfo;
                  result.success = false;
                  sessionStorage.setItem("result", JSON.stringify(result));
                  setOrderStatus(OrderStatus.responseDisplay);
                  navigate(-1);
                });
            }
          }}
          className={`${!isFormValid ? style.notAvailable : ""} ${style.send}`}
        >
          <span>Оплатить</span>
        </button>
      </div>
    </div>
  );
};
