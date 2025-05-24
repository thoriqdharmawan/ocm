import { useState } from "react";
import Input from "../components/ui/Input";
import { useNavigate } from "react-router-dom";
import useLogin from "../api/auth/useLogin";
import { UserType } from "../models/login";
import { setUser, setUserToken } from "../utils/global";

const DUMY_USER: UserType = {
  id: 1,
  username: "budi.santoso",
  email: "budi.santoso@email.com",
  password: "password123",
  role: "admin",
  token: "token_dummy_123",
  refreshToken: "refresh_token_dummy_123",
  createdAt: "2024-01-01T08:00:00Z",
  updatedAt: "2024-05-01T10:00:00Z",
  deletedAt: null,
  isActive: true,
  isVerified: true,
};

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState<{
    username?: string;
    password?: string;
    form?: string;
  }>({});
  const navigate = useNavigate();

  const { mutate, isPending } = useLogin({
    onSuccess: (data) => {
      setUserToken("fake-token");
      setUser(DUMY_USER);
      navigate("/");
    },
    onError: (err) => {
      // setError("Invalid username or password");
      setUserToken("fake-token");
      setUser(DUMY_USER);
      navigate("/");
    },
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newError: { username?: string; password?: string; form?: string } =
      {};
    if (!form.username) newError.username = "Username tidak boleh kosong.";
    if (!form.password) newError.password = "Password tidak boleh kosong.";
    if (newError.username || newError.password) {
      setError(newError);
      return;
    }
    setError({});
    mutate({
      body: {
        username: form.username,
        password: form.password,
      },
    });
  };

  return (
    <div className="vh-100 w-100 bg-light">
      <div className="row h-100">
        <div className="col-12 col-md-6 col-lg-8 p-0">
          <div
            id="carouselExample"
            className="carousel slide h-100"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner h-100">
              <div className="carousel-item h-100 active">
                <img
                  src="https://fastly.picsum.photos/id/48/5000/3333.jpg?hmac=y3_1VDNbhii0vM_FN6wxMlvK27vFefflbUSH06z98so"
                  className="img-fluid h-100 w-100 object-fit-cover"
                  alt=""
                />
              </div>
              <div className="carousel-item h-100">
                <img
                  src="https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g"
                  className="img-fluid h-100 w-100 object-fit-cover"
                  alt=""
                />
              </div>
              <div className="carousel-item h-100">
                <img
                  src="https://fastly.picsum.photos/id/60/1920/1200.jpg?hmac=fAMNjl4E_sG_WNUjdU39Kald5QAHQMh-_-TsIbbeDNI"
                  className="img-fluid h-100 w-100 object-fit-cover"
                  alt=""
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="d-flex flex-column col-12 col-md-6 col-lg-4 p-0 d-flex justify-content-center align-items-center custom-shadow bg-white">
          <form
            className="bg-white p-4 rounded"
            style={{ minWidth: 320 }}
            onSubmit={handleSubmit}
          >
            <h3 className="mb-4 text-center">Login</h3>
            <Input
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              wrapperClassName="mb-3"
              error={error.username}
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              wrapperClassName="mb-3"
              error={error.password}
            />
            {error.form && <div className="text-danger mb-3">{error.form}</div>}
            <button
              className="btn btn-primary w-100"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="fw-light fst-italic fs-7 text-secondary text-center">
            NOTE: use any value to login
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
