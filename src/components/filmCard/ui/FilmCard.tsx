import { Link } from "react-router-dom";
import { FilmInformation } from "../types/filmInformation";
import style from "./style.module.scss";
import { pathToBack } from "utils/consts/pathToBack";
import { ageRating } from "utils/consts/ageRating";

export const FilmCard = (props: FilmInformation) => {
  return (
    <div className={style.filmCard}>
      <Link to={`/filmPage/${props.id}`}>
        <div className={style.img}>
          <div className={style.ageRating}>
            <span>{ageRating[props.ageRating]}</span>
          </div>
          <img src={`${pathToBack}${props.img}`} alt="" />
        </div>
      </Link>
      <div className={style.description}>
        <h2 className={style.title}>{props.name}</h2>
        <div className={style.genres}>
          {props.genres.map((element, index) =>
            index != props.genres.length - 1 ? <span>{element},</span> : <span>{element}</span>,
          )}
        </div>
        <div className={style.score}>
          <span>Kinopoisk - {props.userRatings.kinopoisk}</span>
          <span>imdb - {props.userRatings.imdb}</span>
        </div>
      </div>
    </div>
  );
};
