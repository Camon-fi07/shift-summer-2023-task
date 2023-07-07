import { useState, useEffect } from "react";
import "./style.scss";
import { FilmCard } from "../../../components/filmCard";
import { IFilm } from "../../../utils/types/filmType";
import axios from "axios";

export const MainPage = () => {
  const [films, setFilms] = useState<IFilm[]>(
    JSON.parse(sessionStorage.getItem("films") || "[]")
  );
  useEffect(() => {
    axios
      .get("https://shift-backend.onrender.com/cinema/today/")
      .then((res) => {
        setFilms(res.data.films);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="main">
      <div className="content">
        <div className="films-list">
          {films.map((element) => (
            <FilmCard
              id={element.id}
              name={element.name}
              originalName={element.originalName}
              releaseDate={element.releaseDate}
              ageRating={element.ageRating}
              userRatings={element.userRatings}
              img={element.img}
              genres={element.genres}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
