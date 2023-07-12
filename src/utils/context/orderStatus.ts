import { createContext } from "react";
import { OrderStatus } from "utils/consts/orderStatus";
export const orderStatusContext = createContext<
  [OrderStatus, React.Dispatch<React.SetStateAction<OrderStatus>>] | undefined
>(undefined);
