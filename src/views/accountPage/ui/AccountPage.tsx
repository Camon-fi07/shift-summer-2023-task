import { UserInfo } from "components/userInfo";
import style from "./style.module.scss";
import { useState } from "react";
import { useGetRequest } from "utils/hooks/useGetRequest";
import { Orders } from "utils/types/orders";
import { ordersUrl } from "utils/consts/pathToBack";
import { OrdersList } from "components/ordersList/ui/OrdersList";
import { Load } from "components/load";

export const AccountPage = () => {
  const [data, setData] = useState({
    success: true,
    reason: "string",
    user: {
      phone: "89990009999",
      firstname: "firstname",
      middlename: "middlename",
      lastname: "lastname",
      email: "email@gmail.com",
      city: "city",
    },
  });
  const [orders, setOrders] = useGetRequest<Orders>(ordersUrl);
  return (
    <div className={style.account_page}>
      <h2 className={style.title}>Личный кабинет</h2>
      <UserInfo
        phone={data.user.phone}
        setPhone={(newValue) =>
          setData((prevValue) => {
            prevValue.user.phone = newValue;
            return prevValue;
          })
        }
        name={data.user.firstname}
        setName={(newValue) =>
          setData((prevValue) => {
            prevValue.user.firstname = newValue;
            return prevValue;
          })
        }
        lastname={data.user.lastname}
        setLastname={(newValue) =>
          setData((prevValue) => {
            prevValue.user.lastname = newValue;
            return prevValue;
          })
        }
        middlename={data.user.middlename}
        setMiddlename={(newValue) =>
          setData((prevValue) => {
            prevValue.user.middlename = newValue;
            return prevValue;
          })
        }
        email={data.user.email}
        setEmail={(newValue) =>
          setData((prevValue) => {
            prevValue.user.email = newValue;
            return prevValue;
          })
        }
        city={data.user.city}
        setCity={(newValue) =>
          setData((prevValue) => {
            prevValue.user.city = newValue;
            return prevValue;
          })
        }
      />
      <svg className={style.line} xmlns="http://www.w3.org/2000/svg" fill="none">
        <path d="M1 0V579V592.5" />
      </svg>
      {orders ? <OrdersList {...orders} /> : <Load />}
    </div>
  );
};
