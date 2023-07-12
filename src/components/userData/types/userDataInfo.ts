import { OrderStatus } from "utils/consts/orderStatus";

export interface UserDataInfo {
  id: string;
  setOrderStatus: (newOrderStatus: OrderStatus) => void;
}
