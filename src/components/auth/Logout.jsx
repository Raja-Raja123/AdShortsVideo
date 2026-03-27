import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function Logout() {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
   const confirmLogout = window.confirm("Are you sure you want to logout?");

  if (confirmLogout) {
    logout();
    navigate("/"); // redirect after logout
  } else {
    return; // do nothing if user cancels
  }
  };

  return (
    <div
      onClick={handleLogout}
      className="flex items-center gap-1 px-4 py-3 rounded-lg cursor-pointer hover:bg-accent hover:text-accent-foreground transition-all"
    >
      <LogOut size={24} />
      <span className="text-sm">Logout</span>
    </div>
  );
}