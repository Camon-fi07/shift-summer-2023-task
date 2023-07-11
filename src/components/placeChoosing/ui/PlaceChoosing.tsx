import { useState } from "react";
import { Hall } from "../types/hall";
import style from "./style.module.scss";

export const PlaceChoosing = (props: Hall) => {
  const [hoverPlace, setHoverPlace] = useState<{ row: number; place: number }>({ row: -1, place: -1 });
  const [openList, setOpenList] = useState<{ isRow: boolean; index: number }>({ isRow: true, index: -1 });
  return (
    <section className={style.placeChoosing}>
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
                    if (
                      place.type.toLowerCase() != "blocked" &&
                      place.type.toLowerCase() != "payed" &&
                      !wasPlaceChosen
                    ) {
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
      <div className={style.table}>
        <h2 className={style.title}>Выбор мест</h2>
        <div className={style.description}>
          <span>ряд</span>
          <span>место</span>
        </div>
        {props.chosenPlaces.map((element, index) => (
          <div className={style.selection}>
            <div className={style.rowSelection}>
              <button
                onClick={() =>
                  openList.isRow && openList.index == index
                    ? setOpenList({ isRow: true, index: -1 })
                    : setOpenList({ isRow: true, index: index })
                }
              >
                <span className={style.buttonText}>{element.row}</span>
              </button>
              <ul className={openList.isRow && openList.index == index ? style.dropList : style.hidden}>
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
            <div className={style.placeSelection}>
              <button
                onClick={() =>
                  !openList.isRow && openList.index == index
                    ? setOpenList({ isRow: false, index: -1 })
                    : setOpenList({ isRow: false, index: index })
                }
              >
                <span className={style.buttonText}>{element.place}</span>
              </button>
              <ul className={!openList.isRow && openList.index == index ? style.dropList : style.hidden}>
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
            <span className={style.error}>
              {props.chosenPlaces.some(
                (elementForCheck) =>
                  element.row - 1 == elementForCheck.row && elementForCheck.place == element.place - 1,
              ) || element.cost == 0
                ? "место уже было выбрано или недоступно"
                : ""}
            </span>
          </div>
        ))}
        <button
          className={style.addingPlace}
          onClick={() => props.setChosenPlaces([...props.chosenPlaces, { row: 1, place: 1, cost: 0 }])}
        >
          <span className={style.buttonText}>+</span>
        </button>
      </div>
    </section>
  );
};
