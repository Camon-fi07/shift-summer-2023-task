import { Image } from "../../image/Image";
import { IFilmInformation } from "../types/filmInformation";
import "./style.scss";

export const FilmCard = (props: IFilmInformation) => {
  return (
    <div className="film-card">
      <Image
        path={"https://shift-backend.onrender.com" + props.img}
        width={0}
        height={110}
      />
      <div className="film-card__description">
        <h2 className="film-card__title">{props.name}</h2>
        {/* <span className="film-card__subtitle">{props.originalName}</span> */}
        <div className="film-card__genres">
          {props.genres.map((element, index) =>
            index != props.genres.length - 1 ? (
              <span>{element},</span>
            ) : (
              <span>{element}</span>
            )
          )}
        </div>
        <div className="film-card__information">
          <span className="film-card__year">{props.releaseDate},</span>
          <span className="film-card__country">Россия</span>
        </div>
        <div className="film-card__score">
          <span>Kinopoisk - {props.userRatings.kinopoisk}</span>
          <span>imdb - {props.userRatings.imdb}</span>
        </div>
      </div>
    </div>
  );
};
