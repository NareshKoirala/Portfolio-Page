"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import projectsData from "@/data/projects.json";
import useIsMobile from "../helper/useIsMobile";

interface Project {
  name: string;
  description: string;
  technologies: Record<string, string[]>;
  features: string[];
  status: string;
  timeline: string;
  github: string;
  testlink: string;
  highlights?: string[];
}

interface ProjectsData {
  [key: string]: Project;
}

const projects = projectsData as ProjectsData;
const projectKeys = Object.keys(projects);

const ProjectLanding = () => {
  const isMobile = useIsMobile();
  const [index, setIndex] = useState(0);
  const project = projects[projectKeys[index]];

  const nextProject = () => setIndex((prev) => (prev + 1) % projectKeys.length);
  const prevProject = () =>
    setIndex((prev) => (prev - 1 + projectKeys.length) % projectKeys.length);

  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 40px 20px #001b2b" }}
      className={`${
        isMobile
          ? "flex flex-col items-center bg-[#001b2b]/30 backdrop-blur-2xl rounded-2xl p-4"
          : "flex items-center justify-center bg-[#001b2b]/30 backdrop-blur-2xl rounded-2xl px-24 py-10"
      }`}
    >
      {/* Desktop Left Button */}
      {!isMobile && (
        <button
          onClick={prevProject}
          className="animate-bounce text-5xl text-orange-400 hover:text-orange-200 transition-transform hover:scale-110 p-3"
        >
          ⫷
        </button>
      )}

      {/* Project Section */}
      <motion.section
        key={project.name}
        className="p-6 max-w-5xl text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-4xl font-bold text-orange-400 mb-6 tracking-wide"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {project.name}
        </motion.h1>

        {/* Mobile Buttons (side by side) */}
        {isMobile && (
          <div className="animate-bounce flex justify-center gap-12 mt-10">
            <button
              onClick={prevProject}
              className="text-3xl text-orange-400 hover:text-orange-200 transition-transform hover:scale-110 p-3"
            >
              ⫷
            </button>
            <button
              onClick={nextProject}
              className="text-3xl text-orange-400 hover:text-orange-200 transition-transform hover:scale-110 p-3"
            >
              ⫸
            </button>
          </div>
        )}

        <motion.p
          className="max-w-3xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {project.description}
        </motion.p>

        <motion.div
          className="grid md:grid-cols-2 gap-10 bg-[#001b2b]/30 backdrop-blur-lg p-8 rounded-4xl border border-[#ff6600]/40 shadow-lg"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          <motion.div>
            <h2 className="text-3xl font-semibold text-orange-400 mb-4">
              Technologies
            </h2>
            {Object.entries(project.technologies).map(([category, techs]) => (
              <div key={category} className="mb-4">
                <h3 className="text-xl p-2 capitalize mb-1">{category}</h3>
                <ul className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {techs.map((tech) => (
                    <li
                      key={tech}
                      className="bg-[#001a2c] px-3 py-1.5 rounded-md text-sm border border-orange-800/40 hover:border-orange-500 hover:scale-120 transition-colors"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>

          <motion.div>
            <h2 className="text-3xl font-semibold text-orange-400 mb-4">
              Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-left">
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex justify-center gap-6 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 border border-orange-500 text-orange-300 rounded-lg hover:bg-orange-900/60 hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href={project.testlink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 border border-orange-500 text-orange-300 rounded-lg hover:bg-orange-900/60 hover:text-white transition-colors"
          >
            Live Demo
          </a>
        </motion.div>
      </motion.section>

      {/* Desktop Right Button */}
      {!isMobile && (
        <button
          onClick={nextProject}
          className="animate-bounce text-5xl text-orange-400 hover:text-orange-200 transition-transform hover:scale-110 p-3"
        >
          ⫸
        </button>
      )}
    </motion.div>
  );
};

export default ProjectLanding;
