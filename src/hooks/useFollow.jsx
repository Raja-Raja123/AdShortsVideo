import { useContext, useState } from "react";
import { FollowContext } from "../context/FollowContext";
import axios from "axios";
import api from "@/api/axios";

export default function useFollow() {
  const { followMap, toggleFollowState, setInitialFollowState } =
    useContext(FollowContext);

  const [loading, setLoading] = useState(false);

  // ✅ FETCH FOLLOW STATUS
  const fetchFollowStatus = async (userId) => {
    try {
      if (followMap[userId] !== undefined) return;

      const auth = JSON.parse(localStorage.getItem("auth"));
      const token = auth?.token;
      console.log(token)
      const { data } = await api.get(`/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // ✅ set initial state
      setInitialFollowState(userId, data.is_following);

    } catch (err) {
      console.error("Fetch Follow Status Error:", err);
    }
  };

  // ✅ TOGGLE FOLLOW
  const handleFollow = async (userId) => {
    if (loading) return;

    try {
      setLoading(true);

      const auth = JSON.parse(localStorage.getItem("auth"));
      const token = auth?.token;

      const { data } = await api.post(
        `/api/follow/${userId}`,
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
      setLoading(false);
    }
  };

  return {
    followMap,
    handleFollow,
    fetchFollowStatus,
    loading,
  };
}