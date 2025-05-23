import { ReactNode } from "react";

interface Props {
  label: string;
  value: string | ReactNode;
}

const Field = ({ label, value }: Props) => {
  return (
    <div className="mb-3">
      <label className="fs-7 text-secondary fw-light">{label}</label>
      <div className="m-0">{value}</div>
    </div>
  );
};

export default Field;
