import { useEffect } from "react";
import { Heart } from "lucide-react";
import useLike from "@/hooks/useLike";

export default function LikeButton({ videoId }) {
  const { likeMap, fetchLikeStatus, handleLike, loadingMap } = useLike();

  // ✅ fetch like status on mount
  useEffect(() => {
    if (videoId) {
      fetchLikeStatus(videoId);
    }
  }, [videoId]);

  const likeData = likeMap[videoId];
  const isLoading = loadingMap[videoId];

  // ✅ loading state (before API response)
  if (!likeData) {
    return <p className="text-sm text-gray-400">...</p>;
  }

  return (
    <div>
      <Heart
        size={24}
        onClick={() => handleLike(videoId)}
        className={`cursor-pointer transition ${
          likeData.liked
            ? "text-red-500 fill-red-500 scale-110"
            : "text-gray-600 hover:text-red-500"
        } ${isLoading ? "opacity-50 pointer-events-none" : ""}`}
      />

      <p className="text-sm font-semibold mt-2">
        {likeData.count} likes
      </p>
    </div>
  );
}