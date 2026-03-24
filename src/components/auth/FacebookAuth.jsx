import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router";

const FacebookAuth = ({onClose}) => {
        const navigate = useNavigate();
        const { login: setAuthUser } = useAuth();


  useEffect(() => {
    // Load Facebook SDK script
    window.fbAsyncInit = function () {
      FB.init({
        appId: "1629696511524077", // app id
        cookie: true,
        xfbml: true,
        version: "v19.0",
      });

      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  const handleFacebookLogin = () => {
    window.FB.login(
      function (response) {
        if (response.authResponse) {
          console.log("User logged in:", response);

          // Get user data
          window.FB.api(
            "/me",
            { fields: "name,email,picture" },
            function (userData) {
              console.log("User Data:", userData);

              // access token
              const accessToken = response.authResponse.accessToken;
              console.log("Access Token:", accessToken);

  // Send userData to your backend
  const token =
    document
      .querySelector('meta[name="csrf-token"]')
      ?.getAttribute("content") ||
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      ?.split("=")[1];

  fetch("/api/auth/facebook/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "X-XSRF-TOKEN": decodeURIComponent(token),
    },
    body: JSON.stringify({
      access_token: accessToken,
      userData: userData,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Backend response:", data);
      if (data.token) {
        localStorage.setItem(
          "auth",
          JSON.stringify({
            token: data.token,
            user: data.user
          })
        );
        setAuthUser(data.user);
        alert("Login successful");
        navigate("/");
        onClose?.();
      } else {
        alert("Login failed: " + (data.message || "Unknown error"));
      }
    })
    .catch((error) => {
      console.error("Error sending data to backend:", error);
    });
},
          );
        } else {
          console.log("User cancelled login");
          
        }
      },
      { scope: "email,public_profile" },
    );
  };

  return (
    <button
      onClick={handleFacebookLogin}
      className="w-full flex items-center justify-center gap-2 rounded-md  text-blue-600 py-3 font-semibold bg-blue-50 cursor-pointer"
    >
      <FaFacebook />
      Continue with Facebook
    </button>
  );
};

export default FacebookAuth;
