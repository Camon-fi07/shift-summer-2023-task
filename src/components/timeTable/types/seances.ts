export interface Seance {
  chosenDate: number;
  setChosenDate: (newDate: number) => void;
  chosenSession: number;
  setChosenSession: (newSession: number) => void;
  sessions: { date: string; availableTime: string[] }[];
}
