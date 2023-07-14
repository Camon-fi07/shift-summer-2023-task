import { useState } from "react";
import { PlacesInfo } from "utils/types/placesInfo";
import style from "./style.module.scss";

export const PlacesList = (props: PlacesInfo) => {
  const [openList, setOpenList] = useState<{ isRow: boolean; index: number }>({ isRow: true, index: -1 });
  return (
    <div className={style.places_list}>
      <h2 className={style.title}>Выбор мест</h2>
      <div className={style.description}>
        <span>ряд</span>
        <span>место</span>
      </div>
      {props.chosenPlaces.map((element, index) => (
        <div className={style.selection}>
          <div className={style.row_selection}>
            <button
              onClick={() =>
                openList.isRow && openList.index == index
                  ? setOpenList({ isRow: true, index: -1 })
                  : setOpenList({ isRow: true, index: index })
              }
            >
              <span className={style.button_text}>{element.row}</span>
            </button>
            <ul className={openList.isRow && openList.index == index ? style.drop_list : style.hidden}>
              {props.places.map((row, rowIndex) => (
                <li
                  onClick={() => {
                    props.setChosenPlaces(
                      props.chosenPlaces.map((newElement, newIndex) =>
                        index == newIndex
                          ? {
                              row: rowIndex + 1,
                              place: element.place,
                              cost: props.places[rowIndex][element.place - 1].price,
                            }
                          : newElement,
                      ),
                    );
                    setOpenList({ isRow: true, index: -1 });
                  }}
                >
                  {rowIndex + 1}
                </li>
              ))}
            </ul>
          </div>
          <div className={style.place_selection}>
            <button
              onClick={() =>
                !openList.isRow && openList.index == index
                  ? setOpenList({ isRow: false, index: -1 })
                  : setOpenList({ isRow: false, index: index })
              }
            >
              <span className={style.button_text}>{element.place}</span>
            </button>
            <ul className={!openList.isRow && openList.index == index ? style.drop_list : style.hidden}>
              {props.places[element.row - 1].map((place, placeIndex) => (
                <li
                  onClick={() => {
                    props.setChosenPlaces(
                      props.chosenPlaces.map((newElement, newIndex) =>
                        index == newIndex
                          ? {
                              row: element.row,
                              place: placeIndex + 1,
                              cost: props.places[element.row - 1][placeIndex].price,
                            }
                          : newElement,
                      ),
                    );
                    setOpenList({ isRow: false, index: -1 });
                  }}
                >
                  {placeIndex + 1}
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => {
              props.setChosenPlaces(props.chosenPlaces.filter((secondElement, secondIndex) => secondIndex != index));
            }}
            className={style.place_deleting}
          >
            <span>-</span>
          </button>
          <span className={style.error}>
            {props.chosenPlaces.some(
              (elementForCheck, indexForCheck) =>
                element.row == elementForCheck.row && elementForCheck.place == element.place && index !== indexForCheck,
            ) || element.cost == 0
              ? "место уже было выбрано или недоступно"
              : ""}
          </span>
        </div>
      ))}
      <button
        className={style.adding_place}
        onClick={() => props.setChosenPlaces([...props.chosenPlaces, { row: 1, place: 1, cost: 0 }])}
      >
        <span className={style.button_text}>+</span>
      </button>
    </div>
  );
};
