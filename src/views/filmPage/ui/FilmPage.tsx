import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Film } from "utils/types/film";
import { FilmDescription } from "components/filmDescription";
import { Schedules } from "utils/types/schedules";
import { pathToFilm } from "utils/consts/pathToBack";
import { TimeTable } from "components/timeTable/ui/TimeTable";
import { PlaceChoosing } from "components/placeChoosing/ui/PlaceChoosing";
import { Ticket } from "components/ticket/ui/Ticket";
import { useGetRequest } from "utils/hooks/useGetRequest";
import { UserData } from "components/userData/ui/UserData";
import { OrderStatus } from "utils/consts/orderStatus";
import { ResponseDisplay } from "components/responseDisplay/ui/ResponseDisplay";
import { orderStatusContext } from "utils/context/orderStatus";
import { filmAndUserInfoContext } from "utils/context/filmAndUserInfo";
import { setPayedPlaces } from "utils/helpers/setPayedPlaces";
import style from "./style.module.scss";
import { Load } from "components/load/ui/Load";

export const FilmPage = () => {
  const { id } = useParams();
  const [film, setFilm] = useGetRequest<Film>(`${pathToFilm}/${id}`, "film");
  const [schedules, setSchedules] = useGetRequest<Schedules[]>(
    `${pathToFilm}/${id}/schedule`,
    "schedules",
    setPayedPlaces,
  );
  const [chosenDate, setChosenDate] = useState(0);
  const [chosenSession, setChosenSession] = useState(0);
  const [chosenPlaces, setChosenPlaces] = useState<{ row: number; place: number; cost: number }[]>([]);
  const [orderStatus, setOrderStatus] = useContext(orderStatusContext)!;
  const [filmAndUserInfo, setFilmAndUserInfo] = useContext(filmAndUserInfoContext)!;

  useEffect(() => {
    setChosenPlaces([]);
  }, [chosenSession, chosenDate]);
  useEffect(() => {
    setFilmAndUserInfo((prevValue) => {
      prevValue.filmId = String(id!);
      if (schedules) {
        prevValue.seance.date = schedules![chosenDate].date;
        prevValue.seance.time = schedules![chosenDate].seances[chosenSession].time;
      }
      prevValue.tickets = chosenPlaces.map((element) => ({ row: element.row, column: element.place }));
      return prevValue;
    });
  }, [orderStatus]);
  return (
    <div className={style.filmPage}>
      {orderStatus !== OrderStatus.choosingSession ? (
        <div className={style.modal}>
          {orderStatus === OrderStatus.dataFilling ? (
            <UserData id={id!} setOrderStatus={setOrderStatus} />
          ) : (
            <ResponseDisplay filmName={film?.name || ""} setOrderStatus={setOrderStatus} />
          )}
        </div>
      ) : (
        ""
      )}
      <div className={`${orderStatus !== OrderStatus.choosingSession ? style.muted : ""} ${style.content}`}>
        {film === undefined ? (
          <Load />
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
          <Load />
        ) : (
          <div className={style.userOrder}>
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
            <div
              className={`${
                schedules[chosenDate].seances[chosenSession].hall.places[0].length <= 10 ? style.row : style.column
              } ${style.gridOrder}`}
            >
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
                setOrderStatus={setOrderStatus}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
