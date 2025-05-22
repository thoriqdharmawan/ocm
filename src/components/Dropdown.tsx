import { ReactNode } from "react";

interface DropdownItem {
  label: string;
  action: () => void;
}

interface DropdownProps {
  items: DropdownItem[];
  label: string | ReactNode;
}

const Dropdown = (props: DropdownProps) => {
  const { items, label } = props;

  return (
    <div className="dropdown">
      <button
        className="btn dropdown-toggle no-caret"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
       {label}
      </button>
      <ul className="dropdown-menu">
        {items.map((item, index) => (
          <li key={index}>
            <button className="dropdown-item" onClick={item.action}>
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
