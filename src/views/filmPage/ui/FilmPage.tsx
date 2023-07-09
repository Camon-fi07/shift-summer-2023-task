import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { film } from "utils/types/film";
import { FilmDescription } from "components/filmDescription";
import { schedules } from "utils/types/schedules";
import { pathToFilm } from "utils/consts/pathToBack";
import { TimeTable } from "components/timeTable/ui/TimeTable";
import { PlaceChoosing } from "components/placeChoosing/ui/PlaceChoosing";
import { Ticket } from "components/ticket/ui/Ticket";
import style from "./style.module.scss";

export const FilmPage = () => {
  const { id } = useParams();
  const [film, setFilm] = useState<film>(JSON.parse(sessionStorage.getItem(`film${id}`) || "{}"));
  const [schedules, setSchedules] = useState<schedules[]>();
  const [chosenDate, setChosenDate] = useState(0);
  const [chosenSession, setChosenSession] = useState(0);
  const [chosenPlaces, setChosenPlaces] = useState<{ row: number; place: number; cost: number }[]>([]);
  useEffect(() => {
    axios
      .get(`${pathToFilm}/${id}`)
      .then((res) => {
        setFilm(res.data.film);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${pathToFilm}/${id}/schedule`)
      .then((res) => {
        const originData: schedules[] = res.data.schedules;
        originData.forEach((element) => {
          element.seances.sort((a, b) => Number(a.time.split(":")[0]) - Number(b.time.split(":")[0]));
        });
        setSchedules(originData);
        console.log(originData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={style.filmPage}>
      <div className={style.content}>
        {Object.entries(film).length == 0 ? (
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
        {schedules === undefined ? (
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
                date={schedules[chosenDate].date + schedules[chosenDate].seances[chosenSession].time}
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
