import { getWhatsAppLink } from "../../../utils/global";
import Field from "../../ui/Field";
import Input from "../../ui/Input";
import Modal from "../../ui/Modal";
import UploadImage from "../../ui/UploadImage";
import { useState } from "react";

interface ModalDraftCustomerProps {
  open: boolean;
  onClose: () => void;
}

const DEFAULT_FORM = {
  name: "",
  address: "",
  email: "",
  phone: "",
  image: null as File | null,
  imagePreview: null as string | null,
};

const ModalDraftCustomer = (props: ModalDraftCustomerProps) => {
  const { open, onClose } = props;

  const [form, setForm] = useState(DEFAULT_FORM);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) newErrors.name = "Nama wajib diisi";
    if (!form.address.trim()) newErrors.address = "Alamat wajib diisi";
    if (!form.email.trim()) newErrors.email = "Email wajib diisi";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      newErrors.email = "Format email tidak valid";
    if (!form.phone.trim()) newErrors.phone = "No. Telepon wajib diisi";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (file: File | null, preview: string | null) => {
    setForm((prev) => ({ ...prev, image: file, imagePreview: preview }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      console.log("Submit data:", form);

      setForm(DEFAULT_FORM);
      onClose();
    }
  };

  return (
    <Modal open={open} title="Edit Customer" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="row p-3">
          <div className="col">
            <Field
              label="Name"
              value={
                <Input
                  label="Nama"
                  placeholder="Input name"
                  error={errors.name}
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              }
            />
            <Field
              label="Address"
              value={
                <Input
                  label="Alamat"
                  placeholder="Input address"
                  error={errors.address}
                  value={form.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              }
            />
            <Field
              label="Email"
              value={
                <Input
                  label="Email"
                  placeholder="Input email"
                  error={errors.email}
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              }
            />
            <Field
              label="Phone"
              value={
                <Input
                  label="No. Telepon"
                  placeholder="Input phone"
                  error={errors.phone}
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  helperText={getWhatsAppLink(form.phone)}
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
                  value={form.imagePreview}
                  onChange={handleImageChange}
                />
              }
            />
            <div className="d-flex justify-content-end mt-3">
              <button type="submit" className="btn btn-primary">
                Simpan
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalDraftCustomer;
