import { FilmCard } from "components/filmCard";
import { Film } from "utils/types/film";
import { pathToBack } from "utils/consts/pathToBack";
import { useRequest } from "utils/hooks/useRequest";
import "./style.scss";

export const MainPage = () => {
  const [films, setFilms] = useRequest<Film[]>(`${pathToBack}/cinema/today/`, "films");
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
