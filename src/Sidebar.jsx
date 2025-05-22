import { Link } from 'react-router-dom';

const Sidebar = () => (
  <nav
    className="d-flex flex-md-column flex-row flex-shrink-0 p-3 bg-light align-items-center align-items-md-start"
    style={{ width: '100%', maxWidth: 220, minHeight: '60px' }}
  >
    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
      <span className="fs-4">Dashboard</span>
    </a>
    <hr className="d-none d-md-block" style={{ width: '100%' }} />
    <ul className="nav nav-pills flex-md-column flex-row mb-auto w-100 justify-content-center justify-content-md-start">
      <li className="nav-item">
        <Link to="/" className="nav-link link-dark">Home</Link>
      </li>
      <li>
        <Link to="/customers" className="nav-link link-dark">Customers</Link>
      </li>
      <li>
        <Link to="/orders" className="nav-link link-dark">Orders</Link>
      </li>
    </ul>
  </nav>
);

export default Sidebar;
