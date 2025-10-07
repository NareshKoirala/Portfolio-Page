import { motion } from "framer-motion";

const skills = {
  languages: "JAVASCRIPT ✦ TYPESCRIPT ✦ C# ✦ PYTHON ✦ HTML ✦ CSS ✦ ",
  frameworks: "REACT ✦ NEXT.JS ✦ .NET ✦ TAILWIND CSS ✦ BOOTSTRAP ✦ ",
  tools:
    "GIT ✦ GITHUB ✦ DOCKER ✦ RENDER ✦ FLY.IO ✦ VISUAL STUDIO ✦ VERCEL ✦ VS CODE ✦ ",
  databases: "MONGODB ✦ MYSQL ✦ SQLITE ✦ POSTGRESQL ✦ ",
};

const Skills = () => {
  return (
    <>
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        className="text-6xl font-bold mb-16 tracking-wide text-orange-500"
      >
        Skills
      </motion.h1>

      <div className="w-full max-w-5xl flex flex-col gap-6 px-6">
        {Object.entries(skills).map(([category, text], i) => {
          return (
            <motion.div
              key={category}
              className="overflow-hidden font-mono text-2xl whitespace-nowrap relative"
            >
              <motion.div
                className="p-2 animate-pulse"
                style={{
                  display: "inline-flex",
                  gap: "1rem",
                }}
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
          );
        })}
      </div>
    </>
  );
};

export default Skills;
