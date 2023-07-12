import { useState } from "react";
import { FieldInfo } from "../types/fileldInfo";
import style from "./style.module.scss";
export const Field = (props: FieldInfo) => {
  const [validateResult, setValidateResult] = useState("right");
  return (
    <div className={style.field}>
      <h2 className={style.name}>{props.name}</h2>
      <input
        onChange={(event) => {
          let value = event.target.value;
          if (props.changeData) value = props.changeData(value);
          if (props.validate) setValidateResult(props.validate(value));
          props.setValue(value);
        }}
        value={props.value}
        className={`${validateResult !== "right" ? style.errorValue : ""} ${style.value}`}
      />
      <span className={`${validateResult !== "right" ? style.errorText : style.hidden}`}>{validateResult}</span>
    </div>
  );
};
