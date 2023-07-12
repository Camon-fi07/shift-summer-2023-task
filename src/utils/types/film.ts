export interface Film {
  id: string;
  name: string;
  originalName: string;
  description: string;
  releaseDate: string;
  actors: {
    id: string;
    professions: string[];
    fullName: string;
  }[];
  directors: {
    id: string;
    professions: string[];
    fullName: string;
  }[];
  runtime: number;
  ageRating: string;
  genres: string[];
  userRatings: {
    kinopoisk: string;
    imdb: string;
  };
  img: string;
}

export interface CreateCinemaPaymentDo {
  filmId: string;
  person: {
    firstname: string;
    lastname: string;
    middlename: string;
    phone: string;
  };
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
