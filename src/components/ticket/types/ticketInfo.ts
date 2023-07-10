export interface TicketInfo {
  filmName: string;
  ageRating: string;
  date: string;
  time: string;
  hallName: string;
  places: { row: number; place: number; cost: number }[];
}
