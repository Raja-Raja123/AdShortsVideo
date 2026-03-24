import {
  Home,
  Search,
  Film,
  MessageCircle,
  Heart,
  PlusSquare,
  LogIn,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const BottomBar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleClick = (label) => {
    if (label === "Home") navigate("/");
    else if (label === "Profile") navigate("/profile");
    else if (label === "Login") navigate("/login");
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
    <div className="fixed bottom-0 left-0 w-full h-14 flex items-center justify-around px-4 py-2 bg-background z-50">

      {items.map((item) => {
        const Icon = item.icon;
        return (
          <button key={item.label} onClick={() => handleClick(item.label)}>
            <Icon size={24} />
          </button>
        );
      })}

      {/* Profile / Login */}
      <button onClick={() => handleClick(user ? "Profile" : "Login")}>
        {user?.avatar ? (
          <img
            src={user.avatar}
            className="w-6 h-6 rounded-full"
            referrerPolicy="no-referrer"
          />
        ) : (
          <LogIn size={24} />
        )}
      </button>
    </div>
  );
};

export default BottomBar;