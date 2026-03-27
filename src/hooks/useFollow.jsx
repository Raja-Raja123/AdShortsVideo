import { useContext, useState } from "react";
import { FollowContext } from "../context/FollowContext";
import api from "@/api/axios";

export default function useFollow() {
  const { followMap, toggleFollowState, setInitialFollowState } =
    useContext(FollowContext);

  // ✅ loading per user (instead of global)
  const [loadingMap, setLoadingMap] = useState({});

  // ✅ FETCH FOLLOW STATUS (fixed logic)
  const fetchFollowStatus = async (userId) => {
    try {
      // ✅ prevent duplicate calls but allow fresh fetch after reload
      if (followMap[userId] !== undefined) return;

      const auth = JSON.parse(localStorage.getItem("auth"));
      const token = auth?.token;

      const { data } = await api.get(`/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // ✅ always sync with backend
      setInitialFollowState(userId, data.user.is_following);
    } catch (err) {
      console.error("Fetch Follow Status Error:", err);
    }
  };

  // ✅ TOGGLE FOLLOW (better UX + safe state handling)
  const handleFollow = async (userId) => {
    // prevent double click per user
    if (loadingMap[userId]) return;

    try {
      setLoadingMap((prev) => ({ ...prev, [userId]: true }));

      const auth = JSON.parse(localStorage.getItem("auth"));
      const token = auth?.token;

      const { data } = await api.post(
        `/follow/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ update global state
      toggleFollowState(userId, data.followed);

      return data.followed;
    } catch (err) {
      console.error("Follow Error:", err);
    } finally {
      setLoadingMap((prev) => ({ ...prev, [userId]: false }));
    }
  };

  return {
    followMap,
    handleFollow,
    fetchFollowStatus,
    loadingMap, // ✅ expose per-user loading
  };
}