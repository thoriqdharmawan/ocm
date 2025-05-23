import { OrdersType } from "../../../models/orders";
import Modal from "../../ui/Modal";
import { useState } from "react";

interface ModalDeleteOrderProps {
  open: boolean;
  onClose: () => void;
  data: OrdersType | null;
  onDelete: (id: number) => void;
}

const ModalDeleteOrder = (props: ModalDeleteOrderProps) => {
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
    <Modal size="md" open={open} title="Delete Order" onClose={onClose}>
      <div className="p-4">
        <h5>Are you sure you want to delete the following order?</h5>

        <div className="my-3">
          <strong>Order #{data?.orderNumber}</strong>
          <div className="text-secondary small">
            Customer: {data?.customerName}
          </div>
          <div className="text-secondary small">
            Total: Rp {data?.totalAmount?.toLocaleString()}
          </div>
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

export default ModalDeleteOrder;
