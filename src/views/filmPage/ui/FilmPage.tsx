import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Film } from "utils/types/film";
import { FilmDescription } from "components/filmDescription";
import { Schedules } from "utils/types/schedules";
import { pathToFilm } from "utils/consts/pathToBack";
import { TimeTable } from "components/timeTable/ui/TimeTable";
import { PlaceChoosing } from "components/placeChoosing/ui/PlaceChoosing";
import { Ticket } from "components/ticket/ui/Ticket";
import { useRequest } from "utils/hooks/useRequest";
import style from "./style.module.scss";

export const FilmPage = () => {
  const { id } = useParams();
  const [film, setFilm] = useRequest<Film>(`${pathToFilm}/${id}`, "film");
  const [schedules, setSchedules] = useRequest<Schedules[]>(`${pathToFilm}/${id}/schedule`, "schedules");
  const [chosenDate, setChosenDate] = useState(0);
  const [chosenSession, setChosenSession] = useState(0);
  const [chosenPlaces, setChosenPlaces] = useState<{ row: number; place: number; cost: number }[]>([]);
  useEffect(() => {
    setChosenPlaces([]);
  }, [chosenSession, chosenDate]);
  return (
    <div className={style.filmPage}>
      <div className={style.content}>
        {film === undefined ? (
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
        {film === undefined || schedules === undefined ? (
          <p>WAIT</p>
        ) : (
          <div>
            <TimeTable
              chosenDate={chosenDate}
              setChosenDate={setChosenDate}
              chosenSession={chosenSession}
              setChosenSession={setChosenSession}
              sessions={schedules!.map((element) => {
                return {
                  date: element.date,
                  availableTime: element.seances.map((seanse) => seanse.time),
                };
              })}
            />
            <div className={style.userOrder}>
              <PlaceChoosing
                chosenPlaces={chosenPlaces}
                setChosenPlaces={setChosenPlaces}
                places={schedules[chosenDate].seances[chosenSession].hall.places}
              />
              <Ticket
                filmName={film.name}
                ageRating={film.ageRating}
                date={schedules[chosenDate].date}
                time={schedules[chosenDate].seances[chosenSession].time}
                places={chosenPlaces}
                hallName={schedules[chosenDate].seances[chosenSession].hall.name}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
