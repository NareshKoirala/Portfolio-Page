"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FallingStars() {
  const [stars, setStars] = useState<
    { id: number; startX: number; startDelay: number }[]
  >([]);

  useEffect(() => {
    const newStars = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      startX: Math.random() * window.innerWidth,
      startDelay: Math.random() * 2,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute w-[3px] h-[3px] rounded-full"
          style={{
            top: -100,
            left: star.startX,
            background: "white",
            boxShadow: "0 0 20px 2px #ffffffff",
          }}
          animate={{
            x: [0, 250], // gentle curve
            y: [0, 1200],
            opacity: [1, 0],
          }}
          transition={{
            duration: 2.5 + Math.random() * 1.5,
            delay: star.startDelay,
            repeat: Infinity,
            repeatType: "loop", // continuous
            ease: "linear",
          }}
        >
        </motion.div>
      ))}
    </div>
  );
}
