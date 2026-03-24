// components/LikeButton.jsx

import { useState } from "react";
import { Heart } from "lucide-react";

export default function LikeButton({ videoId, initialLikes }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikes || 0);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const token = JSON.parse(localStorage.getItem("auth"))?.token;

      const res = await fetch(`/api/videos/${videoId}/like`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.liked) {
        setLiked(true);
        setLikesCount((prev) => prev + 1);
      } else {
        setLiked(false);
        setLikesCount((prev) => prev - 1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Heart
        size={24}
        onClick={handleLike}
        className={`cursor-pointer transition ${
          liked
            ? "text-red-500 fill-red-500 scale-110"
            : "text-gray-600 hover:text-red-500"
        }`}
      />

      <p className="text-sm font-semibold mt-2">
        {likesCount} likes
      </p>
    </div>
  );
}