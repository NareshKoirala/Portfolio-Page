"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import FallingStars from "@/section/helper/star-fall";
import MousePointer from "@/section/mouse-pointer/mouse";
import useIsMobile from "@/section/helper/useIsMobile";
import FlashBang from "@/section/flash/flash-bang";
import SocialIcons from "@/section/helper/social-icons";
import Stars from "@/section/stars/stars"

import NavBar from "@/section/navigation/nav-bar";
import Home from "@/section/home/home";
import Skills from "@/section/skills/skills";
import ProjectLanding from "@/section/projects/projects";
import Contact from "@/section/contact/contact";

export default function Main() {
  const [mounted, setMounted] = useState(false);
  const [process, setProcess] = useState<"flash" | "main">("flash");
  const isMobile = useIsMobile();

  // Ensure this runs only on client
  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // Avoid SSR hydration mismatch

  return (
    <div className="relative">
      <FallingStars />
      <Stars />
      {/* Flash animation */}
      {process === "flash" && <FlashBang onFinish={() => setProcess("main")} />}

      {/* Main content */}
      {process === "main" && (
        <>
          {!isMobile && <MousePointer />}

          <NavBar />

          {/* Home Section */}
          <div className="bg-gradient-to-b from-[#001523] via-[#002945] to-[#0f253a]">
            <div
              id="home"
              className="flex flex-col min-h-screen items-center justify-center"
            >
              <Home />
            </div>
          </div>

          {/* Skills Section */}
          <div className="flex flex-col bg-[#0f253a]">
            <motion.div
              id="skills"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
            >
              <Skills />
            </motion.div>
          </div>

          {/* Projects Section */}
          <div className="bg-gradient-to-b from-[#0f253a] via-[#002945] to-[#001523]">
            <motion.div
              id="projects"
              className="flex flex-col min-h-screen items-center justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
            >
              <div className="flex flex-col items-center">
                <motion.h1
                  className="text-6xl font-bold text-orange-500 tracking-wide py-20"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Projects
                </motion.h1>
              </div>

              <ProjectLanding />
            </motion.div>
          </div>
          
          {/* Contact Section */}
          <div className="bg-gradient-to-b from-[#001523] via-[#002945] to-[#0f253a]">
            <motion.div
              id="contact"
              className="flex flex-col min-h-screen items-center justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
            >
              <Contact />
            </motion.div>
          </div>

          <SocialIcons />
        </>
      )}
    </div>
  );
}
