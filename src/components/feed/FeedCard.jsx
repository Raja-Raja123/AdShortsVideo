
import { Send } from "lucide-react";
import LikeButton from "../ui/Like";
import ProfileInfo from "../ui/Profile";
import FollowButton from "../ui/Follow";

export default function FeedCard({ video, id, handlePlay, setRef }) {
  return (
    <div className="mb-8 w-[85%]">
      {/* HEADER */}
      <div className="flex items-center justify-between px-2 py-4">
        <ProfileInfo user={video.user} />

        {/* ✅ pass only userId */}
        <FollowButton userId={video.user.id} />
      </div>

      {/* VIDEO */}
      <video
        ref={(el) => setRef(id, el)}
        src={video.video_url}
        controls
        onPlay={() => handlePlay(id)}
        className="rounded-md aspect-square mt-2"
      />

      {/* ACTIONS */}
      <div className="flex items-center gap-4 mt-3 px-2">
        <LikeButton
          videoId={video.id}
          initialLikes={video.likes_count}
        />
        <Send size={24} className="cursor-pointer" />
      </div>

      {video.caption && (
        <p className="text-sm mt-1 px-2">{video.caption}</p>
      )}
    </div>
  );
}