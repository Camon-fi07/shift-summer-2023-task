import { createContext } from "react";
import { CreateCinemaPaymentDo } from "utils/types/film";
export const FilmAndUserInfoContext = createContext<
  [CreateCinemaPaymentDo, React.Dispatch<React.SetStateAction<CreateCinemaPaymentDo>>] | undefined
>(undefined);
