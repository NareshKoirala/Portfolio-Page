"use client";

import useIsMobile from "../helper/useIsMobile";
import { motion } from "framer-motion";

const Home = () => {
  const isMobile = useIsMobile();

  const handleView = () => {
    window.open("/resume.pdf", "_blank");
  };

  return (
    <section id="home">
      <div
        className={`m-auto w-full ${
          isMobile ? "mt-30 px-4" : "max-w-5xl pt-20"
        }`}
      >
        <div
          className={`flex ${isMobile ? "flex-col" : "flex-row"} items-center`}
        >
          {/* Text column */}
          <div className={`${isMobile ? "w-full" : "w-2/3"}`}>
            <motion.span
              initial={{ x: -100, opacity: 0, filter: "blur(10px)" }}
              animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: "backOut", delay: 0.2 }}
              className={`text-orange-500 ${isMobile ? "text-lg" : "text-2xl"}`}
            >
              Hi, my name is
            </motion.span>

            <motion.h1
              initial={{ x: -100, opacity: 0, filter: "blur(10px)" }}
              animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
              className={`mt-2 font-bold ${isMobile ? "text-4xl" : "text-6xl"}`}
            >
              Naresh Koirala.
            </motion.h1>

            <motion.h1
              initial={{ x: -100, opacity: 0, filter: "blur(10px)" }}
              animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: "easeOut", delay: 1 }}
              className={`font-bold text-gray-600 ${
                isMobile ? "text-4xl" : "text-6xl"
              }`}
            >
              I build things for fun.
            </motion.h1>

            <motion.p
              initial={{ x: -100, opacity: 0, filter: "blur(10px)" }}
              animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: "easeOut", delay: 1.5 }}
              className={`mt-6 text-gray-300 whitespace-normal ${
                isMobile ? "text-sm max-w-full" : "text-base max-w-md"
              }`}
            >
              Just a Nepali boi living the Canadian life, grinding for a tech
              job in 2025. Anime&apos;s on hold — staying locked in on software dev.
              But Chelsea FC? Always.
              <span className="text-blue-500"> #KTBFFH</span>
            </motion.p>

            <motion.button
              initial={{ x: -100, opacity: 0, filter: "blur(10px)" }}
              animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: "easeOut", delay: 2 }}
              onClick={handleView}
              className={`mt-6 px-6 py-3 border-2 border-orange-600 text-orange-200 rounded-lg hover:bg-orange-900 ${
                isMobile ? "mx-0" : ""
              }`}
            >
              View Resume
            </motion.button>
          </div>

          {/* Image column */}
          <motion.div
            initial={{ x: -100, opacity: 0, filter: "blur(10px)" }}
            animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: "easeOut", delay: 2 }}
            className={`${
              isMobile ? "w-full flex justify-center p-16" : "w-1/3 flex"
            }`}
          >
            <motion.img
              whileHover={{ scale: 1.1 }}
              src="/me2.png"
              className="w-70 md:w-100 rounded-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Home;
