import { createContext } from "react";
import { OrderStatus } from "utils/consts/orderStatus";
export const OrderStatusContext = createContext<
  [OrderStatus, React.Dispatch<React.SetStateAction<OrderStatus>>] | undefined
>(undefined);
