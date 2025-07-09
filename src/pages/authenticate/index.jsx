import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { userLoginByGoogle } from "../../api/auth";
import { loginGoogle } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
export default function Authenticate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [queryParameters] = useSearchParams();
  useEffect(() => {
    if (queryParameters.get("code")) {
      const authCode = queryParameters.get("code");
      (async () => {
        try {
          const result = await userLoginByGoogle(authCode);
          dispatch(loginGoogle(result));
          Cookies.set("accessToken", result.accessToken);
          Cookies.set("refreshToken", result.refreshToken);
        } catch (err) {
          navigate("/login");
        }
      })();
    }
  }, []);
  return <div className="flex items-center justify-center h-[100vh]"></div>;
}
