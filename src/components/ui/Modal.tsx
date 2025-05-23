import { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
}

const Modal = (props: ModalProps) => {
  const { open, onClose, title } = props;

  const handleClose = () => {
    onClose();
  };

  if (!open) {
    return null;
  }

  return (
    <div className="modal fade show d-block">
      <div className="modal-dialog modal-dialog-centered position-relative" style={{ zIndex: 1051}}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={handleClose} />
          </div>
          <div className="modal-body">
            <p>Ini isi dari modal.</p>
          </div>
        </div>
      </div>

      {/* Overlay backdrop */}
      <div className="modal-backdrop fade show" onClick={handleClose} />
    </div>
  );
};

export default Modal;
