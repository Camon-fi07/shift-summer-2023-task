import { useEffect, useState } from "react";
import { schedules } from "utils/types/schedules";
import axios from "axios";
import { pathToFilm } from "utils/consts/pathToBack";

export const TimeLine = ({ id }: { id: string }) => {
  const [schedules, setSchedules] = useState<schedules>();
  useEffect(() => {
    axios
      .get(`${pathToFilm}/${id}/schedule`)
      .then((res) => {
        setSchedules(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <section></section>;
};
