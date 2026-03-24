import ThemeToggle from "../../ui/ThemeToggle";

const TopBar = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-12 flex items-center justify-between px-4 border-b bg-background z-50">
      
      {/* Logo */}
      <img
        src="https://statics.olx.in/external/base/img/olxLogo/olx_logo_2025.svg"
        alt="logo"
        className="h-10"
      />

      <div className=" mt-5">

      <ThemeToggle />
      </div>
    </div>
  );
};

export default TopBar;