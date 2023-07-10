import { FilmCard } from "components/filmCard";
import { film } from "utils/types/film";
import { pathToBack } from "utils/consts/pathToBack";
import { useRequest } from "utils/hooks/useRequest";
import "./style.scss";

export const MainPage = () => {
  const [films, setFilms] = useRequest<film[]>(`${pathToBack}/cinema/today/`, "films");
  return (
    <div className="main">
      <div className="content">
        <div className="films-list">
          {films === undefined ? (
            <p>WAIT</p>
          ) : (
            films.map((element) => (
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};
