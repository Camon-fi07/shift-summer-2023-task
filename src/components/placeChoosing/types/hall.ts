export interface hall {
  chosenPlaces: { row: number; place: number; cost: number }[];
  setChosenPlaces: (newPlaces: { row: number; place: number; cost: number }[]) => void;
  places: { price: number; type: string }[][];
}
