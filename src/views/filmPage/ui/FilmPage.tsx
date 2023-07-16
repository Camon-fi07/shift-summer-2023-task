import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Film } from "utils/types/film";
import { FilmDescription } from "components/filmDescription";
import { Schedules } from "utils/types/schedules";
import { pathToFilm } from "utils/consts/pathToBack";
import { TimeTable } from "components/timeTable";
import { PlaceChoosing } from "components/placeChoosing";
import { Ticket } from "components/ticket";
import { useGetRequest } from "utils/hooks/useGetRequest";
import { OrderForm } from "components/orderForm";
import { OrderStatus } from "utils/consts/orderStatus";
import { ResponseDisplay } from "components/responseDisplay";
import { OrderStatusContext } from "utils/context/orderStatus";
import { OrderInfoContext } from "utils/context/orderInfo";
import { setPayedPlaces } from "utils/helpers/setPayedPlaces";
import { Load } from "components/load";
import style from "./style.module.scss";

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
  const [orderStatus, setOrderStatus] = useContext(OrderStatusContext)!;
  const [orderInfo, setOrderInfo] = useContext(OrderInfoContext)!;

  useEffect(() => {
    setChosenPlaces([]);
  }, [chosenSession, chosenDate]);
  useEffect(() => {
    setOrderInfo((prevValue) => {
      prevValue.createCinemaPaymentDo.filmId = String(id!);
      if (schedules) {
        prevValue.createCinemaPaymentDo.seance.date = schedules![chosenDate].date;
        prevValue.createCinemaPaymentDo.seance.time = schedules![chosenDate].seances[chosenSession].time;
      }
      prevValue.createCinemaPaymentDo.tickets = chosenPlaces.map((element) => ({
        row: element.row,
        column: element.place,
      }));
      return prevValue;
    });
  }, [orderStatus]);
  return (
    <div className={style.film_page}>
      {orderStatus !== OrderStatus.choosingSession ? (
        <div className={style.modal}>
          {orderStatus === OrderStatus.dataFilling ? (
            <OrderForm id={id!} setOrderStatus={setOrderStatus} />
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
          <div className={style.user_order}>
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
              } ${style.grid_order}`}
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
