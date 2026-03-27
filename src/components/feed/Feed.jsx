import useFeed from "../../hooks/useFeed";
import FeedCard from "./FeedCard";
import useVideoPlayer from "@/hooks/useVideoPlayer";

export default function Feed(){

const {videos,loading,setVideos} = useFeed();
 const { handlePlay, setRef } = useVideoPlayer();

if(loading) return <p className="text-center">Loading...</p>;

return(

<div className="w-full max-w-130 px-2 flex flex-col items-center mb-18">

{videos.map((video, index) => (
<FeedCard
key={video.id}
id={video.id}
video={video}
setVideos={setVideos}
handlePlay={handlePlay}
setRef={setRef}
/>
))}

</div>

);

}