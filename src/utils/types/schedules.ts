export interface schedules {
  date: string;
  seances: {
    time: string;
    hall: {
      name: string;
      places: { price: number; type: string }[][];
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
