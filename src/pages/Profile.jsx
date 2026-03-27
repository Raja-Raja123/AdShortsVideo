import { useEffect, useState } from "react";
import Logout from "@/components/auth/Logout";
import { useAuth } from "../context/AuthContext";
import useMyVideos from "../hooks/useMyVideo";
import useVideoPlayer from "@/hooks/useVideoPlayer";
import api from "@/api/axios";

export default function Profile() {
  const { user } = useAuth();
  const { videos, loading } = useMyVideos();
  const { handlePlay, setRef } = useVideoPlayer();

  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  const joinDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
      })
    : "Recently";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("auth"))?.token;

        const res = await api.get(`/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data.data;
        setFollowers(data.followers_count);
        setFollowing(data.following_count);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="w-full sm:w-[80%]  px-10 py-6 mb-28">
      
      {/* PROFILE HEADER */}
      <div className="w-full flex items-center justify-between mb-6">
        
        {/* LEFT SIDE */}
        <div className="flex items-center gap-4 min-w-0">
          <img
            src={user?.avatar || "/default-avatar.png"}
            referrerPolicy="no-referrer"
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border"
          />

          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-semibold truncate">
              {user?.name || user?.email?.split("@")[0]}
            </h2>

            <p className="text-xs sm:text-sm text-muted-foreground">
              Member since {joinDate}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div>
          <Logout />
        </div>
      </div>

      {/* STATS */}
      <div className="flex justify-around sm:justify-start sm:gap-12 mb-8 text-center">
        <div>
          <p className="text-lg sm:text-xl font-semibold">{videos.length}</p>
          <p className="text-xs sm:text-sm text-muted-foreground">Ads</p>
        </div>

        <div>
          <p className="text-lg sm:text-xl font-semibold">{followers}</p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Followers
          </p>
        </div>

        <div>
          <p className="text-lg sm:text-xl font-semibold">{following}</p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Following
          </p>
        </div>
      </div>

      {/* VIDEO SECTION */}
      <h3 className="text-base sm:text-lg font-semibold mb-4">
        Your Ad Videos
      </h3>

      {loading && <p>Loading...</p>}

      {/* 🔥 SQUARE GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {videos.map((video) => (
          <div
            key={video.id}
            className="w-full aspect-square rounded-xl overflow-hidden border hover:scale-[1.02] transition"
          >
            <video
              ref={(el) => setRef(video.id, el)}
              src={video.video_url}
              controls
              onPlay={() => handlePlay(video.id)}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}