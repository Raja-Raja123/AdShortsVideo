import { useEffect, useState } from "react";
import axios from "axios";

export default function useFeed(){

const [videos,setVideos] = useState([]);
const [loading,setLoading] = useState(true);

useEffect(()=>{

const fetchFeed = async()=>{

try{

const res = await axios.get("/api/feed");

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