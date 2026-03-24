import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import api from "@/api/axios";

const useMyVideos = () => {

  const { user } = useAuth();
  const token=JSON.parse(localStorage.getItem("auth")).token;
  const [videos,setVideos] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{

    const fetchVideos = async ()=>{

      

     try{
          
        const res = await api.get("/my-videos",{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
        console.log(token)
        console.log(res)
        setVideos(res.data.data);

      }
      catch(err){

        console.error(err);

      }finally{
        setLoading(false);
      }

    };

    fetchVideos();

  },[user]);

  return {videos,loading};

};

export default useMyVideos;