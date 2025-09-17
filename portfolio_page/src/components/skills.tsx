import Head from "next/head";
import styles from "../styles/skills.module.css";
import SkillsCard from "./skillscard";

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  _id?: string;
  category: string;
  skills: Skill[];
}

interface SkillsProps {
  skillCategories: SkillCategory[];
}

export default function Skills({ skillCategories }: SkillsProps) {
  return (
    <>
      <Head>
        <meta name="keywords" content="Naresh Prasad Koirala, skills, web developer, React, Next.js, TypeScript" />
      </Head>
      <section className={styles.skillsContainer} aria-labelledby="skills-title">
        <div className={styles.contentSection}>
          <div className={styles.textContent}>
            <br />
            <h1 id="skills-title" className={styles.title}>My Skills</h1>
            <div className={styles.paragraphContainer}>
              <p className={styles.paragraph}>
                Here are some of the technologies and tools I work with. 
                I'm always learning and expanding my skill set to stay current with the latest trends.
              </p>
              <p className={styles.paragraph}>
                From frontend frameworks to backend technologies, I enjoy working across the full stack 
                to build complete, scalable applications.
              </p>
            </div>
          </div>
        </div>
        
        <SkillsCard skillCategories={skillCategories} />
        
        <br />
      </section>
    </>
  );
}
