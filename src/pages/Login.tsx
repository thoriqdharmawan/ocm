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
  const [error, setError] = useState("");
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
    setError("");
    mutate({
      body: {
        username: form.username,
        password: form.password,
      },
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <form
        className="bg-white p-4 rounded shadow"
        style={{ minWidth: 320 }}
        onSubmit={handleSubmit}
      >
        <h3 className="mb-4 text-center">Login</h3>
        <Input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="mb-3"
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="mb-3"
        />
        {error && <div className="text-danger mb-3">{error}</div>}
        <button
          className="btn btn-primary w-100"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
