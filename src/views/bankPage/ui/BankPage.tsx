import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "utils/helpers/postRequest";
import { pathToBack } from "utils/consts/pathToBack";
import { OrderStatus } from "utils/consts/orderStatus";
import { CreateCinemaPaymentDo, OrderInfo, OrderResult } from "utils/types/orderInfo";
import { OrderStatusContext } from "utils/context/orderStatus";
import { Field } from "components/field";
import { OrderInfoContext } from "utils/context/orderInfo";
import { checkCvv, checkExpireDate, checkPan, getCurrentExpireDate, getCurrentPan } from "utils/helpers/validate";
import style from "./style.module.scss";
import ShiftBank from "assets/SHIFTcard.svg";

export const BankPage = () => {
  const [orderInfo, setOrderInfo] = useContext(OrderInfoContext)!;
  const [pan, setPan] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = useContext(OrderStatusContext)!;

  useEffect(() => {
    if (checkPan(pan) == "right" && checkExpireDate(expireDate) == "right" && checkCvv(cvv) == "right")
      setIsFormValid(true);
    else setIsFormValid(false);
    setOrderInfo((prevValue) => {
      prevValue.createCinemaPaymentDo.debitCard.pan = pan;
      prevValue.createCinemaPaymentDo.debitCard.expireDate = expireDate;
      prevValue.createCinemaPaymentDo.debitCard.cvv = cvv;
      return prevValue;
    });
  }, [pan, expireDate, cvv]);

  return (
    <div className={style.bank_page}>
      <div className={style.container}>
        <h2 className={style.title}>Введите данные карты для оплаты</h2>
        <div className={style.card}>
          <div className={style.logo}>
            <img src={ShiftBank} alt="" />
          </div>
          <div className={style.card_data}>
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
              postRequest<CreateCinemaPaymentDo, OrderResult>(
                `${pathToBack}/cinema/payment`,
                orderInfo.createCinemaPaymentDo,
              )
                .then((res) => {
                  setOrderInfo({ createCinemaPaymentDo: orderInfo.createCinemaPaymentDo, result: res });
                })
                .catch((err) => {
                  let res = {} as OrderResult;
                  res.success = false;
                  setOrderInfo({ createCinemaPaymentDo: orderInfo.createCinemaPaymentDo, result: res });
                })
                .finally(() => {
                  setOrderStatus(OrderStatus.responseDisplay);
                  navigate(-1);
                });
            }
          }}
          className={`${!isFormValid ? style.not_available : ""} ${style.send}`}
        >
          <span>Оплатить</span>
        </button>
      </div>
    </div>
  );
};
