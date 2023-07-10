export interface FilmInformation {
  id: string;
  name: string;
  originalName: string;
  releaseDate: string;
  ageRating: string;
  userRatings: {
    kinopoisk: string;
    imdb: string;
  };
  img: string;
  genres: string[];
}
