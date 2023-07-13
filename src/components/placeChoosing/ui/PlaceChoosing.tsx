import { PlacesInfo } from "../../../utils/types/placesInfo";
import { Hall } from "components/hall";
import { PlacesList } from "components/placesList";
import style from "./style.module.scss";

export const PlaceChoosing = (props: PlacesInfo) => {
  return (
    <section className={style.placeChoosing}>
      <Hall chosenPlaces={props.chosenPlaces} setChosenPlaces={props.setChosenPlaces} places={props.places} />
      <PlacesList chosenPlaces={props.chosenPlaces} setChosenPlaces={props.setChosenPlaces} places={props.places} />
    </section>
  );
};
