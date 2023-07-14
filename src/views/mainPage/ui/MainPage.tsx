import { FilmCard } from "components/filmCard";
import { Film } from "utils/types/film";
import { pathToBack } from "utils/consts/pathToBack";
import { useGetRequest } from "utils/hooks/useGetRequest";
import { Load } from "components/load";
import style from "./style.module.scss";

export const MainPage = () => {
  const [films, setFilms] = useGetRequest<Film[]>(`${pathToBack}/cinema/today/`, "films");
  return (
    <div className={style.main}>
      <div className={style.content}>
        <h2 className={style.title}>Афиша</h2>
        <div className={style.films_list}>
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
