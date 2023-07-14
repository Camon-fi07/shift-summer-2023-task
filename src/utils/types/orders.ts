export interface Orders {
  success: boolean;
  reason?: string;
  orders: {
    filmName: string;
    orderNumber: number;
    tickets: [
      {
        filmId: string;
        row: number;
        column: number;
        seance: {
          date: string;
          time: string;
        };
        phone: string;
      },
    ];
    phone: string;
    status: string;
  }[];
}
