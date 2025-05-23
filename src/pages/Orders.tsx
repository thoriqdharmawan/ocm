import { useState } from "react";
import Table, { Column } from "../components/ui/Table";
import { ordersData } from "../datas/orders";
import { OrdersType } from "../models/orders";
import { formatDate } from "../utils/global";
import Input from "../components/ui/Input";
import Pagination from "../components/ui/Pagination";
import Dropdown from "../components/ui/Dropdown";
import useGetListOrder from "../api/orders/useGetListOrder";
import useAddOrder from "../api/orders/useAddOrder";
import useUpdateOrder from "../api/orders/useUpdateOrder";
import useDeleteOrder from "../api/orders/useDeleteOrder";
import EmptyState from "../components/ui/EmptyState";
import ModalDeleteOrder from "../components/features/orders/ModalDeleteOrder";
import ModalDetailOrder from "../components/features/orders/ModalDetailOrder";

const LIMIT = 10;

interface ModalState {
  openDetail: boolean;
  openDraft: boolean;
  openDelete: boolean;
  data: OrdersType | null;
  type: "add" | "edit" | "detail";
}

const DEFAULT_MODAL: ModalState = {
  openDetail: false,
  openDraft: false,
  type: "add",
  data: null as OrdersType | null,
  openDelete: false,
};

const Orders = () => {
  const [orders, setOrders] = useState<OrdersType[]>(
    ordersData.slice(0, LIMIT)
  );
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [modal, setModal] = useState<ModalState>(DEFAULT_MODAL);

  const { data, isPending } = useGetListOrder({
    params: {
      offset: (page - 1) * LIMIT,
      limit: LIMIT,
    },
  });

  const { mutate: addOrder } = useAddOrder({
    onSuccess: (data) => {
      setOrders((prev) => [data.data, ...prev]);
    },
  });

  const { mutate: updateOrder } = useUpdateOrder({
    onSuccess: (data) => {
      setOrders((prev) =>
        prev.map((o) => (o.id === data.data.id ? data.data : o))
      );
    },
  });

  const { mutate: deleteOrder } = useDeleteOrder({
    onSuccess: (data, variables) => {
      setOrders((prev) => prev.filter((o) => o.id !== variables.id));
    },
    onError: (error, variables) => {
      setOrders((prev) => prev.filter((o) => o.id !== variables.id));
    },
  });

  const handleDeleteOrder = (id: number) => {
    deleteOrder({ id });
  };

  const columns: Column<OrdersType>[] = [
    {
      id: "orderNumber",
      label: "Order Number",
      cell: ({ data }) => data.orderNumber,
      className: "text-center",
    },
    {
      id: "orderDate",
      label: "Order Date",
      cell: ({ data }) => formatDate(data.orderDate),
      style: { minWidth: "150px" },
      className: "text-center",
    },
    {
      id: "status",
      label: "Status",
      cell: ({ data }) => data.status,
      className: "text-center",
    },
    {
      id: "totalAmount",
      label: "Total Amount",
      cell: ({ data }) => `Rp ${data.totalAmount.toLocaleString()}`,
      className: "text-end",
    },
    {
      id: "trackingNumber",
      label: "Tracking Number",
      cell: ({ data }) => data.trackingNumber,
      className: "text-center",
    },
    {
      id: "action",
      label: "Action",
      cell: ({ data }) => (
        <Dropdown
          items={[
            {
              label: "Detail",
              action: () =>
                setModal((prev) => ({
                  ...prev,
                  openDetail: true,
                  type: "detail",
                  data,
                })),
            },
            {
              label: "Edit",
              action: () =>
                setModal((prev) => ({
                  ...prev,
                  openDraft: true,
                  type: "edit",
                  data,
                })),
            },
            {
              label: "Delete",
              action: () =>
                setModal((prev) => ({ ...prev, openDelete: true, data })),
            },
          ]}
          label={"..."}
        />
      ),
      className: "text-center",
    },
  ];

  const handleSearch = (value: string) => {
    setSearch(value);
    const filtered = ordersData.filter(
      (o) =>
        o.orderNumber.toLowerCase().includes(value.toLowerCase()) ||
        o.customerName.toLowerCase().includes(value.toLowerCase()) ||
        o.status.toLowerCase().includes(value.toLowerCase())
    );
    setOrders(filtered.slice(0, LIMIT));
    setPage(1);
  };

  return (
    <div className="container">
      <h2 className="my-4">Orders</h2>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Input
          placeholder="Search Order Number"
          wrapperClassName="w-50"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button
          onClick={() =>
            setModal((prev) => ({ ...prev, openDraft: true, type: "add" }))
          }
          type="button"
          className="btn btn-primary"
        >
          Add Order
        </button>
      </div>
      {orders.length === 0 ? (
        <EmptyState
          title={search ? "Order not found" : undefined}
          description={
            search ? `No orders match the keyword "${search}".` : undefined
          }
        />
      ) : (
        <Table columns={columns} data={orders} />
      )}

      <Pagination
        currentPage={page}
        totalPages={Math.ceil(
          (search ? orders.length : ordersData.length) / LIMIT
        )}
        onPageChange={(page) => {
          setPage(page);
          if (search) {
            setOrders((prev) => prev.slice((page - 1) * LIMIT, page * LIMIT));
          } else {
            setOrders(ordersData.slice((page - 1) * LIMIT, page * LIMIT));
          }
        }}
        className="my-4"
      />

      <ModalDeleteOrder
        open={modal.openDelete}
        onClose={() => setModal(DEFAULT_MODAL)}
        data={modal.data}
        onDelete={handleDeleteOrder}
      />

      <ModalDetailOrder
        open={modal.openDetail}
        onClose={() => setModal(DEFAULT_MODAL)}
        data={modal.data}
      />
    </div>
  );
};

export default Orders;
