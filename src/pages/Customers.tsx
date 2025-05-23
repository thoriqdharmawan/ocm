import { useState } from "react";
import ThreeDotsIcon from "../components/icons/ThreeDotsIcon";
import { customersData } from "../datas/customers";
import { CustomersType } from "../models/customers";
import Table, { Column } from "../components/ui/Table";
import Modal from "../components/ui/Modal";
import Dropdown from "../components/ui/Dropdown";

const DEFAULT_MODAL = {
  open: false,
  data: null,
};

const Customers = () => {
  const [modal, setModal] = useState(DEFAULT_MODAL);

  const dropdownItems = [
    {
      label: (
        <div onClick={() => setModal((prev) => ({ ...prev, open: true }))}>
          Detail
        </div>
      ),
      action: () => {},
    },
    { label: "Edit", action: () => {} },
    { label: "Hapus", action: () => {} },
  ];

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
      cell: () => <Dropdown items={dropdownItems} label={<ThreeDotsIcon />} />,
      className: "text-center",
    },
  ];

  return (
    <div className="container">
      <h2 className="my-4">Customers Page</h2>

      <Table columns={colums} data={customersData} />

      <Modal
        open={modal.open}
        title="Detail Customer"
        onClose={() => setModal((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
};

export default Customers;
