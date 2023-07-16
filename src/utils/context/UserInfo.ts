import { createContext } from "react";
import { Account } from "utils/types/user";
export const UserInfoContext = createContext<[Account, React.Dispatch<React.SetStateAction<Account>>] | undefined>(
  undefined,
);
