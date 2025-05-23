import { useState } from "react";
import ThreeDotsIcon from "../components/icons/ThreeDotsIcon";
import { customersData } from "../datas/customers";
import { CustomersType } from "../models/customers";
import Table, { Column } from "../components/ui/Table";
import Dropdown from "../components/ui/Dropdown";
import ModalDetailCustomer from "../components/features/customers/ModalDetailCustomer";
import Pagination from "../components/ui/Pagination";

interface ModalState {
  open: boolean;
  data: CustomersType | null;
}

const DEFAULT_MODAL: ModalState = {
  open: false,
  data: null,
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
              action: () => setModal((prev) => ({ ...prev, open: true, data })),
            },
            { label: "Edit", action: () => {} },
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

      <Table columns={colums} data={customersData.slice(0, 10)} />

      <Pagination
        currentPage={page}
        totalPages={2}
        onPageChange={(page) => setPage(page)}
        className="my-4"
      />

      <ModalDetailCustomer
        open={modal.open}
        onClose={() => setModal((prev) => ({ ...prev, open: false }))}
        data={modal.data}
      />
    </div>
  );
};

export default Customers;
