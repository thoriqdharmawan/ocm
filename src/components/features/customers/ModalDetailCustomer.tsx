import { CustomersType } from "../../../models/customers";
import { getWhatsAppLink } from "../../../utils/global";
import Modal from "../../ui/Modal";
import WhartsAppIcon from "../../icons/WhatsAppIcon";
import Barcode from "react-barcode";
import { useDownloadImage } from "../../../hooks/useDownloadImage";
import Field from "../../ui/Field";

interface ModalDetailCustomerProps {
  open: boolean;
  onClose: () => void;
  data: CustomersType | null;
}

const ModalDetailCustomer = (props: ModalDetailCustomerProps) => {
  const { open, onClose, data } = props;

  const { elementRef, downloadImage } = useDownloadImage({
    width: 798,
    height: 306,
    multiplier: 1.5,
    removeElement: "#button-download-customer",
  });

  return (
    <Modal open={open} title="Detail Customer" onClose={onClose}>
      <div ref={elementRef} id="detail-customer" className="bg-white p-3">
        <div className="row">
          <div className="col">
            <div className="row">
              <div className="col">
                <Field label="Nama" value={data?.name || ""} />
                <Field label="Alamat" value={data?.address || ""} />
              </div>
              <div className="col">
                <Field label="Email" value={data?.email || ""} />
                <Field
                  label="No. Telepon"
                  value={
                    <div className="mt-1">
                      <a
                        href={getWhatsAppLink(data?.phone || "")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-decoration-none text-dark border px-3 py-1 rounded-2 d-flex align-items-center gap-2 w-fit"
                      >
                        <WhartsAppIcon className="text-success" />{" "}
                        <span>{data?.phone || ""}</span>
                      </a>
                    </div>
                  }
                />
              </div>
              <Field
                label="Customer ID"
                value={
                  <Barcode
                    value={`${data?.code}`}
                    height={24}
                    displayValue={false}
                  />
                }
              />
              <div className="d-flex justify-content-start">
                <button
                  onClick={() => downloadImage(`${data?.code} - ${data?.name}`)}
                  className="btn btn-sm btn-outline-primary"
                  type="button"
                  id="button-download-customer"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
          <div className="col d-flex flex-column justify-content-start align-items-center">
            <img
              src={data?.image}
              className="img-fluid img-thumbnail rounded-3 p-0"
              alt={data?.name}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDetailCustomer;
