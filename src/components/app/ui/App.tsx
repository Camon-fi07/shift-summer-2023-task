import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Head } from "components/head";
import { MainPage } from "views/mainPage";
import { FilmPage } from "views/filmPage/ui/FilmPage";
import { BankPage } from "views/bankPage/ui/BankPage";
import { OrderInfoContext } from "utils/context/orderInfo";
import { OrderStatusContext } from "utils/context/orderStatus";
import { OrderStatus } from "utils/consts/orderStatus";
import { UserInfoContext } from "utils/context/UserInfo";
import { AuthPage } from "views/authPage/ui/AuthPage";
import { AccountPage } from "views/accountPage/ui/AccountPage";
import { Account } from "utils/types/user";
import { OrderInfo, OrderResult } from "utils/types/orderInfo";
import "./styles/App.scss";

function App() {
  const [orderStatus, setOrderStatus] = useState<OrderStatus>(OrderStatus.choosingSession);
  const [orderInfo, setOrderInfo] = useState<OrderInfo>({
    createCinemaPaymentDo: {
      filmId: "",
      person: {
        firstname: "",
        lastname: "",
        middlename: "",
        phone: "",
      },
      debitCard: {
        pan: "",
        expireDate: "",
        cvv: "",
      },
      seance: {
        date: "",
        time: "",
      },
      tickets: [],
    },
    result: {} as OrderResult,
  });
  const [account, setAccount] = useState<Account>({
    success: false,
    reason: "",
    user: {
      phone: "",
      firstname: "",
      middlename: "",
      lastname: "",
      email: "",
      city: "",
    },
    token: "",
  });
  return (
    <div className="app">
      <OrderStatusContext.Provider value={[orderStatus, setOrderStatus]}>
        <Head />
        <UserInfoContext.Provider value={[account, setAccount]}>
          <OrderInfoContext.Provider value={[orderInfo, setOrderInfo]}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/film-page/:id" element={<FilmPage />} />
              <Route path="/bank-page" element={<BankPage />} />
              <Route path="/auth-page" element={<AuthPage />} />
              <Route path="/account-page" element={<AccountPage />} />
            </Routes>
          </OrderInfoContext.Provider>
        </UserInfoContext.Provider>
      </OrderStatusContext.Provider>
    </div>
  );
}

export default App;
