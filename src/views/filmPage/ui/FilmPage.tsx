import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { film } from "utils/types/film";
import { FilmDescription } from "components/filmDescription";
import { TimeLine } from "components/timeLine";
import "./style.scss";
import { pathToFilm } from "utils/consts/pathToBack";

export const FilmPage = () => {
  const { id } = useParams();
  const [film, setFilm] = useState<film>(JSON.parse(sessionStorage.getItem(`film${id}`) || "{}"));
  useEffect(() => {
    axios
      .get(`${pathToFilm}/${id}`)
      .then((res) => {
        setFilm(res.data.film);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="film-page">
      <div className="content">
        {Object.entries(film).length == 0 ? (
          <p className="">WAIT</p>
        ) : (
          <FilmDescription
            name={film.name}
            directors={film.directors}
            genres={film.genres}
            releaseDate={film.releaseDate}
            description={film.description}
            userRatings={film.userRatings}
            img={film.img}
            ageRating={film.ageRating}
          />
        )}
        <TimeLine id={id!} name={film.name} ageRating={film.ageRating} />
      </div>
    </div>
  );
};
