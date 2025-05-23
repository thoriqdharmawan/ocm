import React from "react";
import { cn } from "../../utils/classname";
import { OrdersType } from "../../models/orders";

type Status = OrdersType["status"];

const statusMap: Record<Status, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-secondary text-white" },
  processing: { label: "Processing", className: "bg-info text-white" },
  shipped: { label: "Shipped", className: "bg-warning text-dark" },
  delivered: { label: "Delivered", className: "bg-success text-white" },
  cancelled: { label: "Cancelled", className: "bg-danger text-white" },
};

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className = "",
}) => {
  const statusInfo = statusMap[status] || {
    label: status,
    className: "bg-light text-dark",
  };
  return (
    <span
      className={cn(
        "badge px-3 py-2 rounded-pill fw-light fw-6",
        statusInfo.className,
        className
      )}
    >
      {statusInfo.label}
    </span>
  );
};

export default StatusBadge;
