import { useLocation } from "react-router-dom";

const SidebarItem = ({
  icon: Icon,
  label,
  avatar,
  onClick,
  showLabel = false,
}) => {

  const location = useLocation();

  const path =
    label === "Home"
      ? "/"
      : `/${label.toLowerCase().replace(" ", "_")}`;

  const isActive = location.pathname === path;

  return (
    <div
      onClick={onClick}
      className={`
        flex items-center gap-4 px-4 py-3
        rounded-lg cursor-pointer
        transition-all duration-200
         hover:text-accent-foreground
        ${isActive ? "font-bold" : ""}
      `}
    >

      {avatar ? (
        <img
          src={avatar}
          referrerPolicy="no-referrer"
          alt="profile"
          className="w-6 h-6 rounded-full"
        />
      ) : (
        Icon && <Icon size={26} />
      )}

      {showLabel && (
        <span className="text-sm whitespace-nowrap">
          {label}
        </span>
      )}

    </div>
  );
};

export default SidebarItem;