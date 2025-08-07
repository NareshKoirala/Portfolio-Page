import Layout from "../components/layout";
import ProjectCard from "../components/projectcard";
import styles from "../styles/projects.module.css";

const projects = [
  {
    id: 1,
    title: "Job Application Tracker App",
    description: "A cross-platform .NET MAUI desktop app that lets users manage job applications, generate tailored resumes and cover letters, and fetch jobs from multiple job boards. Features job scraping from LinkedIn, manual job entry, and smart resume integration using a custom-built Web API.",
    technologies: [".NET MAUI", "C#", "SQLite", "OpenAI API", "Remotive API", "REST API", "LinkedIn Scraper"],
    githubUrl: "https://github.com/nareshkoirala/job-application-tracker",
    liveUrl: "https://nareshkoirala.dev/job-tracker", // Replace with real if available
    imageUrl: "/image/project1.jpg"
  },
  {
    id: 2,
    title: "Resume Builder & Job Match API",
    description: "An ASP.NET Core Web API that powers AI-based resume and cover letter generation. It includes PDF parsing, job description analysis, skill matching with scoring, and customizable resume exports. Designed to integrate seamlessly with external apps like the MAUI job tracker.",
    technologies: ["ASP.NET Core", "C#", "OpenAI API", "PDF Parsing", "Skill Matching", "REST API"],
    githubUrl: "https://github.com/nareshkoirala/resume-api",
    liveUrl: "https://api.nareshkoirala.dev", // Replace with actual URL if hosted
    imageUrl: "/image/project2.jpg"
  },
  {
    id: 3,
    title: "Personal Portfolio Website",
    description: "A sleek, responsive portfolio showcasing my development projects, technical skills, and resume. Optimized for mobile devices, accessibility, and performance.",
    technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Vercel"],
    githubUrl: "https://github.com/nareshkoirala/portfolio",
    liveUrl: "https://nareshkoirala.dev",
    imageUrl: "/image/project3.jpg"
  },
  {
    id: 4,
    title: "Chelsea FC Fan Portal",
    description: "A community fan portal dedicated to Chelsea FC with match fixtures, player stats, and commentary. Built with a dynamic frontend and real-time football data API integration.",
    technologies: ["React", "Football API", "Framer Motion", "Sass"],
    githubUrl: "https://github.com/nareshkoirala/chelsea-fan-page",
    liveUrl: "https://chelsea-fan.nareshkoirala.dev",
    imageUrl: "/image/project4.jpg"
  }
];


export default function Projects() {
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
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
