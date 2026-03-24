import SidebarItem from "./SidebarItem";
 import Login from "../auth/Login";
  import { useNavigate } from "react-router-dom"; 
  import ThemeToggle from "../ui/ThemeToggle";
   import { useAuth } from "../../context/AuthContext";
    import { useState } from "react";
    import { Home, Search, Film, MessageCircle, Heart, PlusSquare, LogIn, } from "lucide-react";

const Sidebar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleClick = (label) => {
    if (label === "Home") navigate("/");
    else if (label === "Profile") navigate("/profile");
    else if (label === "Login") setShowLogin(true);
    else navigate(`/${label.toLowerCase().replace(" ", "_")}`);
  };

  const menuItems = [
    { icon: Home, label: "Home" },
    { icon: Search, label: "Search" },
    { icon: Film, label: "ADs" },
    { icon: MessageCircle, label: "Contact" },
    { icon: Heart, label: "Notifications" },
    { icon: PlusSquare, label: "upload ADs" },
  ];

  return (
    <div
      className="fixed h-screen flex flex-col px-2 py-6 gap-4 md:gap-6 overflow-y-auto z-30 hide-scrollbar"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo */}
      <div className="flex justify-center shrink-0 w-14 h-12">
        <img
          src="https://statics.olx.in/external/base/img/olxLogo/olx_logo_2025.svg"
          alt="logo"
          className=""
        />
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-2 flex-1 justify-center">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            showLabel={isHovered}
            onClick={() => handleClick(item.label)}
          />
        ))}
      </div>

      {/* Bottom */}
      <div className="flex flex-col gap-3 shrink-0">
        <SidebarItem
          label={user ? "Profile" : "Login"}
          avatar={user?.avatar}
          icon={LogIn}
          showLabel={isHovered}
          onClick={() => handleClick(user ? "Profile" : "Login")}
        />

        {showLogin && !user && (
          <div onMouseEnter={() => setIsHovered(false)}>
            <Login active={setShowLogin} />
          </div>
        )}

        <ThemeToggle />
      </div>
    </div>
  );
};

export default Sidebar;