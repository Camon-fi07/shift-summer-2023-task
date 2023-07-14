import { OrderStatus } from "utils/consts/orderStatus";

export interface OrderFormInfo {
  id: string;
  setOrderStatus: (newOrderStatus: OrderStatus) => void;
}
