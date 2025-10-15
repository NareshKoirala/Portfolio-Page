"use client";
import { useEffect, useState } from "react";

const Stars = () => {
  const [stars, setStars] = useState<{ top: string; left: string }[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 100 }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }));
    setStars(generated);
  }, []);

  return (
    <>
      {stars.map((star, i) => (
        <span
          key={i}
          className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse"
          style={{
            top: star.top,
            left: star.left,
            opacity: Math.random() * 0.8 + 0.2, // random brightness
            boxShadow: `0 0 ${Math.random() * 6 + 3}px white`,
          }}
        />
      ))}
    </>
  );
};

export default Stars;
