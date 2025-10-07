"use client";

import { useEffect, useState } from "react";

const MousePointer = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.pageX, y: event.pageY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: "20px",
        height: "20px",
        backgroundColor: "#F0E7D5",
        borderRadius: "50%",
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        opacity: 0.3,
        boxShadow: `
          0 0 15px 5px #F0E7D5,
          0 0 40px 10px #F0E7D5,
          0 0 80px 20px rgba(240, 231, 213, 0.2)
        `,
        filter: "blur(1px)",
        transition: "transform 0.5s linear",
        zIndex: 9999,
      }}
    />
  );
};

export default MousePointer;
