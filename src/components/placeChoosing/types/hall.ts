export interface hall {
  chosenPlaces: { price: number; type: string }[][];
  setChosenPlaces: (newPlaces: { price: number; type: string }[][]) => void;
  places: { price: number; type: string }[][];
}
