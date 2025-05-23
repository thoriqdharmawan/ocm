import { Link, useLocation } from "react-router-dom";
import { cn } from "../../utils/classname";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/customers", label: "Customers" },
    { to: "/orders", label: "Orders" },
  ];

  return (
    <nav
      className="bg-white p-3 vh-100 custom-shadow"
      style={{ minWidth: "250px" }}
    >
      <h4 className="mb-4">Dashboard</h4>

      <ul className="nav flex-column">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <li className="nav-item mb-2" key={item.to}>
              <Link
                to={item.to}
                className={cn(
                  "nav-link text-black rounded-4",
                  isActive && "bg-primary text-white",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;
