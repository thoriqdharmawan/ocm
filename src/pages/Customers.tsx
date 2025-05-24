import { useState } from "react";
import ThreeDotsIcon from "../components/icons/ThreeDotsIcon";
import { customersData } from "../datas/customers";
import { CustomersType } from "../models/customers";
import Table, { Column } from "../components/ui/Table";
import Dropdown from "../components/ui/Dropdown";
import ModalDetailCustomer from "../components/features/customers/ModalDetailCustomer";
import Pagination from "../components/ui/Pagination";
import ModalDraftCustomer from "../components/features/customers/ModalDraftCustomer";
import Input from "../components/ui/Input";
import useGetListCustomer from "../api/customers/useGetListCustomer";
import EmptyState from "../components/ui/EmptyState";
import ModalDeleteCustomer from "../components/features/customers/ModalDeleteCustomer";
import useDeleteCustomer from "../api/customers/useDeleteCustomer";
import CustomerCard from "../components/features/customers/CustomerCard";
import TableIcon from "../components/icons/TableIcon";
import GridIcon from "../components/icons/GridIcon";
import { cn } from "../utils/classname";

interface ModalState {
  openDetail: boolean;
  openDraft: boolean;
  openDelete: boolean;
  data: CustomersType | null;
  type: "add" | "edit" | "detail";
}

const DEFAULT_MODAL: ModalState = {
  openDetail: false,
  openDraft: false,
  openDelete: false,
  data: null,
  type: "add",
};

const LIMIT = 9;

const Customers = () => {
  const [modal, setModal] = useState<ModalState>(DEFAULT_MODAL);

  const [dumy, setDumy] = useState<CustomersType[]>(
    customersData.slice(0, LIMIT)
  );

  const [page, setPage] = useState(1);
  const [showType, setShowType] = useState<"table" | "grid">("grid");

  const [search, setSearch] = useState("");

  /**
   * returns error, for pagination purposes, I don't use data here
   */
  const { data, isPending } = useGetListCustomer({
    params: {
      offset: (page - 1) * LIMIT,
      limit: LIMIT,
    },
  });

  const { mutate } = useDeleteCustomer({
    onSuccess: (data) => {
      console.log("Customer deleted successfully", data);
    },
    onError: (error, variables) => {
      setDumy((prev) => prev.filter((c) => c.id !== variables.id));
    },
  });

  const handleOpenDetail = (data: CustomersType) => {
    setModal((prev) => ({ ...prev, openDetail: true, data, type: "detail" }));
  };

  const handleOpenDraft = (
    data: CustomersType | null,
    type: "edit" | "add"
  ) => {
    setModal((prev) => ({ ...prev, openDraft: true, data, type }));
  };

  const handleOpenDelete = (data: CustomersType) => {
    setModal((prev) => ({ ...prev, openDelete: true, data }));
  };

  const colums: Column<CustomersType>[] = [
    {
      id: "name",
      label: "Nama",
      cell: ({ data }) => data.name,
    },
    {
      id: "address",
      label: "Alamat",
      cell: ({ data }) => data.address,
    },
    {
      id: "email",
      label: "Email",
      cell: ({ data }) => data.email,
    },
    {
      id: "phone",
      label: "No. Telepon",
      cell: ({ data }) => data.phone,
      className: "text-center",
    },
    {
      id: "action",
      label: "Aksi",
      cell: ({ data }) => (
        <Dropdown
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
          label={<ThreeDotsIcon />}
        />
      ),
      className: "text-center",
    },
  ];

  // Fake search handler
  const handleSearch = (value: string) => {
    setSearch(value);
    const filtered = customersData.filter(
      (c) =>
        c.name.toLowerCase().includes(value.toLowerCase()) ||
        c.email.toLowerCase().includes(value.toLowerCase()) ||
        c.phone.toLowerCase().includes(value.toLowerCase()) ||
        c.address.toLowerCase().includes(value.toLowerCase())
    );
    setDumy(filtered.slice(0, LIMIT));
    setPage(1);
  };

  return (
    <div className="container">
      <h2 className="my-4">Customers</h2>

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <Input
          placeholder="Search Customers"
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
          Add Customer
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

      {dumy.length === 0 ? (
        <EmptyState
          title={search ? "Customer not found" : undefined}
          description={
            search ? `No customers match the keyword "${search}".` : undefined
          }
        />
      ) : showType === "table" ? (
        <Table columns={colums} data={dumy} />
      ) : (
        <div className="row">
          {dumy.map((customer) => (
            <div key={customer.id} className="col-12 col-md-6 col-lg-4 mb-3">
              <CustomerCard
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
          (search ? dumy.length : customersData.length) / LIMIT
        )}
        onPageChange={(page) => {
          setPage(page);
          // for fake pagination purposes
          if (search) {
            setDumy((prev) => prev.slice((page - 1) * LIMIT, page * LIMIT));
          } else {
            setDumy(customersData.slice((page - 1) * LIMIT, page * LIMIT));
          }
        }}
      />

      <ModalDetailCustomer
        open={modal.openDetail}
        onClose={() => setModal(DEFAULT_MODAL)}
        data={modal.data}
      />

      <ModalDraftCustomer
        open={modal.openDraft}
        type={modal.type as "add" | "edit"}
        onClose={() => setModal(DEFAULT_MODAL)}
        data={modal.data}
      />

      <ModalDeleteCustomer
        open={modal.openDelete}
        onClose={() => setModal(DEFAULT_MODAL)}
        data={modal.data}
        onDelete={(id) => mutate({ id })}
      />
    </div>
  );
};

export default Customers;
