import Table, { Column } from "../components/Table";
import { ordersData } from "../datas/orders";
import { OrdersType } from "../models/orders";

const columns: Column<OrdersType>[] = [
  {
    id: "orderNumber",
    label: "Nomor Pesanan",
    cell: ({ data }) => data.orderNumber,
    className: "text-center",
  },
  {
    id: "orderDate",
    label: "Tanggal Pesanan",
    cell: ({ data }) => data.orderDate,
  },
  {
    id: "status",
    label: "Status",
    cell: ({ data }) => data.status,
  },
  {
    id: "totalAmount",
    label: "Total Pembayaran",
    cell: ({ data }) => `Rp ${data.totalAmount.toLocaleString()}`,
  },
  {
    id: "paymentMethod",
    label: "Metode Pembayaran",
    cell: ({ data }) => data.paymentMethod,
  },
  {
    id: "customerName",
    label: "Nama Pelanggan",
    cell: ({ data }) => data.customerName,
  },
  {
    id: "shippingAddress",
    label: "Alamat Pengiriman",
    cell: ({ data }) => data.shippingAddress,
  },
  {
    id: "courier",
    label: "Kurir",
    cell: ({ data }) => data.courier,
    className: "text-center",
  },
  {
    id: "trackingNumber",
    label: "Nomor Resi",
    cell: ({ data }) => data.trackingNumber,
  },
];

const Orders = () => {
  return (
    <div className="container">
      <h2 className="my-4">Orders Page</h2>

      <Table columns={columns} data={ordersData} />
    </div>
  );
};

export default Orders;
