import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserToken } from "../utils/global";

export default function OnlyGuest({ children }) {
  const token = getUserToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/customers", { replace: true });
    }
  }, [token, navigate]);

  return !token ? children : null;
}
