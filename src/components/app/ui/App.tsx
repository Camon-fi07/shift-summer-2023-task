import { Routes, Route } from "react-router-dom";
import { Head } from "components/head";
import { MainPage } from "views/mainPage";
import { FilmPage } from "views/filmPage/ui/FilmPage";
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
