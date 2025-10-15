"use client";
import { useEffect, useState } from "react";

type FlashBangProps = {
  onFinish?: () => void;
};

export default function FlashBang({ onFinish }: FlashBangProps) {
  const message = "Welcome to Naresh's Portfolio!";
  const typingSpeed = 100; // ms per letter

  const [text, setText] = useState("");
  const [fade, setFade] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return; // SSR-safe

    let i = 0;
    let forward = true;
    let typing: NodeJS.Timeout;

    const startTyping = () => {
      typing = setInterval(() => {
        setText(message.slice(0, i + (forward ? 1 : -1)));
        i += forward ? 1 : -1;

        if (i === message.length || i === 0) {
          clearInterval(typing);
          setTimeout(startTyping, 500);
          forward = !forward;
        }
      }, typingSpeed);
    };

    startTyping();

    // Fade after total duration
    const fadeTimer = setTimeout(() => setFade(true), message.length * typingSpeed * 2 + 500);
    // Hide after fade
    const removeTimer = setTimeout(() => {
      setShow(false);
      if (onFinish) onFinish();
    }, message.length * typingSpeed * 2 + 1000);

    return () => {
      clearInterval(typing);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [onFinish]);

  if (!show) return null;

  return (
    <div
      className={`grid place-items-center h-screen bg-black transition-opacity duration-500 ${
        fade ? "opacity-0" : "opacity-50"
      }`}
    >
      <h1 className="text-6xl font-bold">
        {text}
        <span className="text-green-500">|</span>
      </h1>
    </div>
  );
}
