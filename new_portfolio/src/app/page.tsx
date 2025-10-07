"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

import FallingStars from "@/section/helper/star-fall";
import MousePointer from "@/section/mouse-pointer/mouse";
import useIsMobile from "@/section/helper/useIsMobile";
import FlashBang from "@/section/flash/flash-bang";

import NavBar from "@/section/navigation/nav-bar";
import Home from "@/section/home/home";
import Skills from "@/section/skills/skills";
import Resume from "@/section/resume/resume";

export default function Main() {
  const [process, setProcess] = useState("flash");
  const isMobile = useIsMobile();

  // Scroll-trigger setup for Skills
  const skillsRef = useRef<HTMLDivElement>(null);
  const skillsInView = useInView(skillsRef, { margin: "-100px 0px" });

  return (
    <div>
      <FallingStars />
      {!isMobile && <MousePointer />}

      {process === "flash" && <FlashBang onFinish={() => setProcess("main")} />}

      {process !== "flash" && (
        <>
          <NavBar />
          <Home />
          <section
            id="skills"
            className="bg-gradient-to-b from-[#0f253a] via-[#0f253a] to-[#002e4e]"
          >
            {/* Skills section with scroll-triggered fade */}
            <motion.div
              ref={skillsRef}
              initial={{ opacity: 0, y: 50 }}
              animate={skillsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: "easeIn" }}
            >
              <Skills />
            </motion.div>
          </section>
          <Resume />
        </>
      )}
    </div>
  );
}
