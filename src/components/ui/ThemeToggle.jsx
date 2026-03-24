import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      onClick={toggleTheme}
      className="flex w-14 h-2 rounded-lg cursor-pointer transition-all duration-200 mb-3 justify-center"
    >
      {/* Icon container */}
      <div className="relative w-1 h-1 flex items-center justify-center">

        {/* Moon Icon */}
        <Moon
          className={`absolute transition-all duration-300 ${
            theme === "dark"
              ? "opacity-0 rotate-90 scale-75"
              : "opacity-100 rotate-0 scale-100"
          }`}
          size={24}
        />

        {/* Sun Icon */}
        <Sun
          className={`absolute transition-all duration-300 ${
            theme === "dark"
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-90 scale-75"
          }`}
          size={24}
        />

      </div>

     
    </div>
  );
}