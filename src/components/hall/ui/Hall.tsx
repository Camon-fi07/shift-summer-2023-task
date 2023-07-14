import { PlacesInfo } from "utils/types/placesInfo";
import style from "./style.module.scss";

export const Hall = (props: PlacesInfo) => {
  return (
    <div className={style.hall}>
      <span className={style.screen_title}>Экран</span>
      <div className={style.screen}></div>
      <div className={style.places}>
        {props.places.map((row, rowIndex) => (
          <div className={style.row}>
            <span className={style.row_number}>{rowIndex + 1}</span>
            {row.map((place, placeIndex) => (
              <button
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
                    ? style.chosen_place
                    : ""
                } ${style.place} ${style[place.type.toLowerCase()]}`}
              >
                <div className={style.place_information}>
                  <span>{rowIndex + 1} ряд</span>
                  <span>{placeIndex + 1} место</span>
                  <span className={style.place_cost}>{place.price} Р</span>
                </div>
              </button>
            ))}
            <span className={style.row_number}>{rowIndex + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
