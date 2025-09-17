import About from '../components/about';
import Home from '../components/home';
import { SpeedInsights } from "@vercel/speed-insights/next";
import Skills from '../components/skills';
import { findDocuments } from "../service/DBFunction";
import { GetServerSideProps } from 'next';
import Projects from '../components/projects';
import Contact from '../components/contact';
import { motion } from 'framer-motion';
import Layout from '@/components/layout';

export default function Index({ skillCategories, projects }: SkillsProps & ProjectsProps) {
  const sections = [
    { component: <Home />, delay: 0, direction: 50 },
    { component: <About />, delay: 0.1, direction: -50 },
    { component: <Skills skillCategories={skillCategories} />, delay: 0.2, direction: 50 },
    { component: <Projects projects={projects} />, delay: 0.3, direction: -50 },
    { component: <Contact />, delay: 0.4, direction: 50 },
  ];

  return (
    <Layout>
      {sections.map((section, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: section.direction }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, delay: section.delay, ease: "easeOut" }
          }}
          viewport={{ once: false, amount: 0.2 }} // re-animate on scroll
          animate={{
            y: [0, -12, 0, 12, 0], // smooth float up and down
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 6,
            ease: "easeInOut",
          }}
        >
          {section.component}
        </motion.div>
      ))}
      <SpeedInsights />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const [skillCategories, projects] = await Promise.all([
      findDocuments("Skills"),
      findDocuments("Project"),
    ]);

    return {
      props: {
        skillCategories: JSON.parse(JSON.stringify(skillCategories)),
        projects: JSON.parse(JSON.stringify(projects)),
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        skillCategories: [],
        projects: [],
      },
    };
  }
};
