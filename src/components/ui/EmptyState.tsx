import React from "react";
import { cn } from "../../utils/classname";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No Data Found",
  description = "There is no data to display.",
  icon,
  className = "",
  children,
}) => {
  return (
    <div className={cn("d-flex flex-column align-items-center justify-content-center py-5 text-center text-secondary", className)}>
      {icon && <div className="mb-3" style={{ fontSize: 48 }}>{icon}</div>}
      <h5 className="mb-2">{title}</h5>
      <div className="mb-3 fs-7">{description}</div>
      {children}
    </div>
  );
};

export default EmptyState;
