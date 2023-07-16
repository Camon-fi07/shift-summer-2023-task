export interface Orders {
  success: boolean;
  reason?: string;
  orders: {
    created: string;
    orderNumber: number;
    tickets: {
      filmId: string;
      row: number;
      column: number;
      seance: {
        date: string;
        time: string;
      };
      created: string;
      phone: string;
    }[];
    phone: string;
    status: string;
  }[];
}
