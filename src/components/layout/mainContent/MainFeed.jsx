import React from "react";
import { Outlet } from "react-router-dom";

const MainFeed = () => {
  
  return (
    <div className="flex-1 md:p-4 space-y-6 fixed sm:left-[18%] h-full overflow-y-auto hide-scrollbar">
        <Outlet/>
      
    </div>
  );
};

export default MainFeed;