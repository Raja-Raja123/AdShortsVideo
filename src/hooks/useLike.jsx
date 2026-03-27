import { useState } from "react";
import api from "@/api/axios";

export default function useLike() {
  const [likeMap, setLikeMap] = useState({});
  const [loadingMap, setLoadingMap] = useState({});

  // ✅ FETCH LIKE STATUS
  const fetchLikeStatus = async (videoId) => {
    try {
      // prevent duplicate calls
      if (likeMap[videoId] !== undefined) return;

      const token = JSON.parse(localStorage.getItem("auth"))?.token;

      const { data } = await api.get(`/video/${videoId}/status`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLikeMap((prev) => ({
        ...prev,
        [videoId]: {
          liked: data.is_liked,
          count: data.likes_count,
        },
      }));
    } catch (err) {
      console.error("Fetch Like Status Error:", err);
    }
  };

  // ✅ TOGGLE LIKE
  const handleLike = async (videoId) => {
    if (loadingMap[videoId]) return;

    try {
      setLoadingMap((prev) => ({ ...prev, [videoId]: true }));

      const token = JSON.parse(localStorage.getItem("auth"))?.token;

      const { data } = await api.post(
        `/videos/${videoId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLikeMap((prev) => {
        const current = prev[videoId] || { liked: false, count: 0 };

        return {
          ...prev,
          [videoId]: {
            liked: data.liked,
            count: data.liked
              ? current.count + 1
              : current.count - 1,
          },
        };
      });

      return data.liked;
    } catch (err) {
      console.error("Like Error:", err);
    } finally {
      setLoadingMap((prev) => ({ ...prev, [videoId]: false }));
    }
  };

  return {
    likeMap,
    fetchLikeStatus,
    handleLike,
    loadingMap,
  };
}