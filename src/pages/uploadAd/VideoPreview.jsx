import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VideoPreview({ video }) {

const navigate = useNavigate();

const PREVIEW_TIME = 600; // 10 minutes
const [timeLeft,setTimeLeft] = useState(PREVIEW_TIME);
const [expired,setExpired] = useState(false);

if(!video) return null;

/* -------- TIMER -------- */

useEffect(()=>{

const timer = setInterval(()=>{

setTimeLeft((prev)=>{

if(prev <= 1){
clearInterval(timer);
setExpired(true);
return 0;
}

return prev - 1;

});

},1000);

return ()=> clearInterval(timer);

},[]);

/* -------- REDIRECT AFTER EXPIRE -------- */

useEffect(()=>{

if(expired){

setTimeout(()=>{
navigate("/");   // change if needed
},3000);

}

},[expired,navigate]);

/* -------- TIME FORMAT -------- */

const minutes = Math.floor(timeLeft / 60);
const seconds = timeLeft % 60;

return (

<div className="flex justify-center mt-8 md:mt-4 sm:px-8 -mr-4">

<div className="bg-zinc-600 border border-zinc-500 rounded-xl p-6 shadow-xl w-sm">

<h3 className="text-lg font-semibold text-white mb-4 text-center">
Ad Preview
</h3>

{/* Video Frame */}

{!expired && (

<div className="relative w-full aspect-square overflow-hidden rounded-lg bg-black">

<video
key={video}
src={video}
controls
onError={()=> setExpired(true)}
className="absolute inset-0 w-full h-full object-contain"
/>

</div>

)}

{/* Timer */}

{!expired && (

<p className="text-center text-sm text-zinc-200 mt-3">

Preview expires in {minutes}:{seconds.toString().padStart(2,"0")}

</p>

)}

{/* Actions */}

{!expired && (

<div className="flex justify-center mt-4">

<a
href={video}
download
target="_blank"
rel="noopener noreferrer"
className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm"
>

<Download size={16}/>
Download Video

</a>

</div>

)}

{/* Expired State */}

{expired && (

<div className="text-center mt-4">

<p className="text-red-400 font-semibold mb-2">
Preview Expired
</p>

<p className="text-zinc-200 text-sm">
Your video has been saved to your profile.
</p>

<p className="text-zinc-400 text-xs mt-2">
Redirecting...
</p>

</div>

)}

</div>

</div>

);

}