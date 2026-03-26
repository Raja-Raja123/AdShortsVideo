import { useState } from "react";
import axios from "axios";
import ThemeSelector from "./ThemeSelector";
import DurationSelector from "./DurationSelector";
import GenerateButton from "./GenerateButton";
import ProgressLoader from "./ProgressLoader";
import VideoPreview from "./VideoPreview";
import api from "@/api/axios";

export default function GenerateAdStep({ product, media, prevStep }) {

const [theme,setTheme] = useState("");
const [duration,setDuration] = useState("");
const [loading,setLoading] = useState(false);
const [video,setVideo] = useState("");
const [error,setError] = useState("");

const generateAd = async () => {

try {

setLoading(true);
setError("");

const formData = new FormData();

/* product data */
Object.entries(product).forEach(([key,value])=>{
  formData.append(key,value);
});

/* theme + duration */
formData.append("theme",theme);
formData.append("duration",duration);

/* images */
if(media.images){
  media.images.forEach((img)=>{
    formData.append("images",img);
  });
}

/* video */
if(media.video){
  formData.append("video",media.video);
}

/* audio */
if(media.audio){
  formData.append("audio",media.audio);
}

const token =JSON.parse( localStorage.getItem("auth")).token;
const res = await axios.post(
`https://kaylee-biangular-devotedly.ngrok-free.dev/render/${theme}`,
formData,
{
headers:{
  Authorization: `Bearer ${token}`,
"ngrok-skip-browser-warning": "true"
}
}
);

if(res.status === 200){
const data = res.data;
setVideo(data.video);
}

} catch(err){

setError(err.response?.data?.error || err.message || "Failed to generate ad");

} finally{

setLoading(false);

}

};

return(

<div className="sm:max-w-5xl">

{/* ---------- SHOW LOADER ---------- */}

{loading && <ProgressLoader/>}

{/* ---------- SHOW VIDEO RESULT ---------- */}

{!loading && video && (
  <VideoPreview video={video}/>
)}

{/* ---------- SHOW FORM ---------- */}

{!loading && !video && (

<div className="space-y-6 p-6">
<ThemeSelector selected={theme} setTheme={setTheme}/>

<DurationSelector duration={duration} setDuration={setDuration}/>

<div className="flex justify-between w-[90%] md:w-full">

<button
onClick={prevStep}
className="border px-6 py-2 rounded"
>
Back
</button>

<GenerateButton 
onClick={generateAd}
disabled={!theme || !duration}
/>

</div>

{error && (
<p className="text-red-500">{error}</p>
)}

</div>

)}

</div>

);

}