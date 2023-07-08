import { useState, useEffect } from "react";
import { FilmCard } from "components/filmCard";
import { film } from "utils/types/film";
import axios from "axios";
import { pathToBack } from "utils/consts/pathToBack";
import "./style.scss";

export const MainPage = () => {
  const [films, setFilms] = useState<film[]>(JSON.parse(sessionStorage.getItem("films") || "[]"));
  useEffect(() => {
    axios
      .get(`${pathToBack}/cinema/today/`)
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
