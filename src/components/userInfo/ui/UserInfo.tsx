import { Field } from "components/field";
import style from "./style.module.scss";
import { UserData } from "../types/userData";
import { checkMiddleName, checkName, checkPhone } from "utils/helpers/validate";

export const UserInfo = (props: UserData) => {
  return (
    <form className={style.user_info}>
      <Field name={"Номер телефона*"} value={props.phone} setValue={props.setPhone} validate={checkPhone} />
      <Field name={"Имя"} value={props.name} setValue={props.setName} validate={checkName} />
      <Field name={"Фамилия"} value={props.lastname} setValue={props.setLastname} validate={checkName} />
      <Field name={"Отчество"} value={props.middlename} setValue={props.setMiddlename} validate={checkMiddleName} />
      <Field name={"Email"} value={props.email} setValue={props.setEmail} />
      <Field name={"Город"} value={props.city} setValue={props.setCity} validate={checkName} />
      <button className={style.refresh} type="button">
        <span>Обновить данные</span>
      </button>
    </form>
  );
};
