import { changeDate } from "utils/helpers/changeDate";
import { seanse } from "../types/seances";
import style from "./style.module.scss";

export const TimeTable = (props: seanse) => {
  return (
    <div className={style.timeTable}>
      <h2 className={style.title}>Расписание</h2>
      <div className={style.dateList}>
        {props.sessions.map((element, index) => (
          <button
            className={props.chosenDate == index ? style.activeDate : ""}
            onClick={() => {
              props.setChosenDate(index);
              props.setChosenSession(0);
            }}
          >
            <span>{changeDate(element.date)}</span>
          </button>
        ))}
      </div>
      <div className={style.timeList}>
        {props.sessions[props.chosenDate].availableTime.map((time, index) => {
          return (
            <button
              className={`${props.chosenSession == index ? style.activeSession : ""}  ${style.seanseTime}`}
              onClick={() => {
                props.setChosenSession(index);
              }}
            >
              <span>{time}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
