import { ReactNode } from "react";
import { CustomersType } from "../../../models/customers";
import { getWhatsAppLink } from "../../../utils/global";
import Modal from "../../ui/Modal";

interface ModalDetailCustomerProps {
  open: boolean;
  onClose: () => void;
  data: CustomersType | null;
}

const Field = ({
  label,
  value,
}: {
  label: string;
  value: string | ReactNode;
}) => {
  return (
    <div className="mb-3">
      <label className="fs-7 text-secondary fw-light">{label}</label>
      <p className="m-0">{value}</p>
    </div>
  );
};

const ModalDetailCustomer = (props: ModalDetailCustomerProps) => {
  const { open, onClose, data } = props;

  return (
    <Modal open={open} title="Detail Customer" onClose={onClose}>
      <div>
        <Field label="Nama" value={data?.name || ""} />
        <Field label="Alamat" value={data?.address || ""} />
        <Field label="Email" value={data?.email || ""} />
        <Field
          label="No. Telepon"
          value={
            <div className="mt-2">
              <a
                href={getWhatsAppLink(data?.phone || "")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-dark border px-3 py-1 rounded-2"
              >
                {data?.phone || ""}
              </a>
            </div>
          }
        />
      </div>
    </Modal>
  );
};

export default ModalDetailCustomer;
