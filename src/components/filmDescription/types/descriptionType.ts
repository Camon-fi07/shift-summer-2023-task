export interface DescriptionOfFilm {
  name: string;
  directors: {
    id: string;
    professions: string[];
    fullName: string;
  }[];
  genres: string[];
  releaseDate: string;
  description: string;
  userRatings: {
    kinopoisk: string;
    imdb: string;
  };
  img: string;
  ageRating: string;
}
