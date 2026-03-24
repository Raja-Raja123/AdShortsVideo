import { useNavigate } from "react-router";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import api from "@/api/axios";

const GoogleAuthHandler = ({ onClose }) => {
  const navigate = useNavigate();
  const { login: setAuthUser } = useAuth();

  const login = useGoogleLogin({
    flow: "implicit",
    scope: "openid email profile",
    onSuccess: async (tokenResponse) => {
      try {
        const accessToken = tokenResponse?.access_token;
        if (!accessToken) {
          throw new Error("Missing Google access_token.");
        }

        const res = await api.post(
          "/api/auth/google",
          { access_token: accessToken },
          { headers: { "Content-Type": "application/json" } },
        );
         console.log(res);
        const sanctumToken = res.data?.token;
        const userData = res.data?.user;
        localStorage.setItem(
          "auth",
          JSON.stringify({
            token: sanctumToken
          }),
        );

        setAuthUser(userData);

        alert("Login successful");
        navigate("/");
        onClose?.();
      } catch (error) {
        console.error("Google auth failed:", error);
        console.log("Login not successful");
        alert("Google login failed");
        onClose?.();
      }
    },
    onError: () => {
      console.log("Login not successful");
      console.log("Google Login Failed");
    },
  });

  return (
    <button
      type="button"
      onClick={() => login()}
      className="w-full flex items-center justify-center gap-2   text-blue-600 py-3 rounded-md font-semibold bg-blue-50 cursor-pointer"
    >
      <FcGoogle />
      Continue with Google
    </button>
  );
};

export default GoogleAuthHandler;
