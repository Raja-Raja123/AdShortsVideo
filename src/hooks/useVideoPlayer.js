import { useRef } from "react";

export default function useVideoPlayer() {
  const videoRefs = useRef([]);
  const currentPlaying = useRef(null);

  const handlePlay = (index) => {
    if (
      currentPlaying.current !== null &&
      currentPlaying.current !== index
    ) {
      videoRefs.current[currentPlaying.current]?.pause();
    }

    currentPlaying.current = index;
  };

  const setRef = (index, el) => {
    videoRefs.current[index] = el;
  };

  return {
    videoRefs,
    handlePlay,
    setRef,
  };
}