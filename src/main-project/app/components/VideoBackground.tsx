"use client";

import { useEffect, useRef } from "react";

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId = 0;
    let isReversing = false;
    const reverseStep = 1 / 30;

    const stopReverse = () => {
      isReversing = false;
      cancelAnimationFrame(rafId);
      rafId = 0;
    };

    const resumeForward = () => {
      stopReverse();
      video.currentTime = 0;
      void video.play();
    };

    const queueReverseStep = () => {
      if (!isReversing) return;

      if (video.currentTime <= reverseStep) {
        resumeForward();
        return;
      }

      video.currentTime = Math.max(0, video.currentTime - reverseStep);
    };

    const handleEnded = () => {
      video.pause();
      isReversing = true;
      queueReverseStep();
    };

    const handleSeeked = () => {
      if (!isReversing) return;
      rafId = requestAnimationFrame(queueReverseStep);
    };

    video.addEventListener("ended", handleEnded);
    video.addEventListener("seeked", handleSeeked);

    return () => {
      stopReverse();
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("seeked", handleSeeked);
    };
  }, []);

  return (
    <div className="video-bg-wrapper">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="video-bg"
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
