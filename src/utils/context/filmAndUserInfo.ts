import { createContext } from "react";
import { CreateCinemaPaymentDo } from "utils/types/film";
export const filmAndUserInfoContext = createContext<
  [CreateCinemaPaymentDo, React.Dispatch<React.SetStateAction<CreateCinemaPaymentDo>>] | undefined
>(undefined);
