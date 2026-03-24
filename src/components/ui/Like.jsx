// components/LikeButton.jsx

import { useState } from "react";
import { Heart } from "lucide-react";
import api from "@/api/axios";

export default function LikeButton({ videoId, initialLikes }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikes || 0);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const token = JSON.parse(localStorage.getItem("auth"))?.token;

      const { data } = await api.post(
        `/videos/${videoId}/like`,
        {}, // no body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

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

      <p className="text-sm font-semibold mt-2">{likesCount} likes</p>
    </div>
  );
}
