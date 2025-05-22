export interface OrdersType {
  id: number;
  orderNumber: string;
  orderDate: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  totalAmount: number;
  paymentMethod: string;
  customerName: string;
  shippingAddress: string;
  courier: string;
  trackingNumber: string;
}
