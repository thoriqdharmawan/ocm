import { CustomersType } from "../../../models/customers";
import CardItem, { CardActions } from "../../icons/CardItem";

interface CustomerCardProps extends CardActions {
  data: CustomersType;
}

const Field = ({ label, value }: { label: string; value: string | number }) => {
  return (
    <div className="text-muted d-flex flex-column fs-7 m-0 mb-2">
      <span className="fw-semibold">{label}</span>
      <span className="fw-light">{value}</span>
    </div>
  );
};

const CustomerCard = (props: CustomerCardProps) => {
  const { data, onClickDelete, onClickDetail, onClickEdit } = props;
  const { name, email, address, phone } = data;

  return (
    <CardItem
      onClickDelete={onClickDelete}
      onClickDetail={onClickDetail}
      onClickEdit={onClickEdit}
    >
      <div className="flex flex-col gap-4">
        <div className="d-flex flex-column justify-content-between mb-2">
          <h5 className="fs-6 fw-bold m-0">{name}</h5>
          <p className="text-muted fs-7">{email}</p>
        </div>

        <div>
          <Field label="Phone" value={phone} />
          <Field label="Address" value={address} />
        </div>
      </div>
    </CardItem>
  );
};

export default CustomerCard;
