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
    let i = 0;
    let value = 1;
    let typing: NodeJS.Timeout;

    const startTyping = () => {
      typing = setInterval(() => {
        setText(message.slice(0, i + value));
        i += value;

        if (i === message.length || i === 0) {
          clearInterval(typing);
          setTimeout(startTyping, 500);
          value = i === message.length ? -1 : 1;
        }
      }, typingSpeed);
    };

    startTyping();

    // Start fade out after total duration
    const fadeTimer = setTimeout(
      () => setFade(true),
      message.length * typingSpeed * 2 + 500
    );
    // Unmount after fade duration (0.5s)
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
