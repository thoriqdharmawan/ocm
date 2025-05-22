import Table, { Column } from "../components/Table";
import { customersData } from "../datas/customers";
import { Customer } from "../models/customers";

const colums: Column<Customer>[] = [
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
  },
  {
    id: "action",
    label: "Aksi",
    cell: () => <button className="btn btn-primary">Detail</button>,
  },
];

const Customers = () => {
  return (
    <div className="container">
      <h2 className="my-4">Customers Page</h2>

      <Table columns={colums} data={customersData} />
    </div>
  );
};

export default Customers;
