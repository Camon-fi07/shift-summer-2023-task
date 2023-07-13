import { useState } from "react";
import { PlacesInfo } from "utils/types/placesInfo";
import style from "./style.module.scss";

export const Hall = (props: PlacesInfo) => {
  const [hoverPlace, setHoverPlace] = useState<{ row: number; place: number }>({ row: -1, place: -1 });
  return (
    <div className={style.hall}>
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
                onClick={() => {
                  const chosenPlace = {
                    row: rowIndex + 1,
                    place: placeIndex + 1,
                    cost: place.price,
                  };
                  const wasPlaceChosen = props.chosenPlaces.some(
                    (element) => element.row == chosenPlace.row && element.place == chosenPlace.place,
                  );
                  if (place.type.toLowerCase() != "blocked" && place.type.toLowerCase() != "payed" && !wasPlaceChosen) {
                    props.setChosenPlaces([...props.chosenPlaces, chosenPlace]);
                  } else if (wasPlaceChosen) {
                    props.setChosenPlaces(
                      props.chosenPlaces.filter(
                        (element) => element.row != chosenPlace.row || element.place != chosenPlace.place,
                      ),
                    );
                  }
                }}
                className={`${
                  props.chosenPlaces.some((element) => element.row - 1 == rowIndex && element.place - 1 == placeIndex)
                    ? style.chosenPlace
                    : ""
                } ${style.place} ${style[place.type.toLowerCase()]}`}
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
  );
};
