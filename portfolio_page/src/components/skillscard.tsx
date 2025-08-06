import styles from "../styles/skills.module.css";

const skillCategories = [
  {
    category: "Frontend",
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "TypeScript", level: 88 },
      { name: "JavaScript (ES6+)", level: 92 },
      { name: "HTML5 & CSS3", level: 95 },
      { name: "Tailwind CSS", level: 80 }
    ]
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 80 },
      { name: "Python", level: 75 },
      { name: "RESTful APIs", level: 88 },
      { name: "GraphQL", level: 70 }
    ]
  },
  {
    category: "Database & Tools",
    skills: [
      { name: "MongoDB", level: 82 },
      { name: "PostgreSQL", level: 78 },
      { name: "Git & GitHub", level: 90 },
      { name: "Docker", level: 65 },
      { name: "AWS", level: 70 }
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
