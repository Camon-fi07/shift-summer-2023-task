import { ageRating } from "../../../utils/ageRating";
import { IDescriptionType } from "../types/descriptionType";
import "./style.scss";
export const FilmDescription = (props: IDescriptionType) => {
  return (
    <div className="film-description">
      <div className="film-description__img">
        <img src={`https://shift-backend.onrender.com${props.img}`} alt="" />
      </div>
      <div className="film-description__information">
        <h2 className="film-description__title">
          {props.name} {ageRating[props.ageRating]}
        </h2>
        <div className="film-description__directors">
          Режиссёр:
          {props.directors.map((element) => (
            <span key={element.id}>{element.fullName}</span>
          ))}
        </div>
        <div className="film-description__dop-inf">
          <div className="film-description__genres">
            {props.genres.map((element, index) => (
              <span key={index}>{element},</span>
            ))}
          </div>
          <span className="film-description__country">Russia,</span>
          <span className="film-description__date">{props.releaseDate}</span>
        </div>
        <div className="film-description__score">
          <span>Kinopoisk - {props.userRatings.kinopoisk}</span>
          <span>imdb - {props.userRatings.imdb}</span>
        </div>
        <p className="film-description__description">{props.description}</p>
      </div>
    </div>
  );
};
