import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import useIsMobile from "../helper/useIsMobile";

const skills = {
  languages: "JAVASCRIPT ✦ TYPESCRIPT ✦ C# ✦ PYTHON ✦ HTML ✦ CSS ✦ ",
  frameworks: "REACT ✦ NEXT.JS ✦ .NET ✦ TAILWIND CSS ✦ BOOTSTRAP ✦ ",
  tools:
    "GIT ✦ GITHUB ✦ DOCKER ✦ RENDER ✦ FLY.IO ✦ VISUAL STUDIO ✦ VERCEL ✦ VS CODE ✦ ",
  databases: "MONGODB ✦ MYSQL ✦ SQLITE ✦ POSTGRESQL ✦ ",
};

const Skills = () => {
  const [randomizedPositions, setRandomizedPositions] = useState<
    { top: string; left: string }[] | null
  >(null);

  const imgList = ["csharp", "db", "docker", "htmlcss", "mix", "python"];
  const positions = [
    { top: "30%", left: "15%" },
    { top: "10%", left: "45%" },
    { top: "30%", left: "75%" },
    { top: "60%", left: "15%" },
    { top: "70%", left: "45%" },
    { top: "60%", left: "75%" },
  ];

  useEffect(() => {
    function shuffleArray<T>(array: T[]): T[] {
      const arr = [...array];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    setRandomizedPositions(shuffleArray(positions));
  }, []);

  if (!randomizedPositions) return null; // wait until client mounts

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {imgList.map((img, i) => {
        const randomOffset = () => (Math.random() - 0.5) * 500;
        return (
          <motion.img
            key={i}
            src={`/skills-bg/${img}.png`}
            alt={img}
            className={`absolute opacity-25 w-25 transition-transform`}
            animate={{
              x: [0, randomOffset(), 0],
              y: [0, randomOffset(), 0],
              rotate: [0, Math.random() * 10 - 5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "mirror",
            }}
            style={{
              top: randomizedPositions[i].top,
              left: randomizedPositions[i].left,
            }}
          />
        );
      })}

      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        className="text-6xl font-bold mb-16 tracking-wide text-orange-500"
      >
        Skills
      </motion.h1>

      <div className="w-full max-w-5xl flex flex-col gap-6 px-6">
        {Object.entries(skills).map(([category, text], i) => (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            key={category}
            className="overflow-hidden font-mono text-2xl whitespace-nowrap relative"
          >
            <motion.div
              className="p-2"
              style={{ display: "inline-flex", gap: "1rem" }}
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20 + i * 5,
                  ease: "linear",
                },
              }}
            >
              <span>{text}</span>
              <span>{text}</span>
              <span>{text}</span>
              <span>{text}</span>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
