import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Head } from "components/head";
import { MainPage } from "views/mainPage";
import { FilmPage } from "views/filmPage/ui/FilmPage";
import { BankPage } from "views/bankPage/ui/BankPage";
import { OrderStatusContext } from "utils/context/orderStatus";
import { OrderStatus } from "utils/consts/orderStatus";
import { FilmAndUserInfoContext } from "utils/context/filmAndUserInfo";
import { CreateCinemaPaymentDo } from "utils/types/film";
import "./styles/App.scss";
import { AuthPage } from "views/authPage/ui/AuthPage";

function App() {
  const [orderStatus, setOrderStatus] = useState(OrderStatus.choosingSession);
  const [filmAndUserInfo, setFilmAndUserInfo] = useState<CreateCinemaPaymentDo>({
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
  });
  return (
    <div className="app">
      <OrderStatusContext.Provider value={[orderStatus, setOrderStatus]}>
        <Head />
        <FilmAndUserInfoContext.Provider value={[filmAndUserInfo, setFilmAndUserInfo]}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/film-page/:id" element={<FilmPage />} />
            <Route path="/bank-page" element={<BankPage />} />
            <Route path="/auth-page" element={<AuthPage />} />
          </Routes>
        </FilmAndUserInfoContext.Provider>
      </OrderStatusContext.Provider>
    </div>
  );
}

export default App;
