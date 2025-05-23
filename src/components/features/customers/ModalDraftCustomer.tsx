import useAddCustomer from "../../../api/customers/useAddCustomer";
import useUpdateCustomer from "../../../api/customers/useUpdateCustomer";
import { CustomersType } from "../../../models/customers";
import { getWhatsAppLink } from "../../../utils/global";
import Field from "../../ui/Field";
import Input from "../../ui/Input";
import Modal from "../../ui/Modal";
import UploadImage from "../../ui/UploadImage";
import { useEffect, useState } from "react";

interface ModalDraftCustomerProps {
  open: boolean;
  onClose: () => void;
  data: CustomersType | null;
  type: "add" | "edit";
}

const DEFAULT_FORM = {
  name: "",
  address: "",
  email: "",
  phone: "",
  imagePreview: null as string | null,
};

const ModalDraftCustomer = (props: ModalDraftCustomerProps) => {
  const { open, onClose, data, type } = props;

  const [form, setForm] = useState(DEFAULT_FORM);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [hasUpdateImage, setHasUpdateImage] = useState(false);

  useEffect(() => {
    if (open && data) {
      setForm({
        name: data.name,
        address: data.address,
        email: data.email,
        phone: data.phone,
        imagePreview: data.image,
      });
    }
  }, [open]);

  const { mutate: mutateAdd, isPending: isPendingAdd } = useAddCustomer({
    onSuccess: (data) => {
      console.log("Customer added successfully", data);
      setForm(DEFAULT_FORM);
      onClose();
    },
    onError: (error) => {
      console.error("Error adding customer", error);
      setForm(DEFAULT_FORM);
      onClose();
    },
  });

  const { mutate: mutateUpdate, isPending: isPendingUpdate } =
    useUpdateCustomer({
      onSuccess: (data) => {
        console.log("Customer updated successfully", data);
        setForm(DEFAULT_FORM);
        onClose();
      },
      onError: (error) => {
        console.error("Error updating customer", error);
        setForm(DEFAULT_FORM);
        onClose();
      },
    });

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

  const handleRemoveImage = () => {
    setHasUpdateImage(true);
    setForm((prev) => ({ ...prev, imagePreview: null }));
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
        mutateAdd({
          body: {
            name: form.name,
            address: form.address,
            email: form.email,
            phone: form.phone,
            ...(form.imagePreview && { image: form.imagePreview }),
          },
        });
      } else if (type === "edit") {
        if (!data) return;

        mutateUpdate({
          id: data?.id,
          body: {
            name: form.name,
            address: form.address,
            email: form.email,
            phone: form.phone,
            ...(hasUpdateImage && { image: form.imagePreview || "" }),
          },
        });
      }
    }
  };

  const isDisabled = isPendingUpdate || isPendingAdd;

  return (
    <Modal open={open} title="Edit Customer" onClose={handleClose}>
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
                form?.imagePreview ? (
                  <div className="col d-flex flex-column justify-content-start align-items-center">
                    <img
                      src={form?.imagePreview}
                      className="img-fluid img-thumbnail rounded-3 p-0"
                      alt=""
                    />
                    <button
                      onClick={handleRemoveImage}
                      className="btn btn-outline-danger btn-sm mt-2"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <UploadImage
                    previewSize={280}
                    value={form.imagePreview}
                    onChange={handleImageChange}
                  />
                )
              }
            />
            <div className="d-flex justify-content-end mt-3">
              <button
                disabled={isDisabled}
                type="submit"
                className="btn btn-primary"
              >
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
