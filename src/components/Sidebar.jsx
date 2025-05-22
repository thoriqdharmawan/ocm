import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav
      className="bg-white p-3 vh-100 border-end"
      style={{ minWidth: "250px" }}
    >
      <h4 className="mb-4">Dashboard</h4>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/customers" className="nav-link">
            Customers
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/orders" className="nav-link">
            Orders
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;

