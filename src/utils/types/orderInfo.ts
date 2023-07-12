export interface OrderInfo {
  success: boolean;
  reason: string;
  order: {
    orderNumber: number;
    tickets: {
      filmId: string;
      row: number;
      column: number;
      seance: {
        date: string;
        time: string;
      };
      phone: string;
    }[];
    phone: string;
    status: string;
  };
}
