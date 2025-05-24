import Sidebar from "./Sidebar";

const Topbar = () => {
  return (
    <>
      <div className="navbar custom-shadow d-lg-none">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebarOffcanvas"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <span className="navbar-brand">Dashboard</span>
        </div>
      </div>

      <div
        className="offcanvas offcanvas-start d-lg-none"
        id="sidebarOffcanvas"
      >
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <Sidebar withShadow={false} />
      </div>
    </>
  );
};

export default Topbar;
