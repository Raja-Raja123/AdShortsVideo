import {
  Home,
  Film,
  MessageCircle,
  Heart,
  PlusSquare,
  LogIn,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Login from "@/components/auth/Login";
import { useState } from "react";

const BottomBar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  const handleClick = (label) => {
    if (label === "Home") navigate("/");
    else if (label === "Profile") navigate("/profile");
    else if (label === "Login") setShowLogin(true);
    else navigate(`/${label.toLowerCase().replace(" ", "_")}`);
  };

  const items = [
    { icon: Home, label: "Home" },
    { icon: Film, label: "ADs" },
    { icon: PlusSquare, label: "upload ADs" },
    { icon: Heart, label: "Notifications" },
    { icon: MessageCircle, label: "contact" },
  ];

  return (
    <>
      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full h-14 flex items-center justify-around px-4 py-2 bg-background z-50 border-t">

        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => handleClick(item.label)}
              className="cursor-pointer"
            >
              <Icon size={24} />
            </button>
          );
        })}

        {/* Profile / Login */}
        <div
          className="cursor-pointer"
          onClick={() => handleClick(user ? "Profile" : "Login")}
        >
          {user?.avatar ? (
            <img
              src={user.avatar}
              className="w-7 h-7 rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <LogIn size={24} />
          )}
        </div>
      </div>

      {/* ✅ IMPORTANT: pass active */}
      {showLogin && (
        <Login active={setShowLogin} />
      )}
    </>
  );
};

export default BottomBar;