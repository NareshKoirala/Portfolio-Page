import styles from "../styles/skills.module.css";

const skillCategories = [
  {
    category: "Frontend",
    skills: [
      { name: "Blazor", level: 95 },
      { name: "Next.js", level: 70 },
      { name: "TypeScript", level: 70 },
      { name: "JavaScript (ES6+)", level: 92 },
      { name: "HTML5 & CSS3", level: 95 },
      { name: "Tailwind CSS", level: 80 },
      { name: "Bootstrap", level: 75 },
      { name: "React", level: 85 },
    ]
  },
  {
    category: "Backend",
    skills: [
      { name: "C#", level: 95 },
      { name: "PHP", level: 80 },
      { name: "Python", level: 75 },
      { name: "RESTful APIs", level: 88 },
      { name: "JavaScript (Node.js)", level: 70 },
      { name: "ASP.NET Core Web API", level: 90 }
    ]
  },
  {
    category: "Database & Tools",
    skills: [
      { name: "MongoDB", level: 82 },
      { name: "MySQL", level: 90 },
      { name: "Git & GitHub", level: 90 },
      { name: "Docker", level: 65 },
      { name: "AWS", level: 70 },
      { name: "Vercel", level: 78 },
      { name: "SQLite", level: 88 },
      { name: "Azure", level: 78 },
    ]
  }
];

export default function SkillsCard() {
  return (
    <div className={styles.skillsSection}>
          <div className={styles.skillsGrid}>
            {skillCategories.map((category, categoryIndex) => (
              <div key={category.category} className={styles.skillCategory}>
                <h3 className={styles.categoryTitle}>{category.category}</h3>
                <div className={styles.skillsListContainer}>
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className={styles.skillItem}>
                      <div className={styles.skillHeader}>
                        <span className={styles.skillName}>{skill.name}</span>
                        <span className={styles.skillLevel}>{skill.level}%</span>
                      </div>
                      <div className={styles.skillBar}>
                        <div 
                          className={styles.skillProgress}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
  );
}
