import { FilmPage } from "../../views/filmPage/ui/FilmPage";
import { MainPage } from "../../views/mainPage";
import { Head } from "../head";
import { Routes, Route } from "react-router-dom";
import "./styles/App.scss";

function App() {
  return (
    <div className="app">
      <Head />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/filmPage/:id" element={<FilmPage />} />
      </Routes>
    </div>
  );
}

export default App;
