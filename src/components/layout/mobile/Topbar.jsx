import ThemeToggle from "../../ui/ThemeToggle";
import { Search } from "lucide-react"; // optional icon

const TopBar = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-15 flex  items-center gap-4 p-5 border-b bg-background z-50">
      
      {/* Logo */}
      <img
        src="https://statics.olx.in/external/base/img/olxLogo/olx_logo_2025.svg"
        alt="logo"
        className="h-8 flex-shrink-0"
      />

      {/* Search Input */}
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Search..."
          className="w-full h-8 pl-8 pr-2 text-sm rounded-md border bg-muted focus:outline-none focus:ring-2 focus:ring-primary ml-2"
        />
        
        {/* Search Icon */}
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
      </div>

      {/* Theme Toggle */}
      <div className="flex-shrink-0 mt-4">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default TopBar;