import { useEffect, useState } from "react";
import style from "./style.module.scss";
import { Field } from "components/field";
import { checkPhone } from "utils/helpers/validate";
import { OtpCode } from "utils/types/otpCode";
import { postRequest } from "utils/helpers/postRequest";
import { auth, createOtpCode } from "utils/consts/pathToBack";
import { Account } from "utils/types/account";

export const AuthPage = () => {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [otpInfo, setOtpInfo] = useState<OtpCode>();
  const [isPhoneSent, setIsPhoneSent] = useState(false);
  useEffect(() => {}, [isPhoneSent]);
  return (
    <div className={style.auth_page}>
      <form className={style.form}>
        <h2 className={style.title}>Авторизация</h2>
        <Field name={"Номер телефона*"} value={phone} setValue={setPhone} validate={checkPhone} />
        {isPhoneSent ? <Field name={"Код из СМС"} value={code} setValue={setCode} /> : ""}
        <button
          type="button"
          className={style.form_button}
          onClick={() => {
            if (isPhoneSent) {
              postRequest<{ phone: string; code: number }, Account>(auth, { phone: phone, code: Number(code) })
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              postRequest<{ phone: string }, OtpCode>(createOtpCode, { phone: phone })
                .then((res) => {
                  setOtpInfo(res);
                  setIsPhoneSent(true);
                })
                .catch((err) => {
                  setOtpInfo({ success: false } as OtpCode);
                });
            }
          }}
        >
          <span>Продолжить</span>
        </button>
      </form>
    </div>
  );
};
