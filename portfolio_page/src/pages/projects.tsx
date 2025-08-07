import Layout from "../components/layout";
import ProjectCard from "../components/projectcard";
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
  imageUrl: string;
}

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <Layout>
      <div className={styles.projectsContainer}>
        <div className={styles.contentSection}>
          <div className={styles.textContent}>
            <br /> 
            <h1 className={styles.title}>My Projects</h1>
            <p className={styles.description}>
              Here are some of the projects I've worked on. Each project showcases different 
              technologies and skills, from full-stack applications to frontend interfaces. 
              Click the links to view the source code or live demos.
            </p>
          </div>
        </div>
        
        <div className={styles.projectsGrid}>
          {projects.map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const projects = await findDocuments('Project');
    
    return {
      props: {
        projects: JSON.parse(JSON.stringify(projects)) // Serialize for Next.js
      }
    };
  } catch (error) {
    console.error('Error fetching projects:', error);
    
    return {
      props: {
        projects: []
      }
    };
  }
};
