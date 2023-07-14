import { useContext, useEffect, useState } from "react";
import { OrderFormInfo } from "../types/orderFormInfo";
import { OrderStatus } from "utils/consts/orderStatus";
import { Link } from "react-router-dom";
import { FilmAndUserInfoContext } from "utils/context/filmAndUserInfo";
import { Field } from "components/field";
import { checkMiddleName, checkName, checkPhone, deleteBackSpace } from "utils/helpers/validate";
import style from "./style.module.scss";

export const OrderForm = (props: OrderFormInfo) => {
  const [filmAndUserInfo, setFilmAndUserInfo] = useContext(FilmAndUserInfoContext)!;
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [phone, setPhone] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    if (
      checkName(name) == "right" &&
      checkMiddleName(patronymic) == "right" &&
      checkPhone(phone) == "right" &&
      checkName(surname) == "right"
    )
      setIsFormValid(true);
    else setIsFormValid(false);

    setFilmAndUserInfo((prevValue) => {
      prevValue.person.firstname = name;
      prevValue.person.lastname = surname;
      prevValue.person.middlename = patronymic;
      prevValue.person.phone = phone;
      return prevValue;
    });
  }, [name, surname, patronymic, phone]);

  return (
    <form className={style.order_form} onSubmit={() => console.log()}>
      <button
        type="button"
        onClick={() => props.setOrderStatus(OrderStatus.choosingSession)}
        className={style.close_button}
      >
        +
      </button>
      <h2 className={style.title}>Введите ваши данные</h2>
      <Field name={"Имя*"} value={name} changeData={deleteBackSpace} setValue={setName} validate={checkName} />
      <Field
        name={"Фамилия*"}
        value={surname}
        changeData={deleteBackSpace}
        setValue={setSurname}
        validate={checkName}
      />
      <Field
        name={"Отчество"}
        value={patronymic}
        changeData={deleteBackSpace}
        setValue={setPatronymic}
        validate={checkMiddleName}
      />
      <Field name={"Телефон*"} value={phone} changeData={deleteBackSpace} setValue={setPhone} validate={checkPhone} />
      <Link
        className={`${!isFormValid ? style.not_available : ""} ${style.submit_button}`}
        to={`${isFormValid ? "/bank-page" : ""}`}
      >
        <span>Далее</span>
      </Link>
    </form>
  );
};
