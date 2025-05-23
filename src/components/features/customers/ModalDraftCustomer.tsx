import { getWhatsAppLink } from "../../../utils/global";
import Field from "../../ui/Field";
import Input from "../../ui/Input";
import Modal from "../../ui/Modal";
import UploadImage from "../../ui/UploadImage";

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
            value={<Input label="Nama" placeholder="Input name" error="" />}
          />

          <Field
            label="Address"
            value={
              <Input label="Alamat" placeholder="Input address" error="" />
            }
          />

          <Field
            label="Email"
            value={<Input label="Email" placeholder="Input email" error="" />}
          />
          <Field
            label="Phone"
            value={
              <Input
                label="No. Telepon"
                placeholder="08123456789"
                error=""
                helperText={getWhatsAppLink("08123456789")}
              />
            }
          />
        </div>
        <div className="col">
          <Field
            label=""
            value={
              <UploadImage
                previewSize={280}
                // value={imageUrl}
                onChange={(file, preview) => {
                  console.log({ file, preview });
                }}
              />
            }
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalDraftCustomer;
