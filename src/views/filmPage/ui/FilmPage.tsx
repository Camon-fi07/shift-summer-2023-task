import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FilmDescription } from "../../../components/filmDescription/ui/FilmDescription";
import { IFilm } from "../../../utils/types/filmType";
import "./style.scss";
export const FilmPage = () => {
  const { id } = useParams();
  const [film, setFilm] = useState<IFilm>(
    JSON.parse(sessionStorage.getItem(`film${id}`) || "{}")
  );
  useEffect(() => {
    axios
      .get(`https://shift-backend.onrender.com/cinema/film/${id}`)
      .then((res) => {
        setFilm(res.data.film);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="film-page">
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
      <div></div>
    </div>
  );
};
