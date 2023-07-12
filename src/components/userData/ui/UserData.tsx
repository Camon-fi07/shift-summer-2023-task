import { useContext, useEffect, useState } from "react";
import style from "./style.module.scss";
import { UserDataInfo } from "../types/userDataInfo";
import { OrderStatus } from "utils/consts/orderStatus";
import { Link } from "react-router-dom";
import { filmAndUserInfoContext } from "utils/context/filmAndUserInfo";

export const UserData = (props: UserDataInfo) => {
  const [filmAndUserInfo, setFilmAndUserInfo] = useContext(filmAndUserInfoContext)!;
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [phone, setPhone] = useState("");
  useEffect(() => {
    setFilmAndUserInfo((prevValue) => {
      prevValue.person.firstname = name;
      prevValue.person.lastname = surname;
      prevValue.person.middlename = patronymic;
      prevValue.person.phone = phone;
      return prevValue;
    });
  }, [name, surname, patronymic, phone]);

  return (
    <form className={style.userData} onSubmit={() => console.log()}>
      <button
        type="button"
        onClick={() => props.setOrderStatus(OrderStatus.choosingSession)}
        className={style.closeButton}
      >
        +
      </button>
      <h2 className={style.title}>Введите ваши данные</h2>
      <div className={style.property}>
        <h2 className={style.name}>Имя*</h2>
        <input
          value={name}
          onChange={(event) => setName(event.target.value.trim())}
          className={style.value}
          type="text"
        />
      </div>
      <div className={style.property}>
        <h2 className={style.name}>Фамилия*</h2>
        <input
          value={surname}
          onChange={(event) => setSurname(event.target.value.trim())}
          className={style.value}
          type="text"
        />
      </div>
      <div className={style.property}>
        <h2 className={style.name}>Отчество</h2>
        <input
          value={patronymic}
          onChange={(event) => setPatronymic(event.target.value.trim())}
          className={style.value}
          type="text"
        />
      </div>
      <div className={style.property}>
        <h2 className={style.name}>Телефон*</h2>
        <input
          value={phone}
          onChange={(event) => setPhone(event.target.value.trim())}
          className={style.value}
          type="tel"
        />
      </div>

      <Link className={style.submitButton} to={`/BankPage`}>
        <span>Далее</span>
      </Link>
    </form>
  );
};
