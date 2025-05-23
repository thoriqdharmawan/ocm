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

interface ModalState {
  openDetail: boolean;
  openDraft: boolean;
  data: CustomersType | null;
  type: "add" | "edit" | "detail";
}

const DEFAULT_MODAL: ModalState = {
  openDetail: false,
  openDraft: false,
  data: null,
  type: "add",
};

const Customers = () => {
  const [modal, setModal] = useState<ModalState>(DEFAULT_MODAL);

  const [page, setPage] = useState(1);

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
              action: () =>
                setModal((prev) => ({
                  ...prev,
                  openDetail: true,
                  data,
                  type: "detail",
                })),
            },
            {
              label: "Edit",
              action: () =>
                setModal((prev) => ({
                  ...prev,
                  openDraft: true,
                  data,
                  type: "edit",
                })),
            },
            { label: "Hapus", action: () => {} },
          ]}
          label={<ThreeDotsIcon />}
        />
      ),
      className: "text-center",
    },
  ];

  return (
    <div className="container">
      <h2 className="my-4">Customers Page</h2>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <Input placeholder="Search Customers" wrapperClassName="w-50" />
        <button
          onClick={() =>
            setModal((prev) => ({ ...prev, openDraft: true, type: "add" }))
          }
          type="button"
          className="btn btn-primary"
        >
          Add Customer
        </button>
      </div>

      <Table columns={colums} data={customersData.slice(0, 10)} />

      <Pagination
        currentPage={page}
        totalPages={2}
        onPageChange={(page) => setPage(page)}
        className="my-4"
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
    </div>
  );
};

export default Customers;
