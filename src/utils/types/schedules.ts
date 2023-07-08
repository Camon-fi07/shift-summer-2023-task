export interface schedules {
  date: string;
  seances: {
    time: string;
    hall: {
      name: string;
      places: (null | { row: number; column: number })[];
    };
    payedTickets: {
      filmId: string;
      row: number;
      column: number;
      seance: {
        date: string;
        time: string;
      };
      phone: string;
    }[];
  }[];
}
