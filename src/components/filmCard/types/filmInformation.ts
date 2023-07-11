export interface FilmInformation {
  id: string;
  name: string;
  ageRating: string;
  userRatings: {
    kinopoisk: string;
    imdb: string;
  };
  img: string;
  genres: string[];
}
