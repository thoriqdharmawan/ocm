import { ReactNode } from "react";
import { cn } from "../../utils/classname";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const Modal = (props: ModalProps) => {
  const { open, onClose, title, children, size = "lg" } = props;

  const handleClose = () => {
    onClose();
  };

  if (!open) {
    return null;
  }

  const modalSize = {
    sm: "modal-sm",
    md: "modal-md",
    lg: "modal-lg",
    xl: "modal-xl",
  };

  return (
    <div className="modal fade show d-block">
      <div
        className={cn(
          "modal-dialog modal-dialog-centered position-relative",
          modalSize[size]
        )}
        style={{ zIndex: 1051 }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={handleClose} />
          </div>
          <div className="modal-body p-0 overflow-hidden rounded">
            {children}
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show" onClick={handleClose} />
    </div>
  );
};

export default Modal;
