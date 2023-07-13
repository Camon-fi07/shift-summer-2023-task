import { useEffect, useState } from "react";
import style from "./style.module.scss";
import { Field } from "components/field/ui/Field";
import { checkPhone } from "utils/helpers/validate";
import { postRequest } from "utils/helpers/postRequest";
import { auth, otpCode } from "utils/consts/pathToBack";
import { OtpCode } from "utils/types/otpCode";
import { Account } from "utils/types/account";
export const AuthPage = () => {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [isPhoneSent, setIsPhoneSent] = useState(false);
  const [codeFromBack, setCodeFromBack] = useState({} as OtpCode);
  useEffect(() => {}, [isPhoneSent]);
  return (
    <div className={style.authPage}>
      <form className={style.form}>
        <h2 className={style.title}>Авторизация</h2>
        <Field name={"Номер телефона*"} value={phone} setValue={setPhone} validate={checkPhone} />
        {isPhoneSent ? <Field name={"Код из СМС"} value={code} setValue={setCode} /> : ""}
        <button
          type="button"
          className={style.formButton}
          onClick={() => {
            if (isPhoneSent) {
              if (code === codeFromBack.reason) {
                console.log("yes");
              } else console.log("no");
              setIsPhoneSent(true);
            } else {
              postRequest<{ phone: string }, OtpCode>(`${otpCode}`, { phone: phone })
                .then((res) => {
                  setCodeFromBack(res);
                })
                .catch((err) => {
                  setCodeFromBack((prevValue) => {
                    prevValue.success = false;
                    return prevValue;
                  });
                });
              setIsPhoneSent(true);
            }
          }}
        >
          <span>Продолжить</span>
        </button>
      </form>
    </div>
  );
};
