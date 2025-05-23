import Sidebar from "./Sidebar";

const Topbar = () => {
  return (
    <>
      <div className="navbar navbar-dark bg-dark d-md-none">
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
        className="offcanvas offcanvas-start d-md-none"
        id="sidebarOffcanvas"
      >
        <div className="offcanvas-header bg-dark" data-bs-theme="dark">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body bg-dark">
          <Sidebar />
        </div>
      </div>
    </>
  );
};

export default Topbar;
