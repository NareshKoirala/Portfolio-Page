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