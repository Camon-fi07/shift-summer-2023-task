import { changeDate } from "utils/helpers/changeDate";
import { seanse } from "../types/seanses";
import style from "./style.module.scss";
import { useState } from "react";

export const TimeTable = ({ seanses }: { seanses: seanse[] }) => {
  const [chosenDate, setChosenDate] = useState(0);
  const availableHours = seanses.map((element) => {
    return [
      ...new Set(
        element.availableTime.map((hour) => {
          return hour.split(":")[0];
        }),
      ),
    ];
  });
  return (
    <div className={style.timeTable}>
      <h2 className={style.title}>Расписание</h2>
      <div className={style.dateList}>
        {seanses.map((element, index) => (
          <button className={chosenDate == index ? style.activeDate : ""} onClick={() => setChosenDate(index)}>
            <span>{changeDate(element.date)}</span>
          </button>
        ))}
      </div>
      <div className={style.timeList}>
        {availableHours[chosenDate].map((element) => (
          <div className={style.hour}>
            <div className={style.line}></div>
            <div className={style.seansesInHour}>
              {seanses[chosenDate].availableTime.map((time) => {
                if (time.split(":")[0] == element)
                  return (
                    <button
                      style={{ bottom: `${(Number(time.split(":")[1]) / 60) * 100}%` }}
                      className={style.seanseTime}
                    >
                      <span>{time}</span>
                    </button>
                  );
              })}
            </div>
            <span className={style.startTime}>{element}:00</span>
          </div>
        ))}
      </div>
      <div className={style.timeList}>{}</div>
    </div>
  );
};
