import Modal from "../../ui/Modal";
import Field from "../../ui/Field";
import { OrdersType } from "../../../models/orders";
import { formatDate } from "../../../utils/global";
import StatusBadge from "../../ui/StatusBadge";
import Barcode from "react-barcode";
import { useDownloadImage } from "../../../hooks/useDownloadImage";

interface ModalDetailCustomerProps {
  open: boolean;
  onClose: () => void;
  data: OrdersType | null;
}

const ModalDetailOrder = (props: ModalDetailCustomerProps) => {
  const { open, onClose, data } = props;

  const { elementRef, downloadImage } = useDownloadImage({
    width: 798,
    height: 372,
  });

  return (
    <Modal open={open} title="Detail Order" onClose={onClose}>
      <div ref={elementRef} id="detail-order" className="bg-white p-3">
        <div className="row">
          <div className="col">
            <Field label="Order Number" value={data?.orderNumber || ""} />
            <Field
              label="Order Date"
              value={formatDate(data?.orderDate || "")}
            />
            <Field label="Customer Name" value={data?.customerName || ""} />
            <Field
              label="Shipping Address"
              value={data?.shippingAddress || ""}
            />
            <Field
              label="Status"
              value={
                <StatusBadge
                  status={data?.status || "pending"}
                  className="mt-2"
                />
              }
            />
          </div>
          <div className="col">
            <Field
              label="Total Amount"
              value={`Rp ${data?.totalAmount.toLocaleString()}` || ""}
            />
            <Field label="Payment Method" value={data?.paymentMethod || ""} />
            <Field label="Courier" value={data?.courier || ""} />
            <Field label="Tracking Number" value={data?.trackingNumber || ""} />
            <Field
              label="Tracking Number Code"
              value={
                <Barcode
                  value={data?.trackingNumber || ""}
                  height={24}
                  displayValue={false}
                />
              }
            />
          </div>
        </div>
      </div>

      <div className="d-flex p-3 justify-content-start">
        <button
          onClick={() =>
            downloadImage(`${data?.trackingNumber} - ${data?.customerName}`)
          }
          className="btn btn-sm btn-outline-primary"
          type="button"
          id="button-download-customer"
        >
          Download as Image
        </button>
      </div>
    </Modal>
  );
};

export default ModalDetailOrder;
