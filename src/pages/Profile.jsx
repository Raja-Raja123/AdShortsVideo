import { useEffect, useState } from "react";
import Logout from "@/components/auth/Logout";
import { useAuth } from "../context/AuthContext";
import useMyVideos from "../hooks/useMyVideo";
import useVideoPlayer from "@/hooks/useVideoPlayer";

export default function Profile() {
  const { user } = useAuth();
  const { videos, loading } = useMyVideos();
  const { handlePlay, setRef } = useVideoPlayer();

  // ✅ NEW STATE
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  const joinDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
      })
    : "Recently";

  // ✅ FETCH PROFILE DATA
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const auth = JSON.parse(localStorage.getItem("auth"));
        const token = auth?.token;

        const res = await fetch(`/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        // console.log("PROFILE DATA:", data.data.followers_count);

        // ✅ SET COUNTS
        setFollowers(data.data.followers_count);
        setFollowing(data.data.following_count);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="fixed top-0 w-[85%] items-center sm:px-6 lg:px-2 py-4">
      {/* PROFILE CARD */}
      <div className="rounded-2xl sm:p-8 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-6">
            <img
              src={user?.avatar || "/default-avatar.png"}
              referrerPolicy="no-referrer"
              className="sm:w-18 sm:h-18 rounded-full object-cover border"
            />

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold">
                {user?.name || user?.email?.split("@")[0]}
              </h2>

              <p className="text-sm text-muted-foreground mt-1">
                Member since {joinDate}
              </p>
            </div>
          </div>

          {/* LOGOUT */}
          <div className="self-start mr-18 sm:self-auto">
            <Logout />
          </div>
        </div>

        {/* 🔥 PROFILE STATS */}
        <div className="flex justify-around sm:justify-start sm:gap-12 mt-8 ml-8 text-center">
          <div>
            <p className="text-lg sm:text-xl font-semibold">{videos.length}</p>
            <p className="text-sm text-muted-foreground">Ads</p>
          </div>

          <div>
            <p className="text-lg sm:text-xl font-semibold">{followers ?? 0}</p>

            <p className="text-sm text-muted-foreground">Followers</p>
          </div>

          <div>
            <p className="text-lg sm:text-xl font-semibold">{following ?? 0}</p>
            <p className="text-sm text-muted-foreground">Following</p>
          </div>
        </div>
      </div>

      {/* VIDEO SECTION */}
      <h3 className="text-lg font-semibold mb-6">Your Ad Videos</h3>

      {loading && <p>Loading...</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 mr-10">
        {videos.map((video) => (
          <div
            key={video.id}
            className="rounded-xl overflow-hidden border hover:scale-[1.02] transition m-2"
          >
            <video
              ref={(el) => setRef(video.id, el)}
              src={video.video_url}
              controls
              onPlay={() => handlePlay(video.id)}
              className="w-full h-56 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
