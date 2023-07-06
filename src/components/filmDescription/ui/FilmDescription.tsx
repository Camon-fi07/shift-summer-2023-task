import { Image } from "../../image/Image";

export const FilmDescription = () => {
  return (
    <div className="film-description">
      {/* <Image /> */}
      <div className="film-description__information">
        <h2 className="film-description__title"></h2>
        <div className="film-description__directors">
          {/* здесь список будет режиссёров */}
        </div>
        <div className="film-description__dop-inf">
          <div className="film-description__genres"></div>
          <span className="film-description__country"></span>
          <span className="film-description__date"></span>
        </div>
        <div className="film-description__score">
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};
