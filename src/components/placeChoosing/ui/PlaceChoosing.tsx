import { useState } from "react";
import { hall } from "../types/hall";
import style from "./style.module.scss";

export const PlaceChoosing = (props: hall) => {
  const [hoverPlace, setHoverPlace] = useState<{ row: number; place: number }>({ row: -1, place: -1 });
  return (
    <div className={style.hall}>
      <div className={style.container}>
        <span className={style.screenTitle}>Экран</span>
        <div className={style.screen}></div>
        <div className={style.places}>
          {props.places.map((row, rowIndex) => (
            <div className={style.row}>
              <span className={style.rowNumber}>{rowIndex + 1}</span>
              {row.map((place, placeIndex) => (
                <button
                  onMouseEnter={() => setHoverPlace({ row: rowIndex, place: placeIndex })}
                  onMouseLeave={() => setHoverPlace({ row: -1, place: -1 })}
                  className={`${style.place} ${style[place.type.toLowerCase()]}`}
                >
                  <div
                    className={`${
                      hoverPlace.place === placeIndex && hoverPlace.row == rowIndex
                        ? style.placeInformation
                        : style.hidden
                    }`}
                  >
                    <span>{rowIndex + 1} ряд</span>
                    <span>{placeIndex + 1} место</span>
                    <span className={style.placeCost}>{place.price} Р</span>
                  </div>
                </button>
              ))}
              <span className={style.rowNumber}>{rowIndex + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
