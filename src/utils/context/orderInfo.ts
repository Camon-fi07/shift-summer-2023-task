import { createContext } from "react";
import { OrderInfo } from "utils/types/orderInfo";
export const OrderInfoContext = createContext<[OrderInfo, React.Dispatch<React.SetStateAction<OrderInfo>>] | undefined>(
  undefined,
);
