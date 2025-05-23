import { useEffect, useState } from "react";
import Modal from "../../ui/Modal";
import Field from "../../ui/Field";
import Input from "../../ui/Input";
import { OrdersType } from "../../../models/orders";
import { PaymentMethod, Courier } from "../../../models/orders";
import useAddOrder from "../../../api/orders/useAddOrder";
import useUpdateOrder from "../../../api/orders/useUpdateOrder";

interface ModalDraftOrderProps {
  open: boolean;
  onClose: () => void;
  data: OrdersType | null;
  type: "add" | "edit";
}

const DEFAULT_FORM = {
  orderNumber: "",
  orderDate: "",
  status: "pending" as OrdersType["status"],
  totalAmount: 0,
  paymentMethod: "Transfer Bank BCA" as PaymentMethod,
  customerName: "",
  shippingAddress: "",
  courier: "JNE" as Courier,
  trackingNumber: "",
};

const ModalDraftOrder = (props: ModalDraftOrderProps) => {
  const { open, onClose, data, type } = props;
  const [form, setForm] = useState({ ...DEFAULT_FORM });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (open && data) {
      setForm({ ...data });
    } else if (open) {
      setForm({ ...DEFAULT_FORM });
    }
  }, [open, data]);

  const { mutate: mutateAdd, isPending: isPendingAdd } = useAddOrder({
    onSuccess: () => {
      setForm(DEFAULT_FORM);
      onClose();
    },
    onError: () => {
      setForm(DEFAULT_FORM);
      onClose();
    },
  });

  const { mutate: mutateUpdate, isPending: isPendingUpdate } = useUpdateOrder({
    onSuccess: () => {
      setForm(DEFAULT_FORM);
      onClose();
    },
    onError: () => {
      setForm(DEFAULT_FORM);
      onClose();
    },
  });

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.orderDate.trim()) newErrors.orderDate = "Order date is required";
    if (!form.customerName.trim())
      newErrors.customerName = "Customer name is required";
    if (!form.status) newErrors.status = "Status is required";
    if (!form.paymentMethod.trim())
      newErrors.paymentMethod = "Payment method is required";
    if (!form.shippingAddress.trim())
      newErrors.shippingAddress = "Shipping address is required";
    if (!form.courier.trim()) newErrors.courier = "Courier is required";
    if (!form.totalAmount || isNaN(form.totalAmount))
      newErrors.totalAmount = "Total amount is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    setForm(DEFAULT_FORM);
    setErrors({});
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      if (type === "add") {
        mutateAdd({ body: { ...form, paymentMethod: form.paymentMethod as PaymentMethod, courier: form.courier as Courier } });
      } else if (type === "edit" && data) {
        mutateUpdate({ id: data.id, body: { ...form, paymentMethod: form.paymentMethod as PaymentMethod, courier: form.courier as Courier } });
      }
    }
  };

  const isDisabled = isPendingAdd || isPendingUpdate;

  return (
    <Modal
      open={open}
      title={type === "add" ? "Add Order" : "Edit Order"}
      onClose={handleClose}
    >
      <form onSubmit={handleSubmit}>
        <div className="row p-3">
          <div className="col">
            <Field
              label="Order Number"
              value={
                <Input
                  disabled
                  placeholder={
                    type === "add" ? "Auto-generated" : "Order Number"
                  }
                  value={form.orderNumber}
                />
              }
            />
            <Field
              label="Order Date"
              value={
                <Input
                  type="date"
                  placeholder="Order Date"
                  error={errors.orderDate}
                  value={form.orderDate}
                  onChange={(e) => handleChange("orderDate", e.target.value)}
                />
              }
            />
            <Field
              label="Status"
              value={
                <select
                  className={`form-select${errors.status ? " is-invalid" : ""}`}
                  value={form.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              }
            />
            <Field
              label="Total Amount"
              value={
                <Input
                  type="number"
                  placeholder="Total Amount"
                  error={errors.totalAmount}
                  value={form.totalAmount}
                  onChange={(e) =>
                    handleChange("totalAmount", Number(e.target.value))
                  }
                />
              }
            />
          </div>
          <div className="col">
            <Field
              label="Payment Method"
              value={
                <select
                  className={`form-select${
                    errors.paymentMethod ? " is-invalid" : ""
                  }`}
                  value={form.paymentMethod}
                  onChange={(e) =>
                    handleChange("paymentMethod", e.target.value as PaymentMethod)
                  }
                >
                  <option value="">Select Payment Method</option>
                  <option value="Transfer Bank BCA">Transfer Bank BCA</option>
                  <option value="COD">COD</option>
                  <option value="OVO">OVO</option>
                  <option value="GoPay">GoPay</option>
                  <option value="Transfer Bank Mandiri">Transfer Bank Mandiri</option>
                </select>
              }
            />
            <Field
              label="Customer Name"
              value={
                <Input
                  placeholder="Customer Name"
                  error={errors.customerName}
                  value={form.customerName}
                  onChange={(e) => handleChange("customerName", e.target.value)}
                />
              }
            />
            <Field
              label="Shipping Address"
              value={
                <Input
                  placeholder="Shipping Address"
                  error={errors.shippingAddress}
                  value={form.shippingAddress}
                  onChange={(e) =>
                    handleChange("shippingAddress", e.target.value)
                  }
                />
              }
            />
            <Field
              label="Courier"
              value={
                <select
                  className={`form-select${errors.courier ? " is-invalid" : ""}`}
                  value={form.courier}
                  onChange={(e) => handleChange("courier", e.target.value as Courier)}
                >
                  <option value="">Select Courier</option>
                  <option value="JNE">JNE</option>
                  <option value="SiCepat">SiCepat</option>
                  <option value="J&T Express">J&T Express</option>
                  <option value="Pos Indonesia">Pos Indonesia</option>
                  <option value="AnterAja">AnterAja</option>
                </select>
              }
            />
            <div className="d-flex justify-content-end mt-3">
              <button
                // disabled={isDisabled}
                type="submit"
                className="btn btn-primary"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalDraftOrder;
