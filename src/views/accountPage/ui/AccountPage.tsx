import { UserInfo } from "components/userInfo";
import { useContext, useEffect, useState } from "react";
import { useGetRequest } from "utils/hooks/useGetRequest";
import { Orders } from "utils/types/orders";
import { ordersUrl, session } from "utils/consts/pathToBack";
import { OrdersList } from "components/ordersList/ui/OrdersList";
import { Load } from "components/load";
import style from "./style.module.scss";
import { UserInfoContext } from "utils/context/UserInfo";
import { backendUserInfo } from "utils/types/user";

export const AccountPage = () => {
  const [userInfo, setUserInfo] = useContext(UserInfoContext)!;
  const headers = { Authorization: `Bearer ${userInfo.token}` };
  const [userBackendInfo, setUserBackendInfo] = useGetRequest<backendUserInfo>(session, "user", undefined, headers);
  const [orders, setOrders] = useGetRequest<Orders>(ordersUrl, undefined, undefined, headers);

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    if (userBackendInfo) {
      setUserInfo((prevValue) => {
        prevValue.user.phone = userBackendInfo.phone;
        return prevValue;
      });
      setPhone(userBackendInfo.phone);
    }
  }, [userBackendInfo]);
  useEffect(() => {
    console.log(orders);
  }, [orders]);
  return (
    <div className={style.account_page}>
      <h2 className={style.title}>Личный кабинет</h2>
      {userBackendInfo ? (
        <UserInfo
          phone={phone}
          setPhone={setPhone}
          name={name}
          setName={setName}
          lastname={lastname}
          setLastname={setLastname}
          middlename={middlename}
          setMiddlename={setMiddlename}
          email={email}
          setEmail={setEmail}
          city={city}
          setCity={setCity}
        />
      ) : (
        <Load />
      )}
      <svg className={style.line} xmlns="http://www.w3.org/2000/svg" fill="none">
        <path d="M1 0V579V592.5" />
      </svg>
      {orders ? <OrdersList {...orders} /> : <Load />}
    </div>
  );
};
