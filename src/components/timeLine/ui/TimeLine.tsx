import { useEffect, useState } from "react";
import { schedules } from "utils/types/schedules";
import axios from "axios";
import { pathToFilm } from "utils/consts/pathToBack";
import { TimeTable } from "components/timeTable/ui/TimeTable";

export const TimeLine = ({ id }: { id: string }) => {
  const [schedules, setSchedules] = useState<schedules[]>();
  useEffect(() => {
    axios
      .get(`${pathToFilm}/${id}/schedule`)
      .then((res) => {
        const originData: schedules[] = res.data.schedules;
        originData.forEach((element) => {
          element.seances.sort((a, b) => Number(a.time.split(":")[0]) - Number(b.time.split(":")[0]));
        });
        setSchedules(originData);
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
        <TimeTable
          seanses={schedules!.map((element) => {
            return {
              date: element.date,
              availableTime: element.seances.map((seanse) => seanse.time),
            };
          })}
        />
      )}
    </section>
  );
};
