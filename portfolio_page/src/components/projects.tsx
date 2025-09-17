import Layout from "./layout";
import ProjectCard from "./projectcard";
import styles from "../styles/projects.module.css";
import { findDocuments } from "../service/DBFunction";
import { GetServerSideProps } from 'next';

interface Project {
  _id: string;
  id?: number; // For compatibility with ProjectCard
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
}

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <>
      <section className={styles.projectsContainer} aria-labelledby="projects-title">
        <div className={styles.contentSection}>
          <div className={styles.textContent}>
            <br /> 
            <h1 id="projects-title" className={styles.title}>My Projects</h1>
            <div className={styles.paragraphContainer}>
              <p className={styles.paragraph}>
                Here are some of the projects I've worked on. Each project showcases different technologies and skills, from full-stack applications to frontend interfaces. Click the links to view the source code or live demos.
              </p>
            </div>
          </div>
        </div>
        
        <div className={styles.projectsSection}>
          <div className={styles.projectsGrid}>
            {projects.map((project: Project) => (
              <ProjectCard key={project._id || project.id} project={project} />
            ))}
          </div>
        </div>
        
        <br />
      </section>
    </>
  );
}
