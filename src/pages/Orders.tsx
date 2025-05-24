import { useState } from "react";
import Table, { Column } from "../components/ui/Table";
import { ordersData } from "../datas/orders";
import { OrdersType } from "../models/orders";
import { formatDate } from "../utils/global";
import Input from "../components/ui/Input";
import Pagination from "../components/ui/Pagination";
import Dropdown from "../components/ui/Dropdown";
import useGetListOrder from "../api/orders/useGetListOrder";
import useDeleteOrder from "../api/orders/useDeleteOrder";
import EmptyState from "../components/ui/EmptyState";
import ModalDeleteOrder from "../components/features/orders/ModalDeleteOrder";
import ModalDetailOrder from "../components/features/orders/ModalDetailOrder";
import ModalDraftOrder from "../components/features/orders/ModalDraftOrder";
import StatusBadge from "../components/ui/StatusBadge";
import OrderCard from "../components/features/orders/OrderCard";
import TableIcon from "../components/icons/TableIcon";
import { cn } from "../utils/classname";
import GridIcon from "../components/icons/GridIcon";

const LIMIT = 9;

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
  const [showType, setShowType] = useState<"table" | "grid">("grid");
  const [modal, setModal] = useState<ModalState>(DEFAULT_MODAL);

  // fake get list orders
  const { data, isPending } = useGetListOrder({
    params: {
      offset: (page - 1) * LIMIT,
      limit: LIMIT,
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
      cell: ({ data }) => <StatusBadge status={data?.status || "pending"} />,
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
          label="..."
          items={[
            {
              label: "Detail",
              action: () => handleOpenDetail(data),
            },
            {
              label: "Edit",
              action: () => handleOpenDraft(data, "edit"),
            },
            {
              label: "Delete",
              action: () => handleOpenDelete(data),
            },
          ]}
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

  const handleOpenDetail = (data: OrdersType) => {
    setModal((prev) => ({ ...prev, openDetail: true, data, type: "detail" }));
  };

  const handleOpenDraft = (data: OrdersType | null, type: "edit" | "add") => {
    setModal((prev) => ({ ...prev, openDraft: true, data, type }));
  };

  const handleOpenDelete = (data: OrdersType) => {
    setModal((prev) => ({ ...prev, openDelete: true, data }));
  };

  return (
    <div className="container">
      <h2 className="my-4">Orders</h2>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <Input
          placeholder="Search Order Number"
          wrapperClassName="w-50"
          style={{ minWidth: 200 }}
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button
          onClick={() => handleOpenDraft(null, "add")}
          type="button"
          className="btn btn-primary"
        >
          Add Order
        </button>
      </div>

      <div className="d-flex justify-content-end mb-3 gap-1">
        <button
          onClick={() => setShowType("table")}
          className={cn(
            "btn btn-outline-primary me-2 d-flex align-items-center p-2",
            {
              "btn-primary": showType === "table",
            }
          )}
        >
          <TableIcon className={cn(showType === "table" ? "text-white" : "")} />
        </button>
        <button
          onClick={() => setShowType("grid")}
          className={cn(
            "btn btn-outline-primary me-2 d-flex align-items-center p-2",
            {
              "btn-primary": showType === "grid",
            }
          )}
        >
          <GridIcon className={cn(showType === "grid" ? "text-white" : "")} />
        </button>
      </div>

      {orders.length === 0 ? (
        <EmptyState
          title={search ? "Order not found" : undefined}
          description={
            search ? `No orders match the keyword "${search}".` : undefined
          }
        />
      ) : showType === "table" ? (
        <Table columns={columns} data={orders} />
      ) : (
        <div className="row">
          {orders.map((customer) => (
            <div key={customer.id} className="col-12 col-md-6 col-lg-4 mb-3">
              <OrderCard
                data={customer}
                onClickDetail={() => handleOpenDetail(customer)}
                onClickDelete={() => handleOpenDelete(customer)}
                onClickEdit={() => handleOpenDraft(customer, "edit")}
              />
            </div>
          ))}
        </div>
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

      <ModalDraftOrder
        open={modal.openDraft}
        type={modal.type as "add" | "edit"}
        onClose={() => setModal(DEFAULT_MODAL)}
        data={modal.data}
      />
    </div>
  );
};

export default Orders;
