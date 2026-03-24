import React from "react";
import CategoryBar from "../components/layout/mainContent/CategoryBar";
import MainFeed from '../components/layout/mainContent/MainFeed'
import { useTheme } from "@/context/ThemeContext";
import Feed from "@/components/feed/Feed";

const Home = () => {

    const {theme} = useTheme();

  return (
    <div>
      <CategoryBar />

      <div className="mt-30">
      <Feed />
      </div>
      
    </div>
  );
};

export default Home;
