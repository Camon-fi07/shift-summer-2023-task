import { useEffect, useState } from "react";
import { schedules } from "utils/types/schedules";
import axios from "axios";
import { pathToFilm } from "utils/consts/pathToBack";
import { TimeTable } from "components/timeTable/ui/TimeTable";
import { PlaceChoosing } from "components/placeChoosing/ui/PlaceChoosing";
import { Ticket } from "components/ticket/ui/Ticket";

export const TimeLine = ({ id, name, ageRating }: { id: string; name: string; ageRating: string }) => {
  const [schedules, setSchedules] = useState<schedules[]>();
  const [chosenDate, setChosenDate] = useState(0);
  const [chosenSession, setChosenSession] = useState(0);
  const [chosenPlaces, setChosenPlaces] = useState<{ row: number; place: number; cost: number }[]>([]);
  useEffect(() => {
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
    <section>
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
          <PlaceChoosing
            chosenPlaces={chosenPlaces}
            setChosenPlaces={setChosenPlaces}
            places={schedules[chosenDate].seances[chosenSession].hall.places}
          />
          <Ticket
            filmName={name}
            ageRating={ageRating}
            date={schedules[chosenDate].date + schedules[chosenDate].seances[chosenSession].time}
            places={chosenPlaces}
            hallName={schedules[chosenDate].seances[chosenSession].hall.name}
          />
        </div>
      )}
    </section>
  );
};
