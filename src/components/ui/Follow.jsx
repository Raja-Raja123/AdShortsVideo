import { useEffect } from "react";
import useFollow from "@/hooks/useFollow";
import { useAuth } from "@/context/AuthContext";

export default function FollowButton({ userId }) {
  const { followMap, handleFollow, fetchFollowStatus,loadingMap } = useFollow();
  const { user } = useAuth();
  const isLoading = loadingMap[userId];
  if (user?.id === userId) {
    return null;
  }

  // ✅ fetch on first render
  useEffect(() => {
    if (userId) {
      fetchFollowStatus(userId);
    }
  }, [userId]);

  const isFollowed = followMap[userId];

  return (
    <button
      disabled={isLoading}
      onClick={() => handleFollow(userId)}
      className={`text-sm font-semibold cursor-pointer ${
        isFollowed === undefined
          ? "text-gray-300"
          : isFollowed
          ? "text-gray-400"
          : "text-blue-500"
      }`}
    >
      {isFollowed === undefined
        ? "..."
        : isFollowed
        ? "Following"
        : "Follow"}
    </button>
  );
}