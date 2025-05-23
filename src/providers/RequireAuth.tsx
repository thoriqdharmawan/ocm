import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserToken } from "../utils/global";

export default function RequireAuth({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const token = getUserToken()

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true, state: { from: location } });
    }
  }, [token, location, navigate]);
  return token ? children : null;
}
