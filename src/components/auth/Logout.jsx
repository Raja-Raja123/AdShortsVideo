import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function Logout() {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // redirect after logout
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