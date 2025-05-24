import { ReactNode } from "react";
import { OrdersType } from "../../../models/orders";
import { formatDate } from "../../../utils/global";
import CardItem, { CardActions } from "../../icons/CardItem";
import StatusBadge from "../../ui/StatusBadge";

interface CustomerCardProps extends CardActions {
  data: OrdersType;
}

const Field = ({
  label,
  value,
}: {
  label: string;
  value: string | number | ReactNode;
}) => {
  return (
    <div className="text-muted d-flex flex-column fs-7 m-0 mb-2">
      <span className="fw-semibold">{label}</span>
      <span className="fw-light">{value}</span>
    </div>
  );
};

const OrderCard = (props: CustomerCardProps) => {
  const { data, onClickDelete, onClickDetail, onClickEdit } = props;
  const { orderNumber, orderDate, status, totalAmount, trackingNumber } = data;

  return (
    <CardItem
      onClickDelete={onClickDelete}
      onClickDetail={onClickDetail}
      onClickEdit={onClickEdit}
    >
      <div className="flex flex-col gap-4">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div className="d-flex flex-column justify-content-between mb-2">
            <h5 className="fs-5 fw-bold m-0">{orderNumber}</h5>
            <p className="text-muted fs-7">{formatDate(orderDate)}</p>
          </div>
          <StatusBadge status={status || "pending"} />
        </div>

        <div>
          <Field label="Total Amount" value={totalAmount} />
          <Field label="Tracking Number" value={trackingNumber} />
        </div>
      </div>
    </CardItem>
  );
};

export default OrderCard;
