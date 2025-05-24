const Home = () => {
  return (
    <div className="d-flex flex-column min-vh-100 w-100">
      <nav className="container navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Features
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="p-3 w-100">
        <div className="container text-center">
          <div className="row">
            <div className="col text-start">
              <div className="py-6">
                <h1 className="fs-header fw-bold mb-4">
                  <span className="bg-primary-subtle text-primary">
                    Simplify Your
                  </span>{" "}
                  Customer and Order Management
                </h1>
                <p className="fs-subheader fw-light">
                  All-in-one platform to track customers, manage orders, and
                  grow your business — faster and smarter.
                </p>
              </div>
            </div>
            <div className="col">Column</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
