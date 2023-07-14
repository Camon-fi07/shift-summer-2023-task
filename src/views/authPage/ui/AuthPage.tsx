import { useEffect, useState } from "react";
import style from "./style.module.scss";
import { Field } from "components/field";
import { checkPhone } from "utils/helpers/validate";
import { OtpCode } from "utils/types/otpCode";
import { postRequest } from "utils/helpers/postRequest";
import { auth, createOtpCode, pathToBack, session } from "utils/consts/pathToBack";
import { Account } from "utils/types/account";
import { AuthResponse } from "../types/authResponse";
import axios from "axios";
import Cookies from "universal-cookie";

export const AuthPage = () => {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [otpInfo, setOtpInfo] = useState<OtpCode>();
  const [isPhoneSent, setIsPhoneSent] = useState(false);
  const [authInfo, setAuthInfo] = useState<AuthResponse | undefined>();
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
                  if (res.success) {
                    const headers = { Authorization: `Bearer ${res.token}` };
                    axios
                      .get(`${session}`, { headers })
                      .then((res2) => {
                        const cookies = new Cookies();
                        const data = cookies.get(`Bearer ${res.token}`);
                        console.log(res2, res2.headers);
                        console.log(data);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }
                  console.log(res);
                  setAuthInfo(res);
                })
                .catch((err) => {
                  console.log(err);
                  setAuthInfo({ success: false, reason: err.response.data.reason });
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
        {authInfo ? (
          <span className={`${authInfo.success ? style.success : style.error} ${style.auth_info}`}>
            {authInfo.success ? "Регистрация прошла успешно" : authInfo.reason}
          </span>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};
