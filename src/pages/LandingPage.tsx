const Home = () => {
  return (
    <div className="d-flex flex-column min-vh-100 w-100">
      <nav className="container navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            OCM
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
                <a className="nav-link" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <a href="/login">
            <button className="btn btn-primary px-5">Login</button>
          </a>
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

                <a href="/login">
                  <button className="btn btn-primary btn-lg px-5 mt-4">
                    Login
                  </button>
                </a>
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
