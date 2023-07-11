import { ageRating } from "utils/consts/ageRating";
import { DescriptionOfFilm } from "../types/descriptionType";
import { pathToBack } from "utils/consts/pathToBack";
import style from "./style.module.scss";

export const FilmDescription = (props: DescriptionOfFilm) => {
  return (
    <div className={style.filmDescription}>
      <div className={style.img}>
        <img className={style.img} src={`${pathToBack}${props.img}`} alt="" />
      </div>
      <h2 className={style.title}>
        {props.name} ({ageRating[props.ageRating]})
      </h2>
      <div className={style.directors}>
        Режиссёр:
        {props.directors.map((element) => (
          <span key={element.id}>{element.fullName}</span>
        ))}
      </div>
      <div className={style.dopInf}>
        <div className={style.genres}>
          {props.genres.map((element, index) => (
            <span key={index}>{element},</span>
          ))}
        </div>
        <span>Russia, {props.releaseDate} </span>
      </div>
      <div className={style.score}>
        <span>Kinopoisk - {props.userRatings.kinopoisk}</span>
        <span>imdb - {props.userRatings.imdb}</span>
      </div>
      <p className={style.text}>{props.description}</p>
    </div>
  );
};
