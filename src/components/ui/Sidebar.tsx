import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "../../utils/classname";
import Image from "./Image";
import { removeCredentials } from "../../utils/global";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/customers", label: "Customers" },
    { to: "/orders", label: "Orders" },
  ];

  const handleLogout = () => {
    removeCredentials();
    navigate("/login");
  };

  return (
    <nav
      className="bg-white p-3 vh-100 custom-shadow d-flex flex-column justify-content-between"
      style={{ minWidth: "250px" }}
    >
      <div>
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
                    isActive && "bg-primary text-white"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <div
          className="rounded-4 p-3 mb-2"
          style={{ backgroundColor: "#f9fafb" }}
        >
          <div className="d-flex align-items-center gap-3">
            <Image
              width={50}
              height={50}
              src="/users/user2.jpeg"
              alt="Amy"
              className="rounded-circle overflow-hidden"
            />
            <div>
              <h5 className="fs-6 fw-normal mb-1">Amy Rach</h5>
              <p className="fs-7 fw-lighter m-0">Admin</p>
            </div>
          </div>
        </div>
        <button onClick={handleLogout} className="btn w-100 text-danger">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
