import { getDayInfo } from "utils/helpers/changeDate";
import { Seance } from "../types/seances";
import style from "./style.module.scss";

export const TimeTable = (props: Seance) => {
  return (
    <div className={style.time_table}>
      <h2 className={style.title}>Расписание</h2>
      <div className={style.date_list}>
        {props.sessions.map((element, index) => (
          <button
            className={props.chosenDate == index ? style.active_date : ""}
            onClick={() => {
              props.setChosenDate(index);
              props.setChosenSession(0);
            }}
          >
            <span>{getDayInfo(element.date)}</span>
          </button>
        ))}
      </div>
      <div className={style.time_list}>
        {props.sessions[props.chosenDate].availableTime.map((time, index) => {
          return (
            <button
              className={`${props.chosenSession == index ? style.active_session : ""}  ${style.seanse_time}`}
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
