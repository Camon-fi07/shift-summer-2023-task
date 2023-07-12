import { Routes, Route } from "react-router-dom";
import { Head } from "components/head";
import { MainPage } from "views/mainPage";
import { FilmPage } from "views/filmPage/ui/FilmPage";
import "./styles/App.scss";
import { BankPage } from "views/bankPage/ui/BankPage";
import { orderStatusContext } from "utils/context/orderStatus";
import { OrderStatus } from "utils/consts/orderStatus";
import { useState } from "react";
import { filmAndUserInfoContext } from "utils/context/filmAndUserInfo";
import { CreateCinemaPaymentDo } from "utils/types/film";

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
      <Head />
      <orderStatusContext.Provider value={[orderStatus, setOrderStatus]}>
        <filmAndUserInfoContext.Provider value={[filmAndUserInfo, setFilmAndUserInfo]}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/filmPage/:id" element={<FilmPage />} />
            <Route path="/BankPage" element={<BankPage />} />
          </Routes>
        </filmAndUserInfoContext.Provider>
      </orderStatusContext.Provider>
    </div>
  );
}

export default App;
