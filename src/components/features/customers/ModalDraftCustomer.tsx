import { getWhatsAppLink } from "../../../utils/global";
import Field from "../../ui/Field";
import Input from "../../ui/Input";
import Modal from "../../ui/Modal";

interface ModalDraftCustomerProps {
  open: boolean;
  onClose: () => void;
}

const ModalDraftCustomer = (props: ModalDraftCustomerProps) => {
  const { open, onClose } = props;

  return (
    <Modal open={open} title="Edit Customer" onClose={onClose}>
      <div className="row p-3">
        <div className="col">
          <Field
            label="Name"
            value={
              <Input label="Nama" placeholder="eg: Thoriq Dharmawan" error="" />
            }
          />

          <Field
            label="Address"
            value={
              <Input label="Alamat" placeholder="eg: Jl. Raya No. 1" error="" />
            }
          />

          <Field
            label="Email"
            value={
              <Input label="Email" placeholder="eg:thoriq@email.com" error="" />
            }
          />
          <Field
            label="Phone"
            value={
              <Input
                label="No. Telepon"
                placeholder="eg: 08123456789"
                error=""
                helperText={getWhatsAppLink("08123456789")}
              />
            }
          />
        </div>
        <div className="col">

        </div>
      </div>
    </Modal>
  );
};

export default ModalDraftCustomer;
