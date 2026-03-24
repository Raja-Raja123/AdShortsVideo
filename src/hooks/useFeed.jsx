import { useEffect, useState } from "react";
import axios from "axios";
import api from "@/api/axios";

export default function useFeed(){

const [videos,setVideos] = useState([]);
const [loading,setLoading] = useState(true);

useEffect(()=>{

const fetchFeed = async()=>{

try{

const res = await api.get("/feed");

setVideos(res.data.data);   // IMPORTANT

}catch(err){
console.error(err);
}

setLoading(false);

};

fetchFeed();

},[]);

return {videos,loading,setVideos};

}