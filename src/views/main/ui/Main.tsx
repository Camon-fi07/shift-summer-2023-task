import { useState, useEffect } from "react";
import { Head } from "../../../components/head";
import "./style.scss";
import { getFilms } from "../helpers/films";
import { FilmCard } from "../../../components/filmCard";
import { IFilm } from "../types/filmType";

export const Main = () => {
  const [films, setFilms] = useState<IFilm[]>(
    JSON.parse(sessionStorage.getItem("films") || "[]")
  );
  useEffect(() => {
    getFilms();
    setFilms(JSON.parse(sessionStorage.getItem("films") || ""));
  }, []);

  return (
    <div className="main">
      <Head />
      <div className="content">
        <div className="films-list">
          {films.map((element) => (
            <FilmCard
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
