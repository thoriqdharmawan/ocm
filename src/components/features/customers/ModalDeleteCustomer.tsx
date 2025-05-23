import { CustomersType } from "../../../models/customers";
import Modal from "../../ui/Modal";
import { useState } from "react";

interface ModalDeleteCustomerProps {
  open: boolean;
  onClose: () => void;
  data: CustomersType | null;
  onDelete: (id: number) => void;
}

const ModalDeleteCustomer = (props: ModalDeleteCustomerProps) => {
  const { open, onClose, data, onDelete } = props;
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      if (data) {
        await onDelete(data.id);
      }
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal size="md" open={open} title="Delete Customer" onClose={onClose}>
      <div className="p-4">
        <h5>Are you sure you want to delete the following customer?</h5>
        <div className="ml-4">
          <strong>{data?.name}</strong>
          <div className="text-secondary small">{data?.email}</div>
          <div className="text-secondary small">{data?.phone}</div>
        </div>
        <div className="d-flex justify-content-end gap-2 mt-4">
          <button className="btn" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeleteCustomer;
