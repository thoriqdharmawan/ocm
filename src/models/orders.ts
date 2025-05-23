export type PaymentMethod = "Transfer Bank BCA" | "COD" | "OVO" | "GoPay" | "Transfer Bank Mandiri";
export type Courier = "JNE" | "SiCepat" | "J&T Express" | "Pos Indonesia" | "AnterAja";

export interface OrdersType {
  id: number;
  orderNumber: string;
  orderDate: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  totalAmount: number;
  paymentMethod: PaymentMethod;
  customerName: string;
  shippingAddress: string;
  courier: Courier;
  trackingNumber: string;
}
