import { createContext, useState } from "react";

export const FollowContext = createContext();

export function FollowProvider({ children }) {
  const [followMap, setFollowMap] = useState({});

  // 🔥 Set initial follow state (from API)
  const setInitialFollowState = (userId, isFollowing) => {
  setFollowMap((prev) => {
    // 🛑 IMPORTANT: only set if truly not present
    if (prev[userId] !== undefined) return prev;

    return {
      ...prev,
      [userId]: isFollowing ?? false, // ✅ fallback safety
    };
  });
};

  // 🔥 Toggle follow state
  const toggleFollowState = (userId, isFollowing) => {
    setFollowMap((prev) => ({
      ...prev,
      [userId]: isFollowing,
    }));
  };

  return (
    <FollowContext.Provider
      value={{
        followMap,
        setInitialFollowState,
        toggleFollowState,
      }}
    >
      {children}
    </FollowContext.Provider>
  );
}