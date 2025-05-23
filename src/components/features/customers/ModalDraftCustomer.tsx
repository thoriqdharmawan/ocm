import Modal from "../../ui/Modal";

interface ModalDraftCustomerProps {
  open: boolean;
  onClose: () => void;
}

const ModalDraftCustomer = (props: ModalDraftCustomerProps) => {
  const { open, onClose } = props;

  return (
    <Modal open={open} title="Edit Customer" onClose={onClose}>
      <h2>edit customer</h2>
    </Modal>
  );
};

export default ModalDraftCustomer;
