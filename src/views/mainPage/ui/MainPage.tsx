import { FilmCard } from "components/filmCard";
import { Film } from "utils/types/film";
import { pathToBack } from "utils/consts/pathToBack";
import { useGetRequest } from "utils/hooks/useGetRequest";
import { Load } from "components/load/ui/Load";
import "./style.scss";

export const MainPage = () => {
  const [films, setFilms] = useGetRequest<Film[]>(`${pathToBack}/cinema/today/`, "films");
  return (
    <div className="main">
      <div className="content">
        <div className="films-list">
          {films === undefined ? (
            <Load />
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
