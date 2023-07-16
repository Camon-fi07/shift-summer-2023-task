import { person } from "./user";

export interface CreateCinemaPaymentDo {
  filmId: string;
  person: person;
  debitCard: {
    pan: string;
    expireDate: string;
    cvv: string;
  };
  seance: {
    date: string;
    time: string;
  };
  tickets: {
    row: number;
    column: number;
  }[];
}

export interface OrderResult {
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

export interface OrderInfo {
  createCinemaPaymentDo: CreateCinemaPaymentDo;
  result: OrderResult;
}
